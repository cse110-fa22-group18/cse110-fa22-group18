# Decision/Choice
- Status: accepted
- Deciders: The whole team
- Date: 11/25/2022

## Context and Problem Statement
How should we test our code? Specifically, how can we automate our testing to reduce the slowness and risks of manual testing?

## Decision Drivers
- We need to implement e2e testing with puppeteer to automate upload and display testing
- We want to minimize manual testing that is time intensive
- We want to maximize efficiency in testing

## Considered Options
- Puppeteer (w/ Node JS)
- JQuery (w/ Node JS)

## Decision Outcome
Chosen option and reason: Puppeteer because of its introduction through the lab. Node JS will enable file system manipulation to better replicate the user workflow of uploding local files.

### Positive Consequences <!-- optional -->
- Automated upload and display testing to be used in the development pipeline
- Puppeteer has the necessary features for the user workflow of our website

### Negative Consequences <!-- optional -->
- There is so much to puppeteer that it is confusing
- Difficult to find the correct methods and functionalities to use

## Links 
- [Puppeteer API](https://github.com/puppeteer/puppeteer/blob/v1.18.1/docs/api.md)
