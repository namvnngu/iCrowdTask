import React, { useState } from "react";
import UploadImage from "../../utils/firebase/uploadImage";
import ProgressBar from "../ProgressBar";

const ImageUploader = ({ setTask, task }) => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [progressBar, setProgressBar] = useState(0);
  const [urls, setUrls] = useState([]);
  const types = ["image/png", "image/jpeg", "image/jpg"];
  const handleChange = async (e) => {
    setError(null);
    let imageNames = [];
    let imageArr = [];
    let urlArr = { urls: [] };
    let files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      if (types.includes(file.type)) {
        imageArr.push(file);
        imageNames.push(file.name);
      } else {
        imageArr = [];
        imageNames = [];
        setError("Please provide .png, .jpeg, .jpg files");
        break;
      }
    }
    if (files.length === imageArr.length) {
      for await (const image of imageArr) {
        await UploadImage(
          image,
          setProgressBar,
          setError,
          urls,
          setUrls,
          urlArr
        );
      }
    }
    setImages([...imageArr]);
    setTask({ ...task, images: urlArr.urls });
  };
  return (
    <div className="upload-images">
      <input type="file" multiple onChange={handleChange} />
      <div className="error">{error}</div>
      <div className="name-list">
        {images.length !== 0 &&
          images.map((image, index) => (
            <span key={index} className="image-name">
              {image.name}
            </span>
          ))}
      </div>
      {images.length === 0 && parseInt(progressBar) === 100 && (
        <div style={{ color: "#21ba45" }}>Finished</div>
      )}
      {images.length !== 0 && (
        <div>
          {urls.length}/{images.length}
        </div>
      )}
      {images.length !== 0 && (
        <ProgressBar
          progressBar={progressBar}
          urls={urls}
          setImages={setImages}
          images={images}
        />
      )}
    </div>
  );
};

export default ImageUploader;
