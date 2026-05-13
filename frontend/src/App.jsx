import { useState } from "react";
import { useItems } from "./hooks/useItems";
import "./App.css";

function App() {
  const { items, loading, error, createItem, deleteItem, updateItem } = useItems();
  const [form, setForm] = useState({ title: "", description: "" });
  const [submitting, setSubmitting] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [flash, setFlash] = useState(null);

  const showFlash = (msg, type = "success") => {
    setFlash({ msg, type });
    setTimeout(() => setFlash(null), 2500);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    setSubmitting(true);
    try {
      await createItem(form);
      setForm({ title: "", description: "" });
      showFlash("Item created ✓");
    } catch {
      showFlash("Failed to create item", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteItem(id);
      showFlash("Item deleted");
    } catch {
      showFlash("Failed to delete", "error");
    }
  };

  const startEdit = (item) => {
    setEditId(item._id);
    setEditForm({ title: item.title, description: item.description, status: item.status });
  };

  const handleUpdate = async (id) => {
    try {
      await updateItem(id, editForm);
      setEditId(null);
      showFlash("Item updated ✓");
    } catch {
      showFlash("Failed to update", "error");
    }
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <div className="logo">
            <span className="logo-icon">⬡</span>
            <span className="logo-text">DockerOps</span>
          </div>
          <div className="header-meta">
            <span className="badge">{items.length} items</span>
            <span className="stack-tag">React · Express · MongoDB</span>
          </div>
        </div>
      </header>

      {flash && (
        <div className={`flash flash--${flash.type}`}>{flash.msg}</div>
      )}

      <main className="main">
        <div className="grid">
          <section className="panel panel--form">
            <h2 className="panel-title">New Item</h2>
            <form onSubmit={handleCreate} className="form">
              <div className="field">
                <label className="label">Title</label>
                <input
                  className="input"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Enter title..."
                  required
                />
              </div>
              <div className="field">
                <label className="label">Description</label>
                <textarea
                  className="input input--textarea"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Optional description..."
                  rows={3}
                />
              </div>
              <button className="btn btn--primary" type="submit" disabled={submitting}>
                {submitting ? "Creating..." : "Create Item"}
              </button>
            </form>
          </section>

          <section className="panel panel--list">
            <h2 className="panel-title">Items</h2>
            {loading && <div className="state-msg">Loading...</div>}
            {error && <div className="state-msg state-msg--error">Error: {error}</div>}
            {!loading && !error && items.length === 0 && (
              <div className="state-msg">No items yet. Create your first one!</div>
            )}
            <ul className="item-list">
              {items.map((item) => (
                <li key={item._id} className="item-card">
                  {editId === item._id ? (
                    <div className="edit-form">
                      <input
                        className="input"
                        value={editForm.title}
                        onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                      />
                      <textarea
                        className="input input--textarea"
                        value={editForm.description}
                        onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                        rows={2}
                      />
                      <select
                        className="input"
                        value={editForm.status}
                        onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                      <div className="edit-actions">
                        <button className="btn btn--sm btn--primary" onClick={() => handleUpdate(item._id)}>Save</button>
                        <button className="btn btn--sm btn--ghost" onClick={() => setEditId(null)}>Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="item-top">
                        <span className="item-title">{item.title}</span>
                        <span className={`status-dot ${item.status === "active" ? "status-dot--active" : ""}`}>
                          {item.status}
                        </span>
                      </div>
                      {item.description && (
                        <p className="item-desc">{item.description}</p>
                      )}
                      <div className="item-footer">
                        <span className="item-date">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </span>
                        <div className="item-actions">
                          <button className="btn btn--sm btn--ghost" onClick={() => startEdit(item)}>Edit</button>
                          <button className="btn btn--sm btn--danger" onClick={() => handleDelete(item._id)}>Delete</button>
                        </div>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
