import express from "express";
import { createTodo, deleteTodo, readTodo, updateTodo } from "../controllers/todoController.js";


const router = express.Router();

router.post('/create', createTodo);
router.get('/', readTodo);
router.patch('/:id', updateTodo);
router.delete('/:id', deleteTodo);

export default router;