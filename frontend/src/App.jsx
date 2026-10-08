import { useEffect, useMemo, useState } from "react";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";
import { createTask, listTasks, removeTask, updateTask as saveTask } from "./api";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMutating, setIsMutating] = useState(false);
  const [error, setError] = useState("");

  const getTasks = async () => {
    try {
      const data = await listTasks();
      if (!Array.isArray(data)) throw new Error("The server returned an unexpected task list.");
      setTasks(data);
      setError("");
      return true;
    } catch (loadError) {
      setError(loadError.message || "Could not load tasks. Check your connection and try again.");
      return false;
    }
  };

  useEffect(() => {
    let isActive = true;
    listTasks()
      .then((data) => {
        if (!Array.isArray(data)) throw new Error("The server returned an unexpected task list.");
        if (isActive) setTasks(data);
      })
      .catch((loadError) => {
        if (isActive) setError(loadError.message || "Could not load tasks. Check your connection and try again.");
      })
      .finally(() => {
        if (isActive) setIsLoading(false);
      });
    return () => { isActive = false; };
  }, []);

  const addTask = async (task) => {
    setIsMutating(true);
    setError("");
    try {
      await createTask(task);
      await getTasks();
      return true;
    } catch (mutationError) {
      setError(mutationError.message || "Could not add this task. Please try again.");
      return false;
    } finally {
      setIsMutating(false);
    }
  };

  const updateTask = async (task) => {
    setIsMutating(true);
    setError("");
    try {
      await saveTask({ ...task, completed: !task.completed });
      await getTasks();
    } catch (mutationError) {
      setError(mutationError.message || "Could not update this task. Please try again.");
    } finally {
      setIsMutating(false);
    }
  };

  const deleteTask = async (id) => {
    setIsMutating(true);
    setError("");
    try {
      await removeTask(id);
      await getTasks();
    } catch (mutationError) {
      setError(mutationError.message || "Could not delete this task. Please try again.");
    } finally {
      setIsMutating(false);
    }
  };

  const taskCounts = useMemo(() => {
    const completed = tasks.filter((task) => task.completed).length;
    return { completed, pending: tasks.length - completed };
  }, [tasks]);

  return (
    <div className="app">
      <div className="container">
        <header className="page-header">
          <div>
            <p className="eyebrow">STUDY DESK / TASK PLANNER</p>
            <h1>Student Task Manager</h1>
            <p className="welcome">A clear view of what needs your attention.</p>
          </div>
          <div className="date-note">
            <span className="date-note-mark" aria-hidden="true">+</span>
            <span>Make room for<br />your next win.</span>
          </div>
        </header>
        <section className="dashboard" aria-label="Task summary">
          <div className="stat-card stat-total"><span className="stat-label">ALL TASKS</span><p>{tasks.length}</p></div>
          <div className="stat-card stat-pending"><span className="stat-label">TO DO</span><p>{taskCounts.pending}</p></div>
          <div className="stat-card stat-completed"><span className="stat-label">COMPLETED</span><p>{taskCounts.completed}</p></div>
        </section>
        <AddTask addTask={addTask} isMutating={isMutating} />
        {error && <div className="error-banner" role="alert"><span>{error}</span><button type="button" onClick={getTasks} disabled={isLoading || isMutating}>Reload tasks</button></div>}
        <TaskList tasks={tasks} isLoading={isLoading} isMutating={isMutating} updateTask={updateTask} deleteTask={deleteTask} />
      </div>
    </div>
  );
}

export default App;
