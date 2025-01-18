import { input } from "@inquirer/prompts";
import { Args, Command } from "@oclif/core";
import chalk from "chalk";
import * as fs from "node:fs";
import * as zlib from "node:zlib";

import { MisoboxFormat } from "../types.js";

export default class Add extends Command {
  static override args = {
    note: Args.string({ description: "Text of the note to add" }),
  };

  static override description = "Adds a note to the misobox.";

  static override examples = ["<%= config.bin %> <%= command.id %>", "<%= config.bin %> <%= command.id %> foo bar"];

  static override strict = false;

  public async run(): Promise<void> {
    const { argv } = await this.parse(Add);

    let noteText = argv.join(" ");

    // If no note is provided, prompt the user for one
    if (argv.length === 0) {
      noteText = await input({
        message: "Enter a note",
      });
    }

    // Create a new note object and append it to the file
    const note: MisoboxFormat = {
      context: [],
      error: noteText,
      timestamp: new Date().toISOString(),
    };

    fs.appendFileSync(".misobox.jsonl.gz", zlib.gzipSync(`${JSON.stringify(note)}\n`));
    console.log(chalk.green("✔"), chalk.bold("Note added"));
  }
}
