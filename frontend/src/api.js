const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

async function getResponseData(response) {
  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.detail || `Request failed (${response.status}).`);
  }
  return response.status === 204 ? null : response.json();
}

async function request(path, options) {
  const response = await fetch(`${API_URL}${path}`, options);
  return getResponseData(response);
}

export function listTasks() {
  return request("/tasks");
}

export function createTask(task) {
  return request("/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
}

export function updateTask(task) {
  return request(`/tasks/${task.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
}

export function removeTask(id) {
  return request(`/tasks/${id}`, { method: "DELETE" });
}
