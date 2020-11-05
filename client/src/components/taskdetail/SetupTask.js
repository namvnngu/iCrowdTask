import React from "react";
import Choice from "./Choice";
import Decision from "./Decision";
import Sentence from "./Sentence";
import Image from "./Image";

const SetupTask = ({ task }) => {
  const setUpComponent = () => {
    switch (task.taskType) {
      case "choice":
        return <Choice task={task} />;
      case "decision":
        return <Decision task={task} />;
      case "sentence":
        return <Sentence task={task} />;
      case "image":
        return <Image task={task} />;
      default:
        return <h5>There is something wrong</h5>;
    }
  };
  return (
    <div className="ui message warning">
      <div className="header">Task Specification</div>
      {setUpComponent()}
    </div>
  );
};

export default SetupTask;
