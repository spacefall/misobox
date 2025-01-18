import { Args, Command, Flags } from "@oclif/core";
import chalk from "chalk";
// eslint-disable-next-line camelcase
import * as child_process from "node:child_process";
import * as fs from "node:fs";

import type { MisoboxFormat } from "../types.js";

export default class Run extends Command {
  static override args = {
    command: Args.string({
      description: "Command to execute, add -- to pass flags to the command",
    }),
  };

  static override description = "Run command and log errors into the misobox.";

  static override examples = [
    "<%= config.bin %> <%= command.id %> echo hello",
    "<%= config.bin %> <%= command.id %> -- ping -c 4 example.com",
  ];

  static override flags = {
    context: Flags.integer({
      char: "c",
      default: 0,
      description: "Grabs the last n lines of stdout and logs them when an error occurs",
    }),
    verbose: Flags.boolean({
      char: "v",
      description: "Print more info while running",
    }),
  };

  static override strict = false;

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(Run);

    // Check if a command was provided
    if (!args.command) {
      this.log(chalk.redBright("No command provided"));
      this.exit(1);
    }

    // This could be replaced with argv (from oclif), the only problem is that flags that are
    // recognized get moved to the start of the array, so node would constantly fail as it would
    // try to run -c or -v as a command
    const cmdArgs = process.argv.slice(process.argv.indexOf(args.command) + 1);

    if (flags.verbose) {
      this.log(`Running ${args.command} with context ${flags.context}, and args ${cmdArgs}`);
    }

    // Open a file stream, this is better than just using appendFile as it doesn't need to reopen the file
    // It also closes automatically when the process exits, so no need to worry about that, I just added out.end()
    // to the close and end events for completeness
    const out = fs.createWriteStream(".misobox.jsonl", {
      encoding: "utf8",
      flags: "a",
    });

    // eslint-disable-next-line camelcase
    const proc = child_process.spawn(args.command, cmdArgs, {
      shell: true,
      // inherit stdin, pipe stdout and stderr
      stdio: ["inherit", "pipe", "pipe"],
    });

    const context: string[] = [];

    // Set encoding to utf8 and pipe stdout to the process stdout
    proc.stdout.setEncoding("utf8");
    proc.stderr.setEncoding("utf8");
    proc.stdout.pipe(process.stdout);

    // If context is enabled keep at least n lines of context
    // I say at least because node will buffer and merge multiple lines together, so there might be more than n lines
    // I could split \n and push each line individually, but I think that would be problematic if a log message is split
    // across multiple lines
    if (flags.context > 0) {
      proc.stdout.on("data", (data) => {
        context.unshift(data.toString().trim());
        if (context.length > flags.context) context.pop();
      });
    }

    // If an error occurs, log it to the console and write it to the file
    proc.stderr.on("data", (data) => {
      process.stdout.write(`${chalk.redBright("Error:")} ${data.toString()}`);
      const cleanData = data.toString().trim();
      const errObj: MisoboxFormat = {
        context,
        error: cleanData,
        timestamp: new Date().toISOString(),
      };
      out.write(`${JSON.stringify(errObj)}\n`);
    });

    // Copy exit code if not 0
    proc.on("close", (code) => {
      if (code && code > 0) {
        if (flags.verbose) {
          console.error(chalk.redBright(`Process exited with code ${code}`));
        }

        process.exitCode = code;
      }

      out.end();
    });

    // Show a generic error if the process couldn't be started, be more verbose if the verbose flag is set
    proc.on("error", (err) => {
      console.error(chalk.redBright.bold("Couldn't start subprocess."));
      if (flags.verbose) {
        console.error(err);
      }

      process.exitCode = 1;
      out.end();
    });
  }
}
