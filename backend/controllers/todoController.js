import db from "../config/db.js";

//CREATE TODO
export const createTodo = async (req, res) => {
    const { todo } = req.body;
    const userId = req.user.id;

    if (!todo) {
        return res.status(400).json({ message: "Todo is required" });
    }

    try {
        await db.execute(
            "INSERT INTO todos (user_id, todo) VALUES (?, ?)",
            [userId, todo]
        );

        res.status(201).json({ message: "Todo created successfully" });
    } catch (error) {
        console.error("CREATE ERROR:", error);
        res.status(500).json({ error: error.message });
    }
};


//READ TODOS 
export const readTodo = async (req, res) => {
    const userId = req.user.id;

    try {
        const [rows] = await db.execute(
            "SELECT * FROM todos WHERE user_id = ?",
            [userId]
        );

        res.status(200).json(rows);
    } catch (err) {
        console.error("READ ERROR:", err);
        res.status(500).json({ error: err.message });
    }
};


//UPDATE TODO 
export const updateTodo = async (req, res) => {
    const { id } = req.params;
    const { todo } = req.body;
    const userId = req.user.id;

    if (!todo) {
        return res.status(400).json({ message: "Todo is required" });
    }

    try {
        const [result] = await db.execute(
            "UPDATE todos SET todo = ? WHERE id = ? AND user_id = ?",
            [todo, id, userId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Todo not found or unauthorized" });
        }

        res.status(200).json({ message: "Todo updated successfully" });
    } catch (error) {
        console.error("UPDATE ERROR:", error);
        res.status(500).json({ error: error.message });
    }
};


// DELETE TODO 
export const deleteTodo = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const [result] = await db.execute(
            "DELETE FROM todos WHERE id = ? AND user_id = ?",
            [id, userId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Todo not found or unauthorized" });
        }

        res.status(200).json({ message: "Todo deleted successfully" });
    } catch (err) {
        console.error("DELETE ERROR:", err);
        res.status(500).json({ error: err.message });
    }
};
