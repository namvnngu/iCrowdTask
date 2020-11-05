import { URL } from "./constant";
import axios from "axios";
export default async function searhByKeyWord(keyword) {
  let rgx = new RegExp(keyword, "gi");
  const { data } = await axios.get(`${URL}/api/task`);
  if (data && data.status === "success") {
    const tasks = data.tasks;
    return tasks.filter((task) => {
      return (
        rgx.test(task.taskType) ||
        rgx.test(task.taskTitle) ||
        rgx.test(task.taskDescription) ||
        rgx.test(task.sentenceTask) ||
        rgx.test(task.choiceTask)
      );
    });
  }
  return [];
}
