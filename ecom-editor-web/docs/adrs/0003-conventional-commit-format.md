# 3. Conventional merge requests

Date: 2019-08-13

## Status

Accepted

## Context

We now have multiple teams contributing to a single codebase, and we want to consolidate the format of merge requests

- for readability
- to better track changes
- ability to generate release logs
- to not pollute the master branch git log

## Decision

When a merge request is merged, the commits will be squashed. The title should include the number of the Jira ticket and its title. The content of the commit message needs to be reviewed, and the unnecessary commit messages should be removed.

## Consequences

Merged request messages are more readable.
