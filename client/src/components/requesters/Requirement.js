import React, { useState } from "react";

const options = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];
const Requirement = ({ task, setTask }) => {
  return (
    <div style={{ marginTop: "30px" }} className="requirement">
      <div className="ui medium header">Worker Requirement</div>
      <MasterWorkers task={task} setTask={setTask} />
      <Reward task={task} setTask={setTask} />
      <NumberWorkers task={task} setTask={setTask} />
    </div>
  );
};

const MasterWorkers = ({ task, setTask }) => {
  const [currentOption, setCurrentOption] = useState("yes");
  const handleChange = (e) => {
    setCurrentOption(e.target.value);
    setTask({ ...task, masterWorkers: e.target.value });
  };
  return (
    <div className="master inline fields">
      <label forhtml="master" style={{ fontWeight: "450" }}>
        Require Master Workers
      </label>
      {options.map((option, index) => {
        return (
          <div className="field" key={index}>
            <div className="ui radio checkbox">
              <input
                type="radio"
                name={option.value}
                value={option.value}
                checked={currentOption === option.value}
                onChange={handleChange}
              />
              <label>{option.label}</label>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const Reward = ({ task, setTask }) => {
  return (
    <div className="reward">
      <label
        forhtml="reward"
        style={{ fontWeight: "450", paddingRight: "10px" }}
      >
        Reward per response
      </label>
      <div className="ui right labeled input">
        <label forhtml="amount" className="ui label">
          $
        </label>
        <input
          type="number"
          placeholder="Amount"
          id="amount"
          min="0"
          style={{ width: "120px" }}
          onChange={(e) => setTask({ ...task, reward: e.target.value })}
        />
        <div className="ui basic label">.00</div>
      </div>
    </div>
  );
};
const NumberWorkers = ({ task, setTask }) => {
  return (
    <div className="number-workers" style={{ paddingTop: "20px" }}>
      <label
        forhtml="number-workers"
        style={{ fontWeight: "450", paddingRight: "22px" }}
      >
        Number of workers
      </label>
      <div className="ui right  input">
        <input
          type="number"
          min="0"
          id="number-workers"
          style={{ width: "150px" }}
          onChange={(e) => setTask({ ...task, nWorkers: e.target.value })}
        />
      </div>
    </div>
  );
};
export default Requirement;
