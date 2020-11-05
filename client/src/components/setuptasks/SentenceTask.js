import React from "react";

const SentenceTask = ({ setTask, task }) => {
  const handleChange = (e) => {
    let textarea = document.querySelectorAll(".sentence-task #sentence-task");
    let textList = [];
    for (let i = 0; i < textarea.length; i++) {
      textList.push(textarea[i].value);
    }
    setTask({ ...task, sentenceTask: textList });
  };
  return (
    <div className="fields grouped sentence-task">
      <Question
        question={"What would you like to note down for us?"}
        handleChange={handleChange}
      />
      <Question
        question={"Could you please tell more about your interst?"}
        handleChange={handleChange}
      />
    </div>
  );
};
const Question = ({ question, handleChange }) => {
  return (
    <div className="field description">
      <label>{question}</label>
      <textarea id="sentence-task" rows="2" onChange={handleChange}></textarea>
    </div>
  );
};

export default SentenceTask;
