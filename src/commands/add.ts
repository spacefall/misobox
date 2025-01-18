import { input } from "@inquirer/prompts";
import { Args, Command } from "@oclif/core";
import chalk from "chalk";
import * as fs from "node:fs";

import { MisoboxFormat } from "../types.js";

export default class Add extends Command {
  static override args = {
    note: Args.string({ description: "note to add", shorthand: "n" }),
  };

  static override description = "Adds a note to the misobox.";

  static override examples = [
    "<%= config.bin %> <%= command.id %>",
    "<%= config.bin %> <%= command.id %> foo bar",
  ];

  static override strict = false;

  public async run(): Promise<void> {
    const { argv } = await this.parse(Add);

    let noteText = argv.join(" ");

    if (argv.length === 0) {
      noteText = await input({
        message: "Enter a note",
      });
    }

    const note: MisoboxFormat = {
      context: [],
      error: noteText,
      timestamp: new Date().toISOString(),
    };

    fs.appendFileSync(".misobox.jsonl", `${JSON.stringify(note)}\n`);
    console.log(chalk.green("✔"), chalk.bold("Note added"));
  }
}
