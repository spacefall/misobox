import { select } from "@inquirer/prompts";
import { Command } from "@oclif/core";
import chalk from "chalk";
import * as fs from "node:fs";
import * as zlib from "node:zlib";

import type { MisoboxFormat } from "../types.js";

export default class Recall extends Command {
  static override description = "Displays a note from the misobox.";

  static override examples = ["<%= config.bin %> <%= command.id %>"];

  public async run(): Promise<void> {
    let notes: MisoboxFormat[] = [];
    // Try to read the whole file, split it by newline, remove the last empty line, and parse each line as JSON (since it's JSON Lines)
    try {
      const brotliNotes = fs.readFileSync(".misobox");
      const decompressedNotes = zlib.gunzipSync(brotliNotes).toString();
      notes = decompressedNotes
        .split("\n")
        .slice(0, -1)
        .map((line) => JSON.parse(line));
    } catch (error) {
      this.log(chalk.redBright("Couldn't read .misobox.jsonl", error));
      this.exit(1);
    }

    // Check that there are notes to display
    if (notes.length === 0) {
      this.log(chalk.redBright("No errors collected yet"));
      this.exit(1);
    }

    // Prompt the user to select a note to display
    // This block just formats the note to be displayed in the prompt and reverses the order so the most recent note is at the top
    // The format is as follows: index. first 50 characters of the error message... [timestamp]
    const selection = await select({
      choices: notes
        .map((note, idx) => {
          try {
            const newlineIdx = note.text.indexOf("\n");
            const idxStr = chalk.gray(`${idx + 1}.`);
            const shortStr = note.text.slice(0, newlineIdx === -1 || newlineIdx > 50 ? 50 : newlineIdx);
            const ellipsis = note.text.length > 50 ? chalk.gray("...") : "";
            const timestampStr = chalk.gray(`[${note.timestamp}]`);
            return {
              name: `${idxStr} ${shortStr}${ellipsis} ${timestampStr}`,
              value: idx,
            };
          } catch (error) {
            this.error(`Couldn't parse notes, .misobox is probably corrupted (${error})`);
          }

          return { value: 0 };
        })
        .reverse(),
      message: "Select a note to display",
    });

    // print context lines
    for (const line of notes[selection].context) {
      this.log(chalk.gray(line));
    }

    this.log(notes[selection].text);
  }
}
