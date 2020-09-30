import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const FaceImageTaker = ({ image, setImage }) => {
  const [screenshot, setScreenShot] = useState(true);
  const [dataURL, setDataURL] = useState(null);

  const urltoFile = (url, filename, mimeType) => {
    return fetch(url)
      .then(function (res) {
        return res.arrayBuffer();
      })
      .then(function (buf) {
        return new File([buf], filename, { type: mimeType });
      });
  };
  const handleSuccess = (stream) => {
    let video = document.querySelector("#taker-face-reg");
    window.stream = stream;
    video.srcObject = stream;
  };
  const handleError = (error) => {
    console.log(error);
  };
  useEffect(() => {
    navigator.getUserMedia({ video: true }, handleSuccess, handleError);
  }, []);
  const takePhoto = () => {
    if (screenshot) {
      let canvas = document.querySelector(
        ".face-recognition-container .camera canvas"
      );
      let video = document.querySelector("#taker-face-reg");

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext("2d").drawImage(video, 0, 0);
      let data = canvas.toDataURL();
      setDataURL(data);
      urltoFile(data, `${uuidv4()}.png`, "image/png").then((file) => {
        setImage(file);
        setScreenShot(false);
      });
    } else {
      navigator.getUserMedia({ video: true }, handleSuccess, handleError);
      setScreenShot(true);
      setImage(null);
    }
  };

  return (
    <div className="camera">
      <div>
        {!image && (
          <video
            id="taker-face-reg"
            height="560"
            width="720"
            autoPlay
            muted
          ></video>
        )}
        {image && <img src={dataURL} alt="Display screenshot" />}
      </div>
      <canvas style={{ display: "none" }}></canvas>
      <div className="take-photo-buttons">
        <div className="screenshot-button btn" onClick={takePhoto}>
          {screenshot ? "Screenshot" : "Retake"}
        </div>
      </div>
    </div>
  );
};

export default FaceImageTaker;
