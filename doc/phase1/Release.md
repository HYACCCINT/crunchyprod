# Release.md

For every task in our project, we create issues in Zenhub and and close them after merging corresponding PRs. For smaller PRs, we require 2 approvals from teammates and for design related larger PRs, we require all members to have read through and approve of the PR, before it can be merged. 
The only time we allowed direct commits instead of PRs, was during the initialization of the project folders and the creation of the empty React app. All other commits require opening a pull request. There should not be a case where a PR is merged without review.

During development, we create branches, each addressing a different issue, and close the corresponding branch after the issue has been closed by their corresponding PR. In this sense, our master branch is our production branch, and all others are development branches.
