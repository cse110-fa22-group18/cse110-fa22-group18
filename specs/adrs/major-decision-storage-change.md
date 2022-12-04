# Decision/Choice
- Status: accepted
- Deciders: The whole team
- Date: 12/3/2022

## Context and Problem Statement
How should we deal with the problem of local storage having a 5mb cap? Storing images, especially after editing them, takes up a lot more space than anticipated.

## Decision Drivers
- We need to implement a solution that gets rid of the local storage limit while still being local.
- We want to minimize issues pertaining to image size and storage.
- We want to maximize the size of the storage in which the image will be kept.

## Considered Options
- Stick with local storage and lower the quality of the image.
- Go with Shubham's suggestion to make an index.db database file that would essentially mimic local storage, but without the size cap.

## Decision Outcome
Chosen option and reason: We decided to go with creating an index.db database file to store all the images. The clear reason of doing this was to ensure that users can store as many pictures as they want.

### Positive Consequences <!-- optional -->
- Can store as many images as we want
- No longer have to deal with local storage size cap
- Seems to work better than local storage
- Don't have to lower image quality to store images

### Negative Consequences <!-- optional -->
- Took some time to implement and finish in comparison to local storage

## Pros and Cons of the Options <!-- optional -->

### Stick with local storage and lower quality
General Description <!-- optional -->
- Good, because it is allows us to simply use local storage
- Good, because it is easier to implement
- Bad, because users will eventually hit the 5mb cap

### Index.db Local database file
General Description <!-- optional -->
- Good, because it mimics local storage without the 5mb cap
- Good, because users can store as many images as they want
- Bad, because it took a lot longer to implement than local storage

## Links 
