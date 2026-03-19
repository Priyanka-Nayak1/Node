import express from 'express';
import mysql from 'mysql2/promise';
import dotenv from "dotenv";
const app = express();
const port = 8080;

app.use(express.json());
dotenv.config();

const db_password = process.env.DB_PASSWORD;
//Database connection
const db = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: db_password,
    database: "todo_app",
});


//Create Todo
app.post("/todo/create", async (req, res) => {
    try {
        const { username, todo } = req.body;
        await db.execute(
            "INSERT INTO Todo (username, todo) VALUES (?, ?)",
            [username, todo]
        );

        res.status(200).json({ message: "Todo created successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

});

//Read Todo
app.get("/todo", async (req, res) => {
    try {
        const [rows] = await db.execute(`select * from Todo`)
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

//Update Todo
app.patch("/todo/:id", async (req, res) => {
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
});


//Delete
app.delete("/todo/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await db.execute("DELETE from Todo where id = ?", [id]);

        res.status(200).json({ message: `Todo of given id=${id} has been deleted succesfully` });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});




app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});












































































































































































































































































































































































































































































































































































































//await db.execute(`create database todo_app`);
// await db.execute(`
//     CREATE TABLE IF NOT EXISTS Todo (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         username VARCHAR(100) NOT NULL,
//         todo VARCHAR(1000) NOT NULL
//     );
// `);