import { confirm } from "@inquirer/prompts";
import { Command } from "@oclif/core";
import chalk from "chalk";
import * as fs from "node:fs";

export default class Clear extends Command {
  static override description = "Clears the misobox.";

  static override examples = ["<%= config.bin %> <%= command.id %>"];

  public async run(): Promise<void> {
    // simple y/n to not accidentally delete everything, then it just writes "" to the file
    const answer = await confirm({ message: "Clear the misobox?" });
    if (answer) {
      fs.writeFileSync(".misobox.jsonl.gz", "");
      console.log(chalk.green("✔"), chalk.bold("Box cleared"));
    }
  }
}
