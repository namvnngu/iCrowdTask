import React from "react";

const Image = ({ task }) => {
  return (
    <div className="ui small images" style={{ paddingTop: "10px" }}>
      {task.images.map((image, index) => {
        return (
          <img
            key={index}
            src={image}
            className="ui small image"
            alt="Unloaded"
          />
        );
      })}
    </div>
  );
};
export default Image;
