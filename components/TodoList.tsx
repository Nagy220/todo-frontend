"use client";
import { deleteTodo } from "../services/todoService";

export default function TodoList({ todos, onEdit, refresh }) {
const priorityMap = {
    "0": { label: "High", color: "text-red-600" },
    "1": { label: "Medium", color: "text-yellow-600" },
    "2": { label: "Low", color: "text-green-600" },
  };
  if (!todos.length) {
    return (
      <p className="text-center text-gray-500">
        No todos yet.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className="border rounded-lg p-4 flex justify-between items-start hover:shadow transition"
        >
          <div>
            <h3 className="font-semibold text-gray-800">
              {todo.title}
            </h3>
            
            <span
            className={`inline-block mt-1 text-xs font-semibold ${
                priorityMap[todo.priority]?.color
            }`}
            >
            {priorityMap[todo.priority]?.label}
            </span>

            {todo.description && (
              <p className="text-gray-600 text-sm mt-1">
                {todo.description}
              </p>
            )}

            {todo.file_path && (
              <a
                href={`http://127.0.0.1:8000/storage/${todo.file_path}`}
                target="_blank"
                className="inline-block mt-2 text-sm text-blue-600 hover:underline"
              >
                📄 View PDF
              </a>
            )}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => onEdit(todo)}
              className="px-3 py-1 text-sm rounded bg-yellow-400 hover:bg-yellow-500 text-white"
            >
              Edit
            </button>

            <button
              onClick={async () => {
                await deleteTodo(todo.id);
                refresh();
              }}
              className="px-3 py-1 text-sm rounded bg-red-500 hover:bg-red-600 text-white"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
