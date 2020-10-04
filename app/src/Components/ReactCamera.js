import React from "react";
import Webcam from "react-webcam";

function ReactCamera() {
    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user"
    };

    const webcamRef = React.useRef(null);
    const [imgSrc, setImgSrc] = React.useState(null);

    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
    }, [webcamRef, setImgSrc]);

        return (

            <div>
                <head>
                    <link rel="stylesheet"
                          href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
                          integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z"
                          crossOrigin="anonymous"/>

                          

                </head>

                <div style={{         position: 'absolute', left: '50%', top: '50%',         transform: 'translate(-50%, -50%)'     }}>
                <Webcam
                    videoConstraints={videoConstraints}
                    width={480}
                    height={720}

                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                />
                </div>
                <div style={{         position: 'absolute', left: '50%', top: '70%',         transform: 'translate(-50%, -50%)'     }}> <button onClick={capture}>Capture photo</button> </div>
                {imgSrc && (
                    <img
                        src={imgSrc}
                    />
                )}
            </div>
        );

}
export default ReactCamera;

