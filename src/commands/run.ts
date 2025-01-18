import { Args, Command, Flags } from "@oclif/core";
import chalk from "chalk";
import * as child_process from "node:child_process";
import * as fs from "node:fs";
import path from "node:path";
import type { MisoboxFormat } from "../types.js";

interface SpawnProcessOptions {
  logoutput: boolean;
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
    logoutput: Flags.boolean({
      char: "l",
      description: "Enable logging for stdout",
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

    this.log(
      `running ${args.command} with args ${argv.slice(1)}, logging to ${
        flags.outdir
      }`
    );

    if (!args.command) {
      this.log(chalk.redBright("No command provided"));
      this.exit(1);
    }

    spawnProcess(
      args.command,
      argv.slice(1) as string[],
      {
        logoutput: flags.logoutput,
        verbose: flags.verbose,
        outdir: flags.outdir,
      } as SpawnProcessOptions
    );
  }
}

function spawnProcess(
  cmd: string,
  args: string[],
  options: SpawnProcessOptions
): void {
  const out = fs.createWriteStream(
    path.join(options.outdir, ".misobox.jsonl"),
    {
      flags: "a",
      encoding: "utf8",
    }
  );
  const proc = child_process.spawn(cmd, args);

  proc.stdout.setEncoding("utf8");
  proc.stderr.setEncoding("utf8");

  if (options.logoutput) {
    proc.stdout.on("data", (data) => {
      process.stdout.write(`stdout:${data.toString()}`);
    });
  } else {
    proc.stdout.pipe(process.stdout);
  }

  proc.stderr.on("data", (data) => {
    const cleanData = data.toString().trim();
    const errObj: MisoboxFormat = {
      timestamp: new Date().toISOString(),
      error: cleanData,
    };
    process.stderr.write(`${chalk.redBright("Error:")} ${data.toString()}`);
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
