import React, { useState } from "react";
import { Container } from "semantic-ui-react";
import MenuTask from "../components/MenuTask";
import ModalNote from "../components/Modal";
import DescriptionTask from "../components/requesters/Description";
import Requirement from "../components/requesters/Requirement";
import SetUpTask from "../components/requesters/SetUpTask";
import TaskType from "../components/requesters/Type";
import axios from "axios";
import { URL } from "../utils/constant";
import { Redirect } from "react-router-dom";

const Requester = () => {
  const [task, setTask] = useState({
    taskType: "choice",
    taskTitle: "",
    taskDescription: "",
    taskExpire: "",
    choiceTask: [],
    decisionTask: "true",
    sentenceTask: [],
    images: [],
    masterWorkers: "yes",
    reward: "",
    nWorkers: "",
  });
  const [error, setError] = useState(null);
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { success, message } = validator(task, setTask);
    if (!success) {
      setError(message);
    } else {
      const { data } = await axios.post(`${URL}/api/task`, { ...task });
      if (data.status === "success") {
        setRedirect(true);
      } else {
        setError(
          "Please fill your request again. If you cannot submit your request, please contact us"
        );
      }
    }
  };
  if (redirect) {
    return <Redirect to={`/workers`} />;
  }
  return (
    <form
      className="requesters ui medium form"
      style={{ marginBottom: "100px" }}
      onSubmit={handleSubmit}
    >
      <MenuTask />
      <Container>
        {error && <ModalNote error={error} setError={setError} />}
        <TaskType setTask={setTask} task={task} />
        <DescriptionTask task={task} setTask={setTask} />
        <SetUpTask task={task} setTask={setTask} />
        <Requirement task={task} setTask={setTask} />
        <div className="button-save-container">
          <button className="ui button yellow">Save</button>
        </div>
      </Container>
    </form>
  );
};

const validator = (task, setTask) => {
  if (task.taskType === "") {
    return { success: false, message: "Please select task type" };
  }
  if (task.taskTitle === "") {
    setTask({ ...task, taskTitle: "" });
    return { success: false, message: "Please provide task title" };
  }
  if (task.taskDescription === "") {
    setTask({ ...task, taskDescription: "" });
    return { success: false, message: "Please provide task description" };
  }
  if (task.taskExpire === "") {
    setTask({ ...task, taskExpire: "" });
    return { success: false, message: "Please provide task expiration" };
  }
  if (task.taskType === "choice" && task.choiceTask.length === 0) {
    return {
      success: false,
      message: "Please select task tags 'Set up your task'",
    };
  }
  if (task.taskType === "decision" && task.decisionTask === "") {
    return {
      success: false,
      message: "Please select yes/no in 'Set up your task'",
    };
  }
  if (task.taskType === "sentence" && task.sentenceTask.length !== 2) {
    return {
      success: false,
      message: "Please answer questions in 'Set up your task'",
    };
  }
  if (task.taskType === "image" && task.images.length === 0) {
    return {
      success: false,
      message: "Please upload images in 'Set up your task'",
    };
  }
  if (task.masterWorkers === "") {
    return {
      success: false,
      message: "Please select master option 'Worker Requirement'",
    };
  }
  if (task.reward === "") {
    setTask({ ...task, reward: "" });
    return {
      success: false,
      message: "Please provide reward 'Worker Requirement'",
    };
  }
  if (task.nWorkers === "") {
    setTask({ ...task, nWorkers: "" });
    return {
      success: false,
      message: "Please provide number of workers 'Worker Requirement'",
    };
  }
  return { success: true, message: "" };
};

export default Requester;
