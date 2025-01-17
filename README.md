misobox
=================

ferment your errors like miso


[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/misobox.svg)](https://npmjs.org/package/misobox)
[![Downloads/week](https://img.shields.io/npm/dw/misobox.svg)](https://npmjs.org/package/misobox)


<!-- toc -->
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
misobox/0.0.0 linux-x64 node-v23.3.0
$ misobox --help [COMMAND]
USAGE
  $ misobox COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`misobox hello PERSON`](#misobox-hello-person)
* [`misobox hello world`](#misobox-hello-world)
* [`misobox help [COMMAND]`](#misobox-help-command)
* [`misobox plugins`](#misobox-plugins)
* [`misobox plugins add PLUGIN`](#misobox-plugins-add-plugin)
* [`misobox plugins:inspect PLUGIN...`](#misobox-pluginsinspect-plugin)
* [`misobox plugins install PLUGIN`](#misobox-plugins-install-plugin)
* [`misobox plugins link PATH`](#misobox-plugins-link-path)
* [`misobox plugins remove [PLUGIN]`](#misobox-plugins-remove-plugin)
* [`misobox plugins reset`](#misobox-plugins-reset)
* [`misobox plugins uninstall [PLUGIN]`](#misobox-plugins-uninstall-plugin)
* [`misobox plugins unlink [PLUGIN]`](#misobox-plugins-unlink-plugin)
* [`misobox plugins update`](#misobox-plugins-update)

## `misobox hello PERSON`

Say hello

```
USAGE
  $ misobox hello PERSON -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Who is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ misobox hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [src/commands/hello/index.ts](https://github.com/spacefall/misobox/blob/v0.0.0/src/commands/hello/index.ts)_

## `misobox hello world`

Say hello world

```
USAGE
  $ misobox hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ misobox hello world
  hello world! (./src/commands/hello/world.ts)
```

_See code: [src/commands/hello/world.ts](https://github.com/spacefall/misobox/blob/v0.0.0/src/commands/hello/world.ts)_

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

## `misobox plugins`

List installed plugins.

```
USAGE
  $ misobox plugins [--json] [--core]

FLAGS
  --core  Show core plugins.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ misobox plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.25/src/commands/plugins/index.ts)_

## `misobox plugins add PLUGIN`

Installs a plugin into misobox.

```
USAGE
  $ misobox plugins add PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into misobox.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the MISOBOX_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the MISOBOX_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ misobox plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ misobox plugins add myplugin

  Install a plugin from a github url.

    $ misobox plugins add https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ misobox plugins add someuser/someplugin
```

## `misobox plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ misobox plugins inspect PLUGIN...

ARGUMENTS
  PLUGIN...  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ misobox plugins inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.25/src/commands/plugins/inspect.ts)_

## `misobox plugins install PLUGIN`

Installs a plugin into misobox.

```
USAGE
  $ misobox plugins install PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into misobox.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the MISOBOX_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the MISOBOX_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ misobox plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ misobox plugins install myplugin

  Install a plugin from a github url.

    $ misobox plugins install https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ misobox plugins install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.25/src/commands/plugins/install.ts)_

## `misobox plugins link PATH`

Links a plugin into the CLI for development.

```
USAGE
  $ misobox plugins link PATH [-h] [--install] [-v]

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help          Show CLI help.
  -v, --verbose
      --[no-]install  Install dependencies after linking the plugin.

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ misobox plugins link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.25/src/commands/plugins/link.ts)_

## `misobox plugins remove [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ misobox plugins remove [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ misobox plugins unlink
  $ misobox plugins remove

EXAMPLES
  $ misobox plugins remove myplugin
```

## `misobox plugins reset`

Remove all user-installed and linked plugins.

```
USAGE
  $ misobox plugins reset [--hard] [--reinstall]

FLAGS
  --hard       Delete node_modules and package manager related files in addition to uninstalling plugins.
  --reinstall  Reinstall all plugins after uninstalling.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.25/src/commands/plugins/reset.ts)_

## `misobox plugins uninstall [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ misobox plugins uninstall [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ misobox plugins unlink
  $ misobox plugins remove

EXAMPLES
  $ misobox plugins uninstall myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.25/src/commands/plugins/uninstall.ts)_

## `misobox plugins unlink [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ misobox plugins unlink [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ misobox plugins unlink
  $ misobox plugins remove

EXAMPLES
  $ misobox plugins unlink myplugin
```

## `misobox plugins update`

Update installed plugins.

```
USAGE
  $ misobox plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.25/src/commands/plugins/update.ts)_
<!-- commandsstop -->
