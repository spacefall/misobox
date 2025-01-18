import { Args, Command, Flags } from "@oclif/core";
import { spawnProcess, type SpawnProcessOptions } from "../utils/spawn.js";

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
			`running ${args.command} with args ${argv.slice(1)}, logging to ${flags.outdir}`,
		);

		if (!args.command) {
			this.error("No command provided");
		}

		spawnProcess(
			args.command,
			argv.slice(1) as string[],
			{
				logoutput: flags.logoutput,
				verbose: flags.verbose,
				outdir: flags.outdir,
			} as SpawnProcessOptions,
		);
	}
}
