import express from "express"
import { createUser, deleteUser, getAllUsers, getUserById, login, register, updateUser } from "../controllers/user.controller.js";
import { authMiddleware } from "../utils/authMiddleware.js";

const router = express.Router();

router.post('/register', register)

router.post('/login', login)

router.get('/getAll', authMiddleware, getAllUsers)

router.post('/create', authMiddleware, createUser)

router.get('/:id', authMiddleware, getUserById)

router.put('/update/:id', authMiddleware, updateUser)

router.delete('/delete/:id', authMiddleware, deleteUser)

export default router;