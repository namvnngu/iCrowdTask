import React from "react";

const SaveImage = ({ onSave }) => {
  return (
    <>
      <div className="btn save-image" onClick={onSave}>
        Save Image{" "}
      </div>
      <span
        style={{
          color: "red",
          transform: "translateY(5px)",
          display: "inline-block",
        }}
      >
        (Don't forget to save image)
      </span>
    </>
  );
};

export default SaveImage;
