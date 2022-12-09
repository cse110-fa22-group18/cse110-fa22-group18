### Current Features
- Javascript style linting using ESLint
- End to end testing using Jest and Puppeteer
- Documentation generation using JSDocs
- Create a pull review request

### Current Process

When a commit or pull request is made to main or develop:
1. Check all end to end tests using Jest and Puppeteer.
	* upload-display.test.js
		- "An 'anchor > img' nest should be generated for each image uploaded"
			* Uploads images from the ‘test-image’ directory. Uses timeouts for visual confirmation of file selection and image display in the gallery when testing locally. Tests if the number of the images stored in local storage matches the number of image tags generated in the HTML. Tests if the img src attributes match the image paths in localStorage.
		* "Checking if gallery remains populated after reload"
			* Reloads the page. Tests if the number of the images stored in local storage matches the number of image tags generated in the HTML. Tests if the img src attributes match the image paths in localStorage.
		* "No 'a > img' nests should exist after each image is deleted"
			* Clicks on each image and deletes it using the prompt box. The page queries for img tags within the gallery section. Tests if the returned query size is 0.
		* "Checking if gallery remains empty after reload"
			* Reloads the page. The page queries for img tags within the gallery section. Tests if the returned query size is 0.
	* page-navigate.test.js
		* "Navigate to edit page"
			* Uploads an image from the test-image directory and navigates to the edit page using the prompt box after clicking on the image. Test checks the url of the page to determine if the user is on the edit page.
		* "Return to home using logo"
			* Clicks on the team logo to return to the home page. Test checks url to determine if the user is back on the home page.
		* "Return to home using team name"
			* Navigate to the edit page. Return to home by clicking on the team name. Test checks url to determine if the user is back on the home page.
		* "Return to home using 'Upload Picture' anchor"
			* Navigate to the edit page. Return to home by clicking on the ‘Upload Picture’ anchor. Test checks url to determine if the user is back on the home page. Test checks url to determine if the page jumps to the ‘Upload Picture’ section.
		* "Return to home using 'View/Edit Gallery' anchor"
			* Navigate to the edit page. Return to home by clicking on the ‘View/Edit Gallery’ anchor. Test checks url to determine if the user is back on the home page. Test checks url to determine if the page jumps to the ‘View/Edit Gallery’ section.
	* brightness.test.js
		* "Increase brightness"
			* Uploads an image from test-images, select the image to edit, and change the brightness. Change the brightness value again and save the image. The test passes if the edited image is in gallery.
	* rotate.test.js
		* "Image is properly rotated"
			* Uploads an image from test-images, select the image to edit, and rotates it. Checks that the width and height are swapped. Rotates again and checks if the width and height are swapped.
	* unit.test.js and sum.test.js
		* These are exploratory functions to try out unit testing, which did not work.
2. If this ran on a pull request, stop. Otherwise, run ESLint on all Javascript files.
	* ESLint will attempt to fix any style mistakes on its own before throwing an error.
3. Generate documentation using JSDocs to the ./document directory.
	* All .js files in assets/source/scripts will be documented.
4. Commit changes made by ESLint and JSDocs.
	* Modify all JS files that were touched up by lint.
	* Add and commit all ./document files for documentation.
5. Create a code review request.
	* Everyone on the team has admin permissions, so this is typically ignored
	* So the only thing bothered by this was the commit action, but it's good to have this in practice.