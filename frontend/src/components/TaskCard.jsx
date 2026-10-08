import { formatDueDate, isOverdue } from "../dateUtils";

function TaskCard({ task, disabled, updateTask, deleteTask }) {
  const handleDelete = () => {
    if (window.confirm(`Delete “${task.title}”? This cannot be undone.`)) {
      deleteTask(task.id);
    }
  };

  const overdue = isOverdue(task);
  return (
    <article className={`${task.completed ? "task-card completed" : "task-card"}${overdue ? " overdue" : ""}`}>
      <div className="task-details">
        <span className={task.completed ? "status-dot done" : "status-dot"} aria-hidden="true" />
        <div>
          <h3>{task.title}</h3>
          <p className="task-meta">
            <span>{task.subject}</span><span aria-hidden="true">/</span>
            <time dateTime={task.due_date}>{overdue ? "Overdue" : "Due"} {formatDueDate(task.due_date)}</time>
          </p>
        </div>
      </div>
      <div className="task-buttons">
        <button className="complete-btn" type="button" disabled={disabled} onClick={() => updateTask(task)}>
          {task.completed ? "Reopen task" : "Complete task"}
        </button>
        <button className="delete-btn" type="button" disabled={disabled} aria-label={`Delete ${task.title}`} onClick={handleDelete}>
          <span aria-hidden="true">×</span>
        </button>
      </div>
    </article>
  );
}

export default TaskCard;
