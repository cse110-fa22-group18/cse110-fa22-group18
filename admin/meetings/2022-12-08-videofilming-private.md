# private video

### introduction MANDEEP (5 sec)

### each team member explaining what they did, what they are proud of, and what they feel they could improve on or address beyond the class (30sec) EVERYONE (4:30)

### discussion about how to access the repo a tour of the repo organization and NATHAN (2:00)

### a demonstration of making a small change to the repo and the completion of the build process TIM (2:00)

### a more involved retrospective about how your Agile practices were conducted YIYU (2:00)
	-daily updates via standups and slack
	-what we did on retrium (what went well and what didnt’ and then creating appropriate action plans)
	-pull requests and issues to indicate what needed to be done and reviewed
	-ADRs were made each time an important decision was made, an example being our switch from local storage to index.db
	-Documentation of each file to indicate what each function did
	-Weekly sprint and retrospective meetings to discuss what we did, what needs to be done, and how to tackle any issues brought up
	-Meeting deadlines to meet the incremental requirements for project completion
	-Keeping documentation for each meeting conducted by the team
	-maintaining the functionality of the web app each time we PR and merge
	-creating user stories to understand how to satisfy a “customer”
	-creating high fidelity wireframes to design the web application
  
### what challenges and victories the team faced part 1 DANNY (1:30)
	-Scheduling and communication was difficult to establish at first, but we were able to find a solution after addressing it within a meeting. In the middle of doing the project, communication between front-end and back-end was a little off because it was difficult to decide on slack
	-Losing one member of the team and losing another team leader for a bit due to an illness was challenging, but we didn’t let that stop us from finished the project
	-The local storage size limit of 5mb was a great challenge as storing images easily meets this
	-Managing the styles of coding of each individual within both frontend and backend was a challenge as incremental changes require massive changes in structure
	-Styling was difficult because some people would use a grid box and others would use a flex box, and so this would result in revamping the code to synchronize with the rest. An example of this would be the brightness bar, which required frontend to change both the html and the css because of the way backend did it (image container was connected to javascript)
	-We would have saved a lot of time if there was more commenting on certain parts of the html and JS functions
	-Don't wait too long to PR - creates a lot of merge conflicts because the parent branch is far ahead of the feature branch. Also waiting longer means more code to review.
	
### what challenges and victories the team faced part 2 Mandeep (2:00)
	  -More foresight in backend design - more classes, more functions, more modular. In our code, our actual scripts were longer than expected and more modular code could have been easier to read, edit, and test. This made it a little difficult to change the code from localStorage to indexedDB , classes and functions in module files could have made it easier.
	  -Better communication on who is doing what and what their deadlines are. We got the hang of it later on but in the beginning we lacked direction and people didn't always know what to work on. It got better as we started to use github issues more. We need to divide tasks into more bite sized chunks.
	  -More communication of changes that can affect others - notes in PR, messages in slack. As we started making more frequent PRs, people better communicated changes that could affect others.
	  -Project was completed on time with everything working perfectly
	  -Front-end completed their work efficiently allowing for quick changes if needed
	  -Did a great job in managing branches, well described pull requests (creating a template), and issues throughout the entirety of the project
	  -Testing was completed effectively, especially when we made our big switch to index.db from local storage
	  -The pipeline was built with precision and worked extremely well with the linter checking our code, running tests, and documenting via JSDocs
	  -Back-end did a great job in creating functions effectively and efficiently so that it could be applied back to the front-end and testing

### Conclusion with discussion of what things a team taking on your project should do next (discuss features not built yet, improvements to the build pipeline or anything else you would have gotten given another quarter worth of work) JIAYI (< 1 min if possible)
	-Implemented more stretch features such as drawing, multiple image upload, clear gallery button, adding shapes to images, more file type support, user login to save images to accounts, and cropping images
	-Could have made a mobile version of the web app (more responsive), made more polished animations, design the web app with more complexity, make the display after edits run faster with canvas
	-For the pipeline we could add a code quality checker and more testing



