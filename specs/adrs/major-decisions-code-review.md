# Decision/Choice
- Status: accepted
- Deciders: Whole Team, targeted towards backend and frontend devs
- Date: 11/14/2022

## Context and Problem Statement
Once code is pushed to a branch, how should we regulate it and make sure it is viable code to push to main?

## Decision Drivers
- We need to implement code reviews to ensure code is viable and ready to push to the main branch.
- We want to minimize coding, styling, linter, and syntax errors.
- We want to maximize code functionality.

## Considered Options
- Code Reviews 
- No Code Reviews

## Decision Outcome
Chosen option and reason: The best choice was to implement code reviews because it serves as an additional check to see if the code truly works and is ready to be pushed to the main branch.

### Positive Consequences <!-- optional -->
- Consistent coding style
- Less Linter errors
- Could find potential edge cases
- Ensures functionality
- No syntax or styling errors

### Negative Consequences <!-- optional -->
- Can be time consuming for reviewer and reviewee
- Could potenitally ruin working code

## Pros and Cons of the Options <!-- optional -->

### Code Reviews
General Description <!-- optional -->
- Good, because it is ensures that the code is fully functional and ready to push to main.
- Good, because it reduces errors from the linter
- Good, because it keeps code styling consistency
- Bad, because it is time consuming
- Bad, because it can potentially ruin the code

### No Code Reviews
General Description <!-- optional -->
- Good, because it is less time consuming
- Bad, because it could lead to many linter issues
- Bad, because the coding style would not be consistent
- Bad, because there is no check to see if the code truly works and aligns with the project base

## Links 
