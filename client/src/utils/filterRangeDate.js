import { URL } from "./constant";
import axios from "axios";

export default async function filterRangeDate(from, to) {
  let fromTime = new Date(from);
  let toTime = new Date(to);
  const { data } = await axios.get(`${URL}/api/task`);
  if (data && data.status === "success") {
    const tasks = data.tasks;
    return tasks.filter((task) => {
      let taskTime = new Date(task.taskExpire);
      return fromTime <= taskTime && taskTime <= toTime;
    });
  }
  return [];
}
