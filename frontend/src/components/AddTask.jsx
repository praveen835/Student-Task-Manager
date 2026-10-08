import { useState } from "react";

function today() {
  return new Date().toISOString().slice(0, 10);
}

function AddTask({ addTask, isMutating }) {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const trimmedTitle = title.trim();
    const trimmedSubject = subject.trim();
    if (!trimmedTitle || !trimmedSubject) {
      setFormError("Enter a task and subject before adding it.");
      return;
    }
    if (!dueDate) {
      setFormError("Choose a due date for this task.");
      return;
    }
    setFormError("");
    setIsSubmitting(true);
    const created = await addTask({ title: trimmedTitle, subject: trimmedSubject, due_date: dueDate });
    if (created) {
      setTitle("");
      setSubject("");
      setDueDate("");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="task-form">
      <div className="section-heading">
        <p className="eyebrow">GET IT ON YOUR LIST</p>
        <h2>Add a task</h2>
      </div>
      <form onSubmit={handleSubmit} noValidate>
        <label className="field"><span>Task</span><input type="text" placeholder="e.g. Finish biology notes" value={title} onChange={(event) => setTitle(event.target.value)} maxLength={160} required /></label>
        <label className="field"><span>Subject</span><input type="text" placeholder="e.g. Biology" value={subject} onChange={(event) => setSubject(event.target.value)} maxLength={100} required /></label>
        <label className="field"><span>Due date</span><input type="date" min={today()} value={dueDate} onChange={(event) => setDueDate(event.target.value)} required /></label>
        <button className="add-button" type="submit" disabled={isSubmitting || isMutating}><span aria-hidden="true">+</span>{isSubmitting ? "Adding..." : "Add task"}</button>
      </form>
      {formError && <p className="form-error" role="alert">{formError}</p>}
    </div>
  );
}

export default AddTask;
