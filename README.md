# misobox

Ferment your errors like miso - aka a simple error collection/note taking tool made with TS and oclif

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/misobox.svg)](https://npmjs.org/package/misobox)
[![Downloads/week](https://img.shields.io/npm/dw/misobox.svg)](https://npmjs.org/package/misobox)

<!-- toc -->
* [misobox](#misobox)
* [What is this?](#what-is-this)
* [Features](#features)
* [Usage](#usage)
* [Install misobox](#install-misobox)
* [Run a command and log errors](#run-a-command-and-log-errors)
* [Add a note manually](#add-a-note-manually)
* [Commands](#commands)
* [Notes](#notes)
<!-- tocstop -->

# What is this?

misobox is a lightweight CLI tool that captures and preserves error messages (from stderr) from your projects for later review.
You can also add manual notes to the log, to keep track of what you were doing at the time or to add an issue that isn't caught by the automated error collection (i.e memory leaks).

# Features

- **Error Collection**: Automatically captures stderr output from any command
- **Note Taking**: Add manual notes alongside automated error collection
- **Compressed Storage**: Stores error logs in a GZip compressed JSONL format
- **Universal Support**: Works with any command-line tool or script

# Usage

Using misobox is simple, just install it with you package manager of choice and run your commands with `misobox run` or add manual notes with `misobox add`.

```sh
# Install misobox
npm install -g misobox

# Run a command and log errors
misobox run -- gcc -o myprog myprog.c

# Add a note manually
misobox add "Need to fix memory leak in worker thread"
```

After running `misobox run` or `misobox add`, a file containing all the notes will be created in the current folder (`.misobox`).

You can use misobox to:

- Log test failures for later investigation
  ```sh
  misobox run npm test
  ```
- Track non fatal compilation errors
  ```s
  misobox run -- gcc -o myprog myprog.c
  ```
- Take notes about issues you encounter
  ```sh-session
  misobox add "Need to fix memory leak in worker thread"
  ```

# Commands

<!-- commands -->
* [`misobox add [NOTE]`](#misobox-add-note)
* [`misobox clear`](#misobox-clear)
* [`misobox help [COMMAND]`](#misobox-help-command)
* [`misobox recall`](#misobox-recall)
* [`misobox remove`](#misobox-remove)
* [`misobox run [COMMAND]`](#misobox-run-command)

## `misobox add [NOTE]`

Adds a note to the misobox.

```
USAGE
  $ misobox add [NOTE...]

ARGUMENTS
  NOTE...  Text of the note to add

DESCRIPTION
  Adds a note to the misobox.

EXAMPLES
  $ misobox add

  $ misobox add foo bar
```

_See code: [src/commands/add.ts](https://github.com/spacefall/misobox/blob/v0.1.0/src/commands/add.ts)_

## `misobox clear`

Clears the misobox.

```
USAGE
  $ misobox clear

DESCRIPTION
  Clears the misobox.

EXAMPLES
  $ misobox clear
```

_See code: [src/commands/clear.ts](https://github.com/spacefall/misobox/blob/v0.1.0/src/commands/clear.ts)_

## `misobox help [COMMAND]`

Display help for misobox.

```
USAGE
  $ misobox help [COMMAND...] [-n]

ARGUMENTS
  COMMAND...  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for misobox.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.2.21/src/commands/help.ts)_

## `misobox recall`

Displays a note from the misobox.

```
USAGE
  $ misobox recall

DESCRIPTION
  Displays a note from the misobox.

EXAMPLES
  $ misobox recall
```

_See code: [src/commands/recall.ts](https://github.com/spacefall/misobox/blob/v0.1.0/src/commands/recall.ts)_

## `misobox remove`

Removes one or more notes from the misobox.

```
USAGE
  $ misobox remove

DESCRIPTION
  Removes one or more notes from the misobox.

EXAMPLES
  $ misobox remove
```

_See code: [src/commands/remove.ts](https://github.com/spacefall/misobox/blob/v0.1.0/src/commands/remove.ts)_

## `misobox run [COMMAND]`

Run command and log errors into the misobox.

```
USAGE
  $ misobox run [COMMAND...] [-c <value>] [-v]

ARGUMENTS
  COMMAND...  Command to execute, add -- to pass flags to the command

FLAGS
  -c, --context=<value>  Grabs the last n lines of stdout and logs them when an error occurs
  -v, --verbose          Print more info while running

DESCRIPTION
  Run command and log errors into the misobox.

EXAMPLES
  $ misobox run echo hello

  $ misobox run -- ping -c 4 example.com
```

_See code: [src/commands/run.ts](https://github.com/spacefall/misobox/blob/v0.1.0/src/commands/run.ts)_
<!-- commandsstop -->

# Notes

- When using `misobox run`, you can add "--" to prevent misobox from parsing them:

  ```sh
  # -c will be parsed by ping and misobox
  misobox run ping -c 4 example.com

  # -c will be parsed only by ping
  misobox run -- ping -c 4 example.com
  ```

- misobox stores its data in a GZip compressed JSONL file.
  To make file operations faster, misobox only compresses a note when it's added, the file is never recompressed with normal use.
  To fix this, `misobox remove` will recompress the whole file after removing the selected notes (if no notes are selected it will just recompress the file).

- Sometimes stdout and stderr are misalligned, this happens when a command is printing a lot of data quickly because of how node buffers stdout and stderr.
  Unfortunally, I haven't found a way to fix this yet, but I'm open to suggestions.

- Some commands won't output color by default, for example ls (even if colored in your terminal), won't output color when run with misobox.
  In this case it's because ls is actually an alias for `ls --color=auto`, which misobox doesn't use.
  Other commands like gcc use their own method to detect if they're being run in a terminal and output color accordingly, which I still haven't figured out, so they won't output color either.
