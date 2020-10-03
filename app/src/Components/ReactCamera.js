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
                <Webcam
                    videoConstraints={videoConstraints}
                    width={480}
                    height={720}

                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                />
                <button onClick={capture}>Capture photo</button>
                {imgSrc && (
                    <img
                        src={imgSrc}
                    />
                )}
            </div>
        );

}
export default ReactCamera;

