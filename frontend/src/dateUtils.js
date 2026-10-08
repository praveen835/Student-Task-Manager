export function isOverdue(task) {
  if (task.completed) return false;
  const today = new Date();
  const due = new Date(`${task.due_date}T00:00:00`);
  today.setHours(0, 0, 0, 0);
  return due < today;
}

export function formatDueDate(value) {
  return new Date(`${value}T00:00:00`).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
