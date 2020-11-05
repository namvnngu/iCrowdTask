import React, { useState } from "react";

const options = [
  {
    label: "Choice Task",
    value: "choice",
  },
  {
    label: "Decision-Making Task",
    value: "decision",
  },
  {
    label: "Sentence-Level Task",
    value: "sentence",
  },
  {
    label: "Image-processing Task",
    value: "image",
  },
];
const TaskType = ({ task, setTask }) => {
  const [currentOption, setCurrentOption] = useState("choice");
  const handleChange = (e) => {
    setCurrentOption(e.target.value);
    setTask({ ...task, taskType: e.target.value });
  };
  return (
    <div className="grouped fields types">
      <div className="ui medium header">Task Type</div>
      {options.map((option, index) => {
        return (
          <div className="field" key={index}>
            <div className="ui radio checkbox">
              <input
                type="radio"
                name={option.value}
                value={option.value}
                onChange={handleChange}
                checked={currentOption === option.value}
              />
              <label>{option.label}</label>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TaskType;
