import React, { useEffect } from "react";

const ProgressBar = ({ progressBar, urls, setImages, images }) => {
  useEffect(() => {
    if (urls.length === images.length) {
      setImages([]);
    }
  }, [urls, setImages, images]);
  return (
    <div className="progress-bar ui tiny progress">
      <div className="bar" style={{ width: progressBar + "%" }}>
        <div className="progres" style={{ width: "100%" }}></div>
      </div>
    </div>
  );
};

export default ProgressBar;
