# Status: Somewhat Functional
### Planned Features
- Code quality checking using CodeCimate (maybe)
- Unit tests for every JS function using Jest
- Automated documentation using JSDocs

### Current Features
- Javascript style linting using ESLint
- Dummy Jest unit test
- Pull review request

### Current Process
When a commit or pull request is made to main or develop:
1. Run ESLint on all Javascript files.
	* ESLint will attempt to fix any style mistakes on its own before throwing an error
2. Check all unit tests
	* sum.js
		* sum(1+2) = 3
3. Have a code review request made to any pull request
	* Since this is a private repository, no review requests are made
