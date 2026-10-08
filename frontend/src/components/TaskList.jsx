import { useMemo, useState } from "react";
import TaskCard from "./TaskCard";

function TaskList({
  tasks,
  isLoading,
  isMutating,
  updateTask,
  deleteTask,
}) {
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const filters = useMemo(() => [
    { id: "all", label: "All", count: tasks.length },
    { id: "pending", label: "To do", count: tasks.filter((task) => !task.completed).length },
    { id: "completed", label: "Completed", count: tasks.filter((task) => task.completed).length },
  ], [tasks]);
  const visibleTasks = useMemo(() => tasks.filter((task) => {
    const matchesFilter = filter === "all"
      || (filter === "completed" ? task.completed : !task.completed);
    const searchText = `${task.title} ${task.subject}`.toLowerCase();
    return matchesFilter && searchText.includes(query.trim().toLowerCase());
  }), [filter, query, tasks]);
  return (
    <section className="task-list" aria-labelledby="task-list-title">
      <div className="list-heading">
        <div>
          <p className="eyebrow">YOUR WORKSPACE</p>
          <h2 id="task-list-title">My tasks <span className="task-count">{tasks.length}</span></h2>
        </div>
        <label className="search-field">
          <span className="sr-only">Search tasks</span>
          <span className="search-icon" aria-hidden="true">Search</span>
          <input
            type="search"
            placeholder="Search tasks"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          {query && <button className="clear-search" type="button" onClick={() => setQuery("")}>Clear</button>}
        </label>
      </div>

      <div className="task-filters" role="group" aria-label="Filter tasks">
        {filters.map((item) => (
          <button
            key={item.id}
            type="button"
            className={filter === item.id ? "filter-button active" : "filter-button"}
            aria-pressed={filter === item.id}
            onClick={() => setFilter(item.id)}
          >
            {item.label}<span>{item.count}</span>
          </button>
        ))}
      </div>

      {isLoading ? (
        <p className="empty-message" role="status">Loading your tasks...</p>
      ) : visibleTasks.length === 0 ? (
        <div className="empty-message" role="status" aria-live="polite">
          <p>{tasks.length === 0 ? "Nothing on your list yet." : query ? "No tasks match your search." : "No tasks in this view."}</p>
          {tasks.length === 0 && <span>Add a task above to get started.</span>}
        </div>
      ) : (
        <div className="task-items">
          {visibleTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            disabled={isMutating}
            updateTask={updateTask}
            deleteTask={deleteTask}
          />
          ))}
        </div>
      )}
    </section>
  );
}

export default TaskList;