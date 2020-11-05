import React from "react";

const TaskType = ({ type }) => {
  return (
    <div className="ui message warning">
      <div className="header">Task Type</div>
      <p>{type}</p>
    </div>
  );
};

export default TaskType;
