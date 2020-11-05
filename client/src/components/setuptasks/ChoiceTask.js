import React from "react";

const tags = [
  {
    value: "technology",
    label: "Technology",
  },
  {
    value: "economics",
    label: "Economics",
  },
  {
    value: "art",
    label: "Art",
  },
  {
    value: "finance",
    label: "Finance",
  },
  {
    value: "science",
    label: "Science",
  },
  {
    value: "math",
    label: "Math",
  },
  {
    value: "artificial intelligence",
    label: "Artificial Intelligence",
  },
];
const ChoiceTask = ({ task, setTask }) => {
  const handleChange = (e) => {
    let choiceInput = document.querySelectorAll(
      ".requesters .choice-task #choiceTask"
    );
    let chosen = [];
    for (let i = 0; i < choiceInput.length; i++) {
      if (choiceInput[i].checked) {
        chosen.push(choiceInput[i].value);
      }
    }
    setTask({ ...task, choiceTask: chosen });
  };
  return (
    <div className="grouped fields choice-task">
      <div className="field">
        <label forhtml="tags" style={{ fontWeight: "450" }}>
          Give your task all relavant tags
        </label>
      </div>
      {tags.map((tag, index) => {
        return (
          <div className="field" key={index}>
            <div className="ui checkbox">
              <input
                id="choiceTask"
                type="checkbox"
                value={tag.value}
                name={tag.value}
                onChange={handleChange}
              />
              <label>{tag.label}</label>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChoiceTask;
