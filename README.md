# misobox

ferment your errors like miso

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/misobox.svg)](https://npmjs.org/package/misobox)
[![Downloads/week](https://img.shields.io/npm/dw/misobox.svg)](https://npmjs.org/package/misobox)

<!-- toc -->

- [misobox](#misobox)
- [What is this?](#what-is-this)
- [Why?](#why)
- [Usage](#usage)
- [Commands](#commands)
- [Tips](#tips)
<!-- tocstop -->

# What is this?

misobox is a small tool that runs a command and collects all errors (stderr) to review later.
It's especially useful for the development of projects that can error out but continue working, for example web servers (if a page/api breaks the server remains available for other pages), here misobox can help by collecting errors without having to read though lines of logs.

# Why?

misobox was made for two very simple reasons:

- I tend to walk away from projects for a while and having something that keeps record of issues to fix (imo) can be useful.
- I also tend to be lazy in terms of logging so often I just print to console, which is useful in the moment but not as much after the shell is closed.

# Usage

Using misobox is quite simple:

<!-- usage -->

```sh-session
$ npm install -g misobox
$ misobox COMMAND
running command...
$ misobox (--version)
misobox/0.1.0 linux-x64 node-v23.6.0
$ misobox --help [COMMAND]
USAGE
  $ misobox COMMAND
...
```

<!-- usagestop -->

After running `misobox run` or `misobox add` a file containing all the notes will be created in the current folder (`.misobox.jsonl.gz`).

# Commands

<!-- commands -->

- [`misobox add [NOTE]`](#misobox-add-note)
- [`misobox clear`](#misobox-clear)
- [`misobox help [COMMAND]`](#misobox-help-command)
- [`misobox recall`](#misobox-recall)
- [`misobox remove`](#misobox-remove)
- [`misobox run [COMMAND]`](#misobox-run-command)

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

# Tips

- When using `misobox run`, you can add "--" to prevent misobox from parsing them:

  ```sh-session
  $ misobox run ping -c 4 example.com   # -c will be parsed by ping and miso

  $ misobox run -- ping -c 4 example.com  # -c will be parsed only by ping
  ```

- misobox stores its data in a JSON Lines file compressed with GZip, to speed up the process of saving data, misobox compresses just the current line with GZip and then appends it.  
  To recompress everything, just run `misobox remove` (even without selecting anything).

- Because of how node.js handles stdout/stderr if the application you're passing to misobox is printing a lot, very quickly, errors may get buffered and printed later than normal. Unfortunally I don't know how to fix this.
