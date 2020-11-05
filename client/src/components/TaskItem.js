import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { URL } from "../utils/constant";

const TaskItem = ({
  id,
  name,
  title,
  expire,
  description,
  setTasks,
  tasks,
}) => {
  const [redirct, setRedirect] = useState(false);
  const [expand, setExpand] = useState(false);
  if (redirct) {
    return <Redirect to={`/task/${id}`} />;
  }
  return (
    <>
      {expand && (
        <div
          style={{ position: "absolute", height: "100vh", width: "100vw" }}
          onClick={() => setExpand(!expand)}
        ></div>
      )}
      <div className="taskitem-container">
        <div className="taskitem">
          <div className="down-icon" onClick={() => setExpand(!expand)}>
            <ExpandIcon />
          </div>
          {expand && (
            <ExpandDelete
              tasks={tasks}
              setTasks={setTasks}
              id={id}
              setExpand={setExpand}
              expand={expand}
            />
          )}
          <div className="info" onClick={() => setRedirect(true)}>
            <span className="name">Task title: {title}</span>
            <span className="desc">Task type: {name}</span>
            <span className="desc">Expire date: {expire}</span>
            <span className="desc">Description: {description}...</span>
          </div>
        </div>
      </div>
    </>
  );
};

const ExpandIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
      />
    </svg>
  );
};
const ExpandDelete = ({ tasks, setTasks, setExpand, expand, id }) => {
  const hanldeClick = async () => {
    const { data } = await axios.delete(`${URL}/api/task/${id}`);
    if (data.status === "success") {
      setExpand(!expand);
      setTasks(tasks.filter((task) => task._id !== id));
    }
  };
  return (
    <ul className="expand-delete" onClick={hanldeClick}>
      <li>Delete</li>
    </ul>
  );
};

export default TaskItem;
