import { confirm } from "@inquirer/prompts";
import { Command } from "@oclif/core";
import chalk from "chalk";
import * as fs from "node:fs";

export default class Clear extends Command {
  static override description = "Clears the misobox.";

  static override examples = ["<%= config.bin %> <%= command.id %>"];

  public async run(): Promise<void> {
    const answer = await confirm({ message: "Clear the misobox?" });
    if (answer) {
      fs.writeFileSync(".misobox.jsonl", "");
      console.log(chalk.green("✔"), chalk.bold("Box cleared"));
    }
  }
}
