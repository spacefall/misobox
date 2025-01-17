# misobox

ferment your errors like miso

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/misobox.svg)](https://npmjs.org/package/misobox)
[![Downloads/week](https://img.shields.io/npm/dw/misobox.svg)](https://npmjs.org/package/misobox)

<!-- toc -->
* [misobox](#misobox)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->
```sh-session
$ npm install -g misobox
$ misobox COMMAND
running command...
$ misobox (--version)
misobox/0.0.0 linux-x64 node-v23.6.0
$ misobox --help [COMMAND]
USAGE
  $ misobox COMMAND
...
```
<!-- usagestop -->

# Commands

<!-- commands -->
* [`misobox run [COMMAND]`](#misobox-run-command)

## `misobox run [COMMAND]`

Run command and log errors

```
USAGE
  $ misobox run [COMMAND...] [-l] [-v]

ARGUMENTS
  COMMAND...  command to run

FLAGS
  -l, --logoutput  Enable logging for stdout
  -v, --verbose    Print more info while running

DESCRIPTION
  Run command and log errors

EXAMPLES
  $ misobox run
```

_See code: [src/commands/run.ts](https://github.com/spacefall/misobox/blob/v0.0.0/src/commands/run.ts)_
<!-- commandsstop -->
