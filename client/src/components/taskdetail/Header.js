import React from "react";

const HeaderTask = ({ title }) => {
  return (
    <h2
      className="ui header"
      style={{ textAlign: "center", color: "#444", textTransform: "uppercase" }}
    >
      <div className="content">Task: {title}</div>
    </h2>
  );
};

export default HeaderTask;
