import { Args, Command, Flags } from "@oclif/core";
import chalk from "chalk";
import * as child_process from "node:child_process";
import * as fs from "node:fs";
import * as net from "node:net";
import path from "node:path";
import type { MisoboxFormat } from "../types.js";

interface SpawnProcessOptions {
  context: number;
  verbose: boolean;
  outdir: string;
}

export default class Run extends Command {
  static override strict = false;
  static override args = {
    command: Args.string({ description: "command to run" }),
  };

  static override description = "Run command and log errors";

  static override examples = ["<%= config.bin %> <%= command.id %>"];

  static override flags = {
    context: Flags.integer({
      char: "c",
      description:
        "Grabs the last n lines of stdout and logs them when an error occurs",
      default: 0,
    }),
    verbose: Flags.boolean({
      char: "v",
      description: "Print more info while running",
    }),
    outdir: Flags.string({
      char: "o",
      description: "Path to write misobox.jsonl to",
      default: ".",
    }),
  };

  public async run(): Promise<void> {
    const { args, flags, argv } = await this.parse(Run);

    const runOptions: SpawnProcessOptions = {
      context: flags.context,
      verbose: flags.verbose,
      outdir: flags.outdir,
    };

    if (flags.verbose) {
      this.log(
        `Running ${args.command} with options: ${JSON.stringify(runOptions)}`,
        process.argv.slice(process.argv.indexOf("--") + 1)
      );
    }

    if (!args.command) {
      this.log(chalk.redBright("No command provided"));
      this.exit(1);
    }

    spawnProcess(
      process.argv.slice(process.argv.indexOf("--") + 1) as string[],
      runOptions
    );
  }
}

function spawnProcess(cmd: string[], options: SpawnProcessOptions) {
  const out = fs.createWriteStream(
    path.join(options.outdir, ".misobox.jsonl"),
    {
      flags: "a",
      encoding: "utf8",
    }
  );

  const proc = child_process.spawn(cmd[0], cmd.slice(1), {
    stdio: ["inherit", "pipe", "pipe"],
    shell: true,
  });

  const context: string[] = [];

  proc.stdout.setEncoding("utf8");
  proc.stderr.setEncoding("utf8");

  proc.stdout.pipe(process.stdout);

  if (options.context > 0) {
    proc.stdout.on("data", (data) => {
      context.unshift(data.toString().trim());
      if (context.length > options.context) context.pop();
    });
  }

  proc.stderr.on("data", (data) => {
    process.stdout.write(`${chalk.redBright("Error:")} ${data.toString()}`);
    const cleanData = data.toString().trim();
    const errObj: MisoboxFormat = {
      timestamp: new Date().toISOString(),
      error: cleanData,
      context: context,
    };
    out.write(`${JSON.stringify(errObj)}\n`);
  });

  proc.on("close", (code) => {
    if (code && code > 0) {
      if (options.verbose) {
        console.log(chalk.redBright(`Process exited with code ${code}`));
      }
      process.exitCode = code;
    }
    out.end();
  });

  proc.on("error", (err) => {
    console.error(chalk.redBright.bold("Couldn't start subprocess."));
    if (options.verbose) {
      console.error(err);
    }
    process.exitCode = 1;
    out.end();
  });
}
