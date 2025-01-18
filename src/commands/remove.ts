import { checkbox } from "@inquirer/prompts";
import { Command } from "@oclif/core";
import chalk from "chalk";
import * as fs from "node:fs";

import type { MisoboxFormat } from "../types.js";

export default class Recall extends Command {
  static override description = "Removes one or more notes from the misobox.";

  static override examples = ["<%= config.bin %> <%= command.id %>"];

  public async run(): Promise<void> {
    let notes: MisoboxFormat[] = [];
    try {
      notes = fs
        .readFileSync(".misobox.jsonl", "utf8")
        .split("\n")
        .slice(0, -1)
        .map((line) => JSON.parse(line));
    } catch {
      this.log(chalk.redBright("Couldn't read .misobox.jsonl"));
      this.exit(1);
    }

    if (notes.length === 0) {
      this.log(chalk.redBright("No errors collected yet"));
      this.exit(1);
    }

    const selection = await checkbox({
      choices: notes
        .map((note, idx) => {
          const newlineIdx = note.error.indexOf("\n");

          const idxStr = chalk.gray(`${idx + 1}.`);
          const shortStr = note.error.slice(
            0,
            Math.max(0, newlineIdx === -1 ? 50 : newlineIdx)
          );
          const timestampStr = chalk.gray(`[${note.timestamp}]`);
          return {
            name: `${idxStr} ${shortStr}${
              note.error.length > 50 ? chalk.gray("...") : ""
            } ${timestampStr}`,
            value: idx,
          };
        })
        .reverse(),
      message: "Select one or more notes to remove",
    });

    for (const i of selection) {
      notes.splice(i, 1);
    }

    const newNotes = notes.map((note) => `${JSON.stringify(note)}\n`).join("");
    fs.writeFileSync(".misobox.jsonl", newNotes);

    this.log(chalk.green("✔"), chalk.bold("Notes removed"));
  }
}
