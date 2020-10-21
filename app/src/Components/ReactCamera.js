import React from "react";
import Webcam from "react-webcam";

function ReactCamera(props){

const videoConstraints = {
        //width: 1280,
        //height: 720,

        //wrnch uses a square
        //Make sure the width/height are the same as "scale" in drawFigure in App
        width: 480,
        height: 480,
        facingMode: "user"
    };

    const webcamRef = React.useRef(null);
    const [imgSrc, setImgSrc] = React.useState(null);

    
    const capture = React.useCallback(() => {
        //getScreenshot() is already base64!
        const imageSrc = webcamRef.current.getScreenshot();
        console.log(imageSrc);

        //Call sendToFlask method from within App.js
        props.sendToFlask(imageSrc);

        setImgSrc(imageSrc);

    }, [webcamRef, setImgSrc]);


        return(
            <div>
                <head>
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossOrigin="anonymous"/>
                </head>

                <div style={{position: 'absolute', left: '50%', top: '30%',transform: 'translate(-50%, -50%)'}}>
                
                <Webcam
                videoConstraints={videoConstraints}


                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                />

                </div>
                <div style={{position: 'absolute', left: '50%', top: '70%', transform: 'translate(-50%, -50%)'}}> <button onClick={capture}>Capture photo</button> </div>
                {imgSrc && (
                <img
                src={imgSrc}
                />
                )}
            </div>
        );
}

export default ReactCamera;

