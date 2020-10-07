# Japanese Game Show Game

For the 2020 McGill AI Society (MAIS) Hackathon, we ([Alex](https://github.com/allu5662), [Micaela](https://github.com/mgraiver), [Ronan](https://github.com/RonanAlmeida), and [Ruitai](https://github.com/ruitaiS)) decided to make a virtual version of this [Japanese Game Show](https://youtu.be/6ioiMXKpHxI)


## Implementation Details:

### Tech Stack:
We used React on the front-end, and Flask for the back-end. Posture recognition was provided by the [WRNCH](https://wrnch.ai/) computer vision API.

[//]: # TODO: List the libraries used

### Posture Recognition:
The React-Camera component takes a picture via the user's webcam, and sends it to the Flask server via a POST request as a Base64 byte string. Flask then decodes the byte string back into an image, storing it locally before uploading it to WRNCH's servers for processing. 

### JSON Parsing:

After processing, WRNCH returns a JSON string containing an array of coordinates corresponding to different joints on the body. For indexes i = 0 to 25, the ith position contained the x coordinate while the i + 1 position contained the y coordinate.

<p align="center">
  <img src="https://devportal.wrnch.ai/assets/coord_spaces_2D-9b4c3afa7bf52fa585afd6b1fd3e944c30418964e6376d45722a22dc4c4b7ce1.png">
</p>
 The coordinates were unit normalized, meaning that they ranged in value from 0-1. This allowed us easily scale the image by multiplying the coordinates by a set constant (we went with 500).

<p align="center">
    <img src="https://devportal.wrnch.ai/assets/j25_body_joints-4ef1dbefbe34c98952cc14df51e8074ebe3bbb1fed4bc53f66943e23451aa29c.png">
</p>
In addition, not all joints were connected. Using the above reference provided by the API documentation, we hard coded the indices of connected joints into an array. By iterating over this array, we were able to then draw line segments between connected joints and display the skeletal figure to the screen.

 

### Collision Detection:

