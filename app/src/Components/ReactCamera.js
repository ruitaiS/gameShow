import React from "react";
import Webcam from "react-webcam";

let res = [];

function ReactCamera(props){
if (res.length == 2){
    res = [];
};

const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user"
    };

    const webcamRef = React.useRef(null);
    const [imgSrc, setImgSrc] = React.useState(null);
    
    alert("1Res Length " + res.length);

    
    const capture = React.useCallback(() => {
        //getScreenshot() is already base64!
        const imageSrc = webcamRef.current.getScreenshot();
        console.log(imageSrc);

        //Send data back to App.js so it can send to Flask
        alert("Capture");
        res.push(props.callBack(imageSrc));
        alert("2Res Length " + res.length);

        setImgSrc(imageSrc);

    }, [webcamRef, setImgSrc]);


        res.push(
            <div>
                <head>
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossOrigin="anonymous"/>
                </head>

                <div style={{position: 'absolute', left: '50%', top: '50%',transform: 'translate(-50%, -50%)'}}>
                
                <Webcam
                videoConstraints={videoConstraints}
                width={480}
                height={720}

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
        alert("Returning Res");
        alert("3Res Length " + res.length);
        return res;
}

export default ReactCamera;

