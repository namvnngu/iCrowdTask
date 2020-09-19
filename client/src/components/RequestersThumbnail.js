import React from "react";

const RequestersThumnail = ({ image, name, description }) => {
  return (
    <div className="thumbnail-container">
      <div className="thumbnail">
        <img src={image} alt="requester" />
        <div className="info">
          <span className="name">Requester's: {name}</span>
          <span className="desc">Description: {description}</span>
        </div>
      </div>
    </div>
  );
};

export default RequestersThumnail;
