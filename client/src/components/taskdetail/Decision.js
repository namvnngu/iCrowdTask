import React from "react";

const Decision = ({ task }) => {
  return (
    <div className="ui message" style={{ marginLeft: "5px" }}>
      <div className="header">
        Do you want to have review meeting once a week?
      </div>
      <p>{task.desicionTask === "true" ? "Yes" : "No"}</p>
    </div>
  );
};
export default Decision;
