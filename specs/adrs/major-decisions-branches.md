# Decision/Choice
- Status: accepted
- Deciders: the whole team
- Date: 11/15/2022

## Context and Problem Statement
How should we push our code to the repository? How do we make sure that the code pushed to the main branch is fully functional and error free?

## Decision Drivers
- We need to implement a branch system that ensures that the code sent to main is functional and correct.
- We want to minimize bad merging of repositories and disfunctional code
- We want to maximize the outcome of a complete and functional repository through branches.

## Considered Options
- Create seperate branches for pushing the code initially, and then once that is reviewed, push it to a branch called "develop" that contains the end product
- Create seperate branches and then, after review, push it straight to main.

## Decision Outcome
Chosen option and reason: We chose the first option because it ensures that we have one last check on the final product to make sure nothing ruins the main branch.

### Positive Consequences <!-- optional -->
- Main branch does not get ruined
- Extra reviews done before pushing to the main branch
- Avoid any potential errors that could mess with the main branch

### Negative Consequences <!-- optional -->
- could be confusing at first
- could be time consuming

## Pros and Cons of the Options <!-- optional -->

### Push to "develop" branch instead of main 
General Description <!-- optional -->
- Good, because it is ensures that the main branch does not get ruined
- Good, because it allows the team to run extra reviews on the final product before pushing it to main
- Good, because it serves a precautionary measure for any mistakes that may have occurred
- Bad, because it can be confusing
- Bad, because it could be time consuming

### Push to main branch from another branch
General Description <!-- optional -->
- Good, because it is reduces the time of extra reviews
- Good, because it is simple to understand
- Bad, because it can lead to problems in main if the merged branch had problems
- Bad, because no extra reviews are done, and if they are and they find an error, it is much difficult to fix within the main branch then another.
- Bad, because of the posing risk of errors within main

## Links 
