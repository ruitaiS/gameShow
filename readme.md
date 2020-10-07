# Japanese Game Show Game

For the 2020 McGill AI Society (MAIS) Hackathon, we ([Alex](https://github.com/allu5662), [Micaela](https://github.com/mgraiver), [Ronan](https://github.com/RonanAlmeida), and [Ruitai](https://github.com/ruitaiS)) decided to make a virtual version of this [Japanese Game Show](https://youtu.be/6ioiMXKpHxI)


## Implementation Details:

### Tech Stack:
We used React on the front-end, and Flask for the back-end. Posture recognition was provided by the [WRNCH](https://wrnch.ai/) computer vision API.

[//]: # TODO: List the libraries used

### Posture Recognition:
The React-Camera component takes a picture via the user's webcam, and sends it to the Flask server via a POST request as a Base64 byte string. Flask then decodes the byte string back into an image, storing it locally before uploading it to WRNCH's servers for processing. 

### JSON Parsing:


### Collision Detection:

