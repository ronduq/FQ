# How to run on different environments

Firstly, make sure you have an up-to-date version of `ecom-orchestration-api` checked-out locally. Navigate to its root directory and run:
* `yarn install`
* `POD_NAMESPACE=staging yarn dev`: you can replace the word "staging" with the environment you want to run on.

`yarn dev` without the `POD_NAMESPACE` will run on `development` (env0).

Secondly, run `ecom-editor-web` with the following command:

* `GRAPHQL_URL=http://localhost:6001 GRAPHQL_CDN_URL=http://localhost:6001 yarn dev`
