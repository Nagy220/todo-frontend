"use client";
import { useState, useEffect } from "react";
import { createTodo, updateTodo } from "../services/todoService";

export default function TodoForm({ selectedTodo, refresh }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [priority, setPriority] = useState("1"); 

  useEffect(() => {
    if (selectedTodo) {
      setTitle(selectedTodo.title);
      setDescription(selectedTodo.description || "");
      setPriority(selectedTodo.priority ?? "1");
    }
  }, [selectedTodo]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("priority", priority);
    if (file) formData.append("file", file);

    selectedTodo
      ? await updateTodo(selectedTodo.id, formData)
      : await createTodo(formData);

    refresh();
    setTitle("");
    setDescription("");
    setPriority("1");
    setFile(null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Todo title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="block w-full text-sm text-gray-500
                   file:mr-4 file:py-2 file:px-4
                   file:rounded-lg file:border-0
                   file:bg-blue-50 file:text-blue-700
                   hover:file:bg-blue-100"
      />
      
    <select
    value={priority}
    onChange={(e) => setPriority(e.target.value)}
    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
    <option value="0">High</option>
    <option value="1">Medium</option>
    <option value="2">Low</option>
    </select>

      <button
        type="submit"
        className={`w-full py-2 rounded-lg text-white font-semibold transition
          ${
            selectedTodo
              ? "bg-green-600 hover:bg-green-700"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
      >
        {selectedTodo ? "Update Todo" : "Add Todo"}
      </button>
    </form>
  );
}
