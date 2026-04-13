"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    Container,
    Card,
    Header,
    Title,
    LeftSection,
    RightSection,
    CreateButton,
    LogoutButton,
    Form,
    TodoList,
    TodoItem,
} from "../../styles/todo.styles";

import api from "@/api/api";
import { clearAccessToken, setAccessToken } from "@/api/tokenService";

const TodosClient = () => {
    const router = useRouter();

    const [showForm, setShowForm] = useState(false);
    const [todos, setTodos] = useState([]);
    const [editId, setEditId] = useState(null);
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        todo: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const getTodos = async () => {
        try {
            const res = await api.get("/todo");
            setTodos(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.todo.trim()) return;

        try {
            if (editId) {
                await api.patch(`/todo/${editId}`, formData);
            } else {
                await api.post("/todo/create", formData);
            }

            resetForm();
            getTodos();
        } catch (err) {
            console.error(err);
        }
    };


    const deleteTodo = async (id) => {
        try {
            await api.delete(`/todo/${id}`);
            getTodos();
        } catch (err) {
            console.error(err);
        }
    };


    const handleLogout = async () => {
        try {
            await api.post("/auth/logout");
            clearAccessToken();
            router.push("/login");
        } catch (err) {
            console.error(err);
        }
    };

    const resetForm = () => {
        setFormData({ todo: "" });
        setEditId(null);
        setShowForm(false);
    };


    const handleEdit = (todo) => {
        setEditId(todo.id);
        setFormData({ todo: todo.todo });
        setShowForm(true);
    };


    useEffect(() => {
        const init = async () => {
            try {
                const res = await api.post("/auth/refresh-token");
                setAccessToken(res.data.accessToken);
                await getTodos();
            } catch (err) {
                router.push("/login");
            }
        };

        init();
    }, []);

    return (
        <Container>
            <Card>


                <Header>
                    <LeftSection>
                        {!showForm && (
                            <CreateButton onClick={() => setShowForm(true)}>
                                + Create Todo
                            </CreateButton>
                        )}
                    </LeftSection>

                    <Title>Todos Dashboard</Title>

                    <RightSection>
                        <LogoutButton onClick={handleLogout}>
                            Logout
                        </LogoutButton>
                    </RightSection>
                </Header>


                {showForm && (
                    <Form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="todo"
                            placeholder="Enter your task..."
                            value={formData.todo}
                            onChange={handleChange}
                        />

                        <div style={{ display: "flex", gap: "10px" }}>
                            <button type="submit">
                                {editId ? "Update" : "Create"}
                            </button>

                            <button
                                type="button"
                                onClick={resetForm}
                                style={{ background: "#ccc", color: "#333" }}
                            >
                                Cancel
                            </button>
                        </div>
                    </Form>
                )}


                <TodoList>

                    {/* Empty State */}
                    {!loading && todos.length === 0 && (
                        <p style={{ textAlign: "center", color: "#888" }}>
                            No todos yet. Create one
                        </p>
                    )}

                    {/* Loading State */}
                    {loading && (
                        <p style={{ textAlign: "center" }}>Loading...</p>
                    )}

                    {!showForm &&
                        todos.map((item) => (
                            <TodoItem key={item.id}>
                                <span>{item.todo}</span>

                                <div>
                                    <button onClick={() => deleteTodo(item.id)}>
                                        Delete
                                    </button>

                                    <button onClick={() => handleEdit(item)}>
                                        Edit
                                    </button>
                                </div>
                            </TodoItem>
                        ))}
                </TodoList>
            </Card>
        </Container>
    );
};

export default TodosClient;