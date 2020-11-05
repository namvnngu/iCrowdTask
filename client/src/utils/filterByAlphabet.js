export default async function filterByAlphabet(tasks) {
  tasks.sort((a, b) => a.taskTitle.localeCompare(b.taskTitle));
  return tasks;
}
