function TaskCard({
  task,
  disabled,
  updateTask,
  deleteTask,
}) {
  return (
    <div
      className={
        task.completed
          ? "task-card completed"
          : "task-card"
      }
    >

      <div className="task-details">
        <span className={task.completed ? "status-dot done" : "status-dot"} aria-hidden="true" />
        <div>
          <h3>{task.title}</h3>
          <p className="task-meta">
            <span>{task.subject}</span>
            <span aria-hidden="true">/</span>
            <time dateTime={task.due_date}>
              Due {new Date(`${task.due_date}T00:00:00`).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </time>
          </p>
        </div>
      </div>
      <div className="task-buttons">
        <button
          className="complete-btn"
          type="button"
          disabled={disabled}
          onClick={() => updateTask(task)}
        >
          {task.completed ? "Reopen" : "Complete"}
        </button>
        <button
          className="delete-btn"
          type="button"
          disabled={disabled}
          aria-label={`Delete ${task.title}`}
          onClick={() => deleteTask(task.id)}
        >
          <span aria-hidden="true">x</span>
        </button>
      </div>
    </div>
  );
}

export default TaskCard;