export default async function filterByDate(tasks) {
  tasks.sort((a, b) => new Date(a.taskExpire) - new Date(b.taskExpire));
  return tasks;
}
