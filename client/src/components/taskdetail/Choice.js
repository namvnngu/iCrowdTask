import React from "react";
import capitalizeFirstLetter from "../../utils/capitalizedFirstLetter";

const Choice = ({ task }) => {
  return (
    <div>
      {task.choiceTask.map((choice, index) => {
        return (
          <div
            key={index}
            className="ui tag label"
            style={{ marginTop: "10px" }}
          >
            {capitalizeFirstLetter(choice)}
          </div>
        );
      })}
    </div>
  );
};
export default Choice;
