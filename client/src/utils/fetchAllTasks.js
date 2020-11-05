import { URL } from "./constant";
import axios from "axios";

export default async function fetchAllTasks(cancelToken, setTasks, setLoading) {
  try {
    const { data } = await axios.get(`${URL}/api/task`, {
      cancelToken: cancelToken.token,
    });
    if (data && data.status === "success") {
      setTasks(data.tasks);
      setLoading(false);
    }
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log("Error");
    } else {
      throw error;
    }
  }
}
