import React, { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { Container } from "semantic-ui-react";
import HeaderTask from "../components/taskdetail/Header";
import SetupTask from "../components/taskdetail/SetupTask";
import TaskDescription from "../components/taskdetail/TaskDescription";
import TaskRequirement from "../components/taskdetail/TaskRequirement";
import TaskType from "../components/taskdetail/TaskType";
import axios from "axios";
import { URL } from "../utils/constant";
import capitalizeFirstLetter from "../utils/capitalizedFirstLetter";
const taskTypes = {
  choice: "Choice Task",
  decision: "Decision-Making Task",
  sentence: "Sentence-Level Task",
  image: "Image-processing Task",
};
const TaskDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [task, setTask] = useState(null);
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  useEffect(() => {
    const fetchData = async (id) => {
      const { data } = await axios.get(`${URL}/api/task/${id}`);
      return data;
    };
    fetchData(id).then((data) => {
      if (data.task !== null) {
        setTask(data.task);
      } else {
        setRedirect(true);
      }
    });
    return () => {
      setTask(null);
    };
  }, [id]);
  if (redirect) {
    return <Redirect to="/workers" />;
  }
  return (
    <>
      {loading ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : (
        <Container className="task-detail-container" style={{ margin: "50px" }}>
          <Container>
            <div>
              <a href="/workers">Back To Workers</a>
            </div>
            <HeaderTask className="task-header" title={task.taskTitle} />
            <TaskType type={taskTypes[task.taskType]} />
            <TaskDescription
              title={task.taskTitle}
              desc={task.taskDescription}
              expire={task.taskExpire}
            />
            <SetupTask task={task} />
            <TaskRequirement
              master={capitalizeFirstLetter(task.masterWorkers)}
              reward={task.reward}
              workers={task.nWorkers}
            />
          </Container>
        </Container>
      )}
    </>
  );
};

export default TaskDetail;
