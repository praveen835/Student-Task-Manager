import { useState } from "react";

function AddTask({ addTask, isMutating }) {

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    const created = await addTask({
      title: title.trim(),
      subject: subject.trim(),
      due_date: dueDate,
    });
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
      <form onSubmit={handleSubmit}>
        <label className="field">
          <span>Task</span>
          <input
            type="text"
            placeholder="e.g. Finish biology notes"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            maxLength={160}
            required
          />
        </label>
        <label className="field">
          <span>Subject</span>
          <input
            type="text"
            placeholder="e.g. Biology"
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
            maxLength={100}
            required
          />
        </label>
        <label className="field">
          <span>Due date</span>
          <input
            type="date"
            value={dueDate}
            onChange={(event) => setDueDate(event.target.value)}
            required
          />
        </label>
        <button className="add-button" type="submit" disabled={isSubmitting || isMutating}>
          <span aria-hidden="true">+</span>
          {isSubmitting ? "Adding..." : "Add task"}
        </button>
      </form>
    </div>
  );
}

export default AddTask;