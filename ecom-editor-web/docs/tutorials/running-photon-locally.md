# How to run photon tests against a local version of ecom-editor-web:

We need to run orchestration layer locally (on http://localhost:6001). Navigate to ecom-orchestration-api and run

- `Git pull` (on master)
- `yarn`
- `yarn dev`

We need ecom-editor-web to be running against the local version of ecom-orchestration-api. There are two ways to do this:

- **Option 1**
  - Go to ecom-editor-web packages/ecom-editor-web/src/config/index.js
  - Change the value of `appConfig.namespace.default` to be `local` (this will use packages/ecom-editor-web/config/ui-local.json settings which points orchestration calls to http://localhost:6001)
  - `yarn dev`
- **Option 2**
  - Follow the instructions in the docs [here](./running-different-environments.md)

We now want to run the photon tests. Navigate to photon and run

- `node ./photon.js test -p ecom-editor-web --env local --proxy --headless --report -t '@localpass'`
- Note that we need the `@localpass` tag to ignore tests that would certainly fail because this is running locally
- For more information on how to run photon locally, look in the project docs [here](https://github.com/photobox/photon-v3/wiki/Running-Photon-Tests)
