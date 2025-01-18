import chalk from "chalk";
import * as child_process from "node:child_process";

export interface SpawnProcessOptions {
	logoutput: boolean;
	verbose: boolean;
}

export function spawnProcess(
	cmd: string,
	args: string[],
	options: SpawnProcessOptions,
): void {
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
		process.stderr.write(`${chalk.red("Error:")} ${data.toString()}`);
	});

	proc.on("close", (code) => {
		if (code && code > 0) {
			if (options.verbose) {
				console.log(chalk.red(`Process exited with code ${code}`));
			}
			process.exitCode = code;
		}
	});

	proc.on("error", (err) => {
		if (options.verbose) {
			console.error(chalk.red.bold("Couldn't start subprocess\n"), err);
		} else {
			console.error(chalk.red.bold("Failed to execute command."));
		}
		process.exitCode = 1;
	});
}
