import { Args, Command, Flags } from "@oclif/core";
import * as fs from "node:fs";
import path from "node:path";
import { select, Separator } from "@inquirer/prompts";
import type { MisoboxFormat } from "../types.js";
import chalk from "chalk";

export default class Recall extends Command {
  static override description = "describe the command here";

  static override examples = ["<%= config.bin %> <%= command.id %>"];

  static override flags = {
    dir: Flags.string({
      char: "d",
      description: "directory containing the misobox.jsonl",
    }),
  };

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(Recall);
    let notes: MisoboxFormat[] = [];
    try {
      notes = fs
        .readFileSync(path.join(flags.dir ?? ".", ".misobox.jsonl"), "utf8")
        .split("\n")
        .slice(0, -1)
        .map((line) => JSON.parse(line));
    } catch (err) {
      this.log(chalk.redBright("Couldn't read .misobox.jsonl"));
      this.exit(1);
    }

    if (notes.length === 0) {
      this.log(chalk.redBright("No errors collected yet"));
      this.exit(1);
    }

    const selection = await select({
      message: "Select an error",
      choices: notes
        .map((note, idx) => {
          const newlineIdx = note.error.indexOf("\n");

          const idxStr = chalk.gray(`${idx + 1}.`);
          const shortStr = note.error.substring(
            0,
            newlineIdx !== -1 ? newlineIdx : 50
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
    });
    this.log(notes[selection].error);
  }
}
