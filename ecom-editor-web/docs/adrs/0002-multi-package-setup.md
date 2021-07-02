# 2. Multi-package setup

Date: 2019-07-09

## Status

Accepted

## Context

We now have multiple teams contributing to a single codebase, which makes difficult to coordinate changes across teams and with current setup code ownership cannot be scoped. Main goals are well-defined code boundaries, separate code owners per modules and existing fast and simple DX.

## Decision

The project will be managed as multi-package repositories using [Lerna](https://lerna.js.org) by splitting into separate independent packages, based on functionality (e.g. ecom-editor-smartbook, ecom-editor-uploader, ...). Lerna is a tool that optimizes the workflow around managing multi-package repositories with git and NPM.

## Consequences

The setup now simplifies coordinating changes across packages (across different teams) as a single PR, packages also encourage for well-defined API, having a separate code location enables us to scope ownership (based on teams), there is now a single place to report issues, lint & build & test and manage release process with no changes to the development workflow or CI pipeline.
