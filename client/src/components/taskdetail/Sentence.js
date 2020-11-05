import React from "react";
const questions = [
  "What would you like to note down for us?",
  "Could you please tell more about your interst?",
];
const Sentence = ({ task }) => {
  return (
    <>
      {task.sentenceTask.map((sentence, index) => {
        return (
          <div key={index} className="ui message" style={{ marginLeft: "5px" }}>
            <div className="header">{questions[index]}</div>
            <p>{sentence}</p>
          </div>
        );
      })}
    </>
  );
};
export default Sentence;
