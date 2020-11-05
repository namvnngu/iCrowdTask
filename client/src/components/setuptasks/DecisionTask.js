import React, { useState } from "react";

const DecisionTask = ({ task, setTask }) => {
  return (
    <>
      <Question
        task={task}
        setTask={setTask}
        question={"Do you want to have review meeting once a week?"}
      />
    </>
  );
};

const Question = ({ question, setTask, task }) => {
  const [currentOption, setCurrentOption] = useState("true");
  const handleChange = (e) => {
    setCurrentOption(e.target.value);
    setTask({ ...task, decisionTask: e.target.value });
  };
  return (
    <div
      className="groups field fields decision-task"
      style={{ marginLeft: "5px" }}
    >
      <label>{question}</label>
      <div className="inline field fields">
        <div className="field">
          <div className="ui radio checkbox">
            <input
              type="radio"
              name="true"
              value={"true"}
              checked={currentOption === "true"}
              onChange={handleChange}
            />
            <label>Yes</label>
          </div>
        </div>
        <div className="field">
          <div className="ui radio checkbox">
            <input
              type="radio"
              name="false"
              value={"false"}
              checked={currentOption === "false"}
              onChange={handleChange}
            />
            <label>No</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DecisionTask;
