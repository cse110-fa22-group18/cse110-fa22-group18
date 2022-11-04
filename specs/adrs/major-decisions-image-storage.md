# Image Storage for Uploading and Downloading
- Status: accepted
- Deciders: Mandeep Chera, Daniel George, and Ira Hanabusa
- Date: 11/3/2022

## Context and Problem Statement
How should we store the image when a user uploads it, and how can they download it from local storage. We need to consider which data structure to use to store the images and how to store and access it in local storage.

## Decision Drivers
- We need to implement local storage for images in respect to uploading and downloading.
- We want to minimize complexity and confusion.
- We want to maximize ease of storage and accessibility of images

## Considered Options
- Storing images straight to local storage without a data structure
- Storing images to local storage with one data structure that holds all images.

## Decision Outcome
Chosen option and reason: Image storage via a data structure because it will be more organized in the way it is stored and it will additionally be easier to access and traverse.

### Positive Consequences <!-- optional -->
- Easy accessibility
- Simple storage
- Better organized (having one data structure stored in local storage rather than many)

### Negative Consequences <!-- optional -->
- None as of now

## Pros and Cons of the Options <!-- optional -->

### No Data Structure
General Description <!-- optional -->
- Good, because it adds the image directly to the local storage
- Bad, because it clutters local storage with too many items
- Bad, because it can become confusing when many images are stored
- Bad, because it could be difficult to reorder the images

### With Data Structure
General Description <!-- optional -->
- Good, because it is easier to access each image
- Good, because there is less clutter within the local storage
- Good, because the images are organized and be stored easily
- Good, because it conveniently stores every image within one local storage array
- Good, because it is easy to change order of images

## Links 
