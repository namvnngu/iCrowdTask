import React from "react";

const TaskRequirement = ({ master, reward, workers }) => {
  return (
    <div className="ui floating message warning">
      <div className="header">Task Requirement</div>
      <div className="ui message">
        <div className="header">Require Master Workers</div>
        <p>{master}</p>
      </div>
      <div className="ui message">
        <div className="header">Reward per response</div>
        <p>$ {reward}</p>
      </div>
      <div className="ui message">
        <div className="header">Number of workers</div>
        <p>{workers}</p>
      </div>
    </div>
  );
};

export default TaskRequirement;
