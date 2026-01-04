const API_URL = "http://localhost:8000/api/todos";
const token = localStorage.getItem("token");

export const getTodos = async () => {
  const res = await fetch(API_URL, {
    headers:{
        Authorization: `Bearer ${token}`,
    }
  });
  return res.json();
};

export const createTodo = async (formData : FormData)=>{
    return fetch(API_URL, {
        method: "POST",
        body: formData,
        headers:{
            Authorization: `Bearer ${token}`,
        }
    });
};

export const updateTodo = async (id:number, formData: FormData)=>{
    return fetch(`${API_URL}/${id}`, {
        method: "POST",
        body: formData,
        headers: {
            "X-HTTP-Method-Override": "PUT",
            Authorization: `Bearer ${token}`,
        },
    });
};

export const deleteTodo = async(id: number)=>{
    return fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers:{
            Authorization: `Bearer ${token}`,
        }
    });
};