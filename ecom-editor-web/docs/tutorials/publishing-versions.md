## Introduction

This package's versions are hosted on [NPM](https://www.npmjs.com/package/@photobox/ecom-editor-web) and they use the [Semantic Versioning 2.0.0](https://semver.org) pattern. Only the `master` branch's builds are published as new versions on NPM according to the current settings. Every new version is incremented as a PATCH.

## Publishing settings

This package uses the `ecom-npm-publisher` dependency to manage the publishing process and details. Its settings are the following in the codebase:

1. By default, only the `master` branch's builds are deployed as new versions on NPM. If this needs changing in the future, then the line `branch: master` should be removed from the `npm-publish` step in `project.settings.yaml`.

2. By default, a new version deployed increments only the PATCH version. If the functionality added subscribes to a MINOR or MAJOR version, then the `"release"` sub-property of the `"config"` property in `packages/ecom-editor-web/package.json` should be changed from the default `"patch"` to the relevant version. After the NPM deployment, it should be restored back to `"patch"` to avoid carrying this behaviour in the future deployments.

## Details

Please advise the documentation of [ecom-npm-publisher](https://github.com/photobox/ecom-npm-publisher#photoboxecom-npm-publisher) for further publising details. You can also see the code of the publishing scripts inside its `bin` folder.
