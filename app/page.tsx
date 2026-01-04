"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getTodos } from "../services/todoService";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      loadTodos();
    }

    const handleLogin = () => {
      loadTodos();
    };

    window.addEventListener("loginSuccess", handleLogin);

    return () => {
      window.removeEventListener("loginSuccess", handleLogin);
    };
  }, []);

  const loadTodos = async () => {
    const data = await getTodos();
    setTodos(data);
    setSelectedTodo(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-end mb-4">
          <button
            onClick={async () => {
              const token = localStorage.getItem("token");
              if (token) {
                await fetch("http://127.0.0.1:8000/api/logout", {
                  method: "POST",
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                });
              }

              localStorage.removeItem("token"); 
              router.push("/login");           
            }}
            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded"
          >
            Logout
          </button>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          📝 Todo List
        </h1>

        <TodoForm selectedTodo={selectedTodo} refresh={loadTodos} />

        <div className="mt-6">
          <TodoList todos={todos} onEdit={setSelectedTodo} refresh={loadTodos} />
        </div>
      </div>
    </div>
  );
}
