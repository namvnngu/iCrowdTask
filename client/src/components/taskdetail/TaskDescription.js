import React from "react";

const TaskDescription = ({ title, desc, expire }) => {
  return (
    <div className="ui floating message warning">
      <div className="header">Task Description</div>
      <div className="ui message">
        <div className="header">Title</div>
        <p>{title}</p>
      </div>
      <div className="ui message">
        <div className="header">Description</div>
        <p>{desc}</p>
      </div>
      <div className="ui message">
        <div className="header">Expire Date</div>
        <p>{expire}</p>
      </div>
    </div>
  );
};

export default TaskDescription;
