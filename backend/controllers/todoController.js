import db from "../config/db.js";
//Create Todo
export const createTodo = async (req, res) => {
    try {
        const { username, todo } = req.body;
        await db.execute(
            "INSERT INTO Todo (username, todo) VALUES (?, ?)",
            [username, todo]
        );

        res.status(200).json({ message: "Todo created successfully" });
    } catch (error) {
        console.log("ERROR:", error);
        res.status(500).json({ error: error.message });
    }
};


//Read Todo
export const readTodo = async (req, res) => {
    try {
        const [rows] = await db.execute(`select * from Todo`)
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//Update Todo
export const updateTodo = async (req, res) => {
    const { username, todo } = req.body;
    const { id } = req.params;

    if (username) {
        try {
            await db.execute(
                "update Todo set username=? where id=?", [username, id]
            );
        } catch (error) {
            console.error(error);
        }
    }
    if (todo) {
        try {
            await db.execute(
                "update Todo set todo=? where id=?", [todo, id]
            );
        } catch (error) {
            console.error(error);
        }
    }
    res.send(`Todo for given id=${id} has been updated`);
};

//Delete Todo
export const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        await db.execute("DELETE from Todo where id = ?", [id]);

        res.status(200).json({ message: `Todo of given id=${id} has been deleted succesfully` });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};