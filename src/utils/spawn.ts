import chalk from "chalk";
import * as child_process from "node:child_process";
import * as fs from "node:fs";
import path from "node:path";

export interface SpawnProcessOptions {
	logoutput: boolean;
	verbose: boolean;
	outdir: string;
}

interface MisoboxFormat {
	error: string;
}

export function spawnProcess(
	cmd: string,
	args: string[],
	options: SpawnProcessOptions,
): void {
	const out = fs.createWriteStream(path.join(options.outdir, "misobox.jsonl"), {
		flags: "a",
		encoding: "utf8",
	});
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
		const errObj: MisoboxFormat = { error: data.toString() };
		process.stderr.write(`${chalk.red("Error:")} ${data.toString()}`);
		out.write(`${JSON.stringify(errObj)}\n`);
	});

	proc.on("close", (code) => {
		if (code && code > 0) {
			if (options.verbose) {
				console.log(chalk.red(`Process exited with code ${code}`));
			}
			process.exitCode = code;
		}
		out.end();
	});

	proc.on("error", (err) => {
		if (options.verbose) {
			console.error(chalk.red.bold("Couldn't start subprocess\n"), err);
		} else {
			console.error(chalk.red.bold("Failed to execute command."));
		}
		process.exitCode = 1;
		out.end();
	});
}
