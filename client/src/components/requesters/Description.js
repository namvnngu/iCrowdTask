import React from "react";

const DescriptionTask = ({ task, setTask }) => {
  return (
    <div style={{ marginTop: "30px" }} className="description-container">
      <div className="ui medium header">Task Description</div>
      <Title setTask={setTask} task={task} />
      <Description setTask={setTask} task={task} />
      <ExpireDate setTask={setTask} task={task} />
    </div>
  );
};

const Title = ({ task, setTask }) => {
  return (
    <div className="field title">
      <label>Title</label>
      <input
        type="text"
        name="title"
        value={task.taskTitle}
        onChange={(e) => setTask({ ...task, taskTitle: e.target.value })}
      />
    </div>
  );
};

const Description = ({ task, setTask }) => {
  return (
    <div className="field description">
      <label>Description</label>
      <textarea
        rows="3"
        value={task.taskDescription}
        onChange={(e) => setTask({ ...task, taskDescription: e.target.value })}
      ></textarea>
    </div>
  );
};

const ExpireDate = ({ task, setTask }) => {
  return (
    <div className="field expire">
      <label>Expire Date</label>
      <input
        type="date"
        name="expire"
        value={task.taskExpire}
        onChange={(e) => setTask({ ...task, taskExpire: e.target.value })}
      />
    </div>
  );
};

export default DescriptionTask;
