# appist

A single platform to deliver your application continuously on AWS.

## Prerequisites

- [Go >= 1.13](https://golang.org/dl/)
- [NodeJS >= 13](https://nodejs.org/en/download/)
- [PostgreSQL >= 12](https://www.postgresql.org/download/)

> We're using `asdf` to manage the language runtime versions and `docker-compose` to run datastore for local development.

## Setup Environment

- Install [Docker](https://www.docker.com/products/docker-desktop)

- Install [Homebrew](https://brew.sh/)

- Install the project's required toolings

```sh
$ make bootstrap
```

- Ensure `~/.bash_profile` has the snippet below:

```sh
. $(brew --prefix asdf)/asdf.sh
. $(brew --prefix asdf)/etc/bash_completion.d/asdf.bash

export GOROOT=$(go env GOROOT)
export GOPATH=$(go env GOPATH)
export PATH="/usr/local/sbin:$GOPATH/bin:$PATH"

alias gr="go run ."
```

> The command alias `gr` is optional which will save us from typing `go run .` command. In addition, please run `source ~/.bash_profile` in each terminal to ensure the scripts take effect.

## Quick Start

```sh
// Install backend/frontend project dependencies
$ make install

// Run dc:up/db:create/db:schema:load/db:seed to setup the datastore with seed data
$ go run . setup

// Setup the locally trusted SSL certificates (optional)
$ go run . ssl:setup

// Run the golang backend/frontend server and worker for local development
$ go run . start
```
