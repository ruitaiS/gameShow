import React from "react";
import Webcam from "react-webcam";
import '../index.css'

function ReactCamera(props){

const videoConstraints = {
        //width: 1280,
        //height: 720,
        //wrnch renders a square
        //Make sure width is the same as "scale" in drawFigure in App.js
        //Vertical alignment will need tweaking if camera input is not also square
        width: 480,
        height: 480,
        facingMode: "user"
    };

    const webcamRef = React.useRef(null);
    const [imgSrc, setImgSrc] = React.useState(null);
    const capture = React.useCallback(() => {
        //getScreenshot() is already base64!
        const imageSrc = webcamRef.current.getScreenshot();
        //Call sendToFlask method from within App.js
        props.sendToFlask(imageSrc);
        setImgSrc(imageSrc);
    }, [webcamRef, setImgSrc]);

    return(
        <div>
            <Webcam
                class="webcam"
                videoConstraints={videoConstraints}
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
            />

            <button class = "webcamBtn" onClick={capture}>Capture Photo</button>
            <img src={imgSrc}/>
        </div>
    );
}

export default ReactCamera;

