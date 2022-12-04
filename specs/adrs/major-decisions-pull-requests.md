# Decision/Choice
- Status: Accepted
- Deciders: Manny and Nathan
- Date: 11/11/2022

## Context and Problem Statement
How should we handle version control for the project? Who should work on what branches and when are they merged/reviewed?

## Decision Drivers
- We need to implement how pull requests are handled.
- We want to minimize clutter and disorganization in the repository, and also limit merge conflicts.
- We want to maximize the number of issues we can properly handle.

## Decision Outcome
- Create a new branch for each major feature through GitHub issues.
- Merge requests with main will be reviewed by multiple team members.

### Positive Consequences <!-- optional -->
- Easily able to link issues to branches
- Allows many people to look at code they did not directly work on.

### Negative Consequences <!-- optional -->
- Could lead to an overwhelng number of branches if not done carefully.
- Will take more time to get started on an issue.

## Links 
- https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/merging-a-pull-request
