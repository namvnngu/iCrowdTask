import React from "react";
import ChoiceTask from "../setuptasks/ChoiceTask";
import DecisionTask from "../setuptasks/DecisionTask";
import SentenceTask from "../setuptasks/SentenceTask";
import ImageUploader from "../setuptasks/UploaderImage";

const SetUpTask = ({ task, setTask }) => {
  const setUpComponent = () => {
    switch (task.taskType) {
      case "choice":
        return <ChoiceTask task={task} setTask={setTask} />;
      case "decision":
        return <DecisionTask task={task} setTask={setTask} />;
      case "sentence":
        return <SentenceTask task={task} setTask={setTask} />;
      case "image":
        return <ImageUploader task={task} setTask={setTask} />;
      default:
        return <h5>Please choose task type first</h5>;
    }
  };

  return (
    <div style={{ marginTop: "30px" }} className="setup-task">
      <div className="ui medium header">Set up your task</div>
      {setUpComponent()}
    </div>
  );
};

export default SetUpTask;
