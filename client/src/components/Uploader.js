import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Uploader = ({ image, setImage, setError }) => {
  return (
    <div className="uploader-container">
      <DirectUploader image={image} setImage={setImage} setError={setError} />
      <div className="break">OR</div>
      <TakePhoto image={image} setImage={setImage} setError={setError} />
    </div>
  );
};

const DirectUploader = ({ image, setImage, setError }) => {
  const types = ["image/png", "image/jpeg", "image/jpg"];

  const uploadHandler = (e) => {
    setError(null);
    let selected = e.target.files[0];
    if (selected) {
      if (types.includes(selected.type)) {
        setImage(selected);
      } else {
        setError("Please provide .png, .jpeg or .jpg image");
        setImage(null);
      }
    } else {
      setError("Provide your face image");
      setImage(null);
    }
  };
  return (
    <div className="direct-image">
      <label>
        <input
          type="file"
          className="uploader btn"
          onChange={uploadHandler}
        ></input>
        <span>Upload image</span>
      </label>
      <div className="image-name">{image && image.name}</div>
    </div>
  );
};

const TakePhoto = ({ image, setImage, setError }) => {
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
    let video = document.querySelector("#video");
    window.stream = stream;
    video.srcObject = stream;
  };
  const handleStop = () => {
    if (window.stream) {
      window.stream.getTracks().forEach(function (track) {
        track.stop();
      });
    }
    let camera = document.querySelector(".uploader-container .camera ");
    camera.style.display = "none";
    setScreenShot(true);
  };
  const handleError = (error) => {
    console.error("Error", error);
  };
  const openCamera = () => {
    setError(null);
    setImage(null);
    let camera = document.querySelector(".uploader-container .camera ");
    camera.style.display = "initial";

    navigator.getUserMedia({ video: true }, handleSuccess, handleError);
  };
  const takePhoto = () => {
    if (screenshot) {
      let canvas = document.querySelector(".uploader-container .camera canvas");
      let video = document.querySelector("#video");

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
      openCamera();
      setScreenShot(true);
    }
  };
  return (
    <>
      <div className="take-photo" onClick={openCamera}>
        <CameraIcon />
      </div>
      <div className="camera">
        <div className="pre-images">
          {!image && (
            <video height="560" width="720" id="video" autoPlay muted></video>
          )}
          {image && <img src={dataURL} alt="Display screenshot" />}
        </div>
        <canvas style={{ display: "none" }}></canvas>
        <div className="take-photo-buttons">
          <div className="screenshot-button btn" onClick={takePhoto}>
            {screenshot ? "Screenshot" : "Retake"}
          </div>
          <div onClick={handleStop} className="btn">
            Close
          </div>
        </div>
      </div>
    </>
  );
};

const CameraIcon = () => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    </>
  );
};

export default Uploader;
