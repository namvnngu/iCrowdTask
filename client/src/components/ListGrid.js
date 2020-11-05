import React from "react";
import TaskItem from "./TaskItem";
import Loader from "./Loader";

const ListGrid = ({ loading, setTasks, tasks }) => {
  return (
    <>
      {loading ? (
        <div style={{ position: "absolute", left: "-10px", top: "-10px" }}>
          <Loader />
        </div>
      ) : (
        tasks && (
          <div className="list-grid-container">
            {tasks.map((task) => (
              <TaskItem
                tasks={tasks}
                setTasks={setTasks}
                key={task._id}
                id={task._id}
                expire={task.taskExpire}
                title={task.taskTitle}
                name={task.taskType}
                description={task.taskDescription.slice(0, 50)}
              />
            ))}
          </div>
        )
      )}
    </>
  );
};

export default ListGrid;
