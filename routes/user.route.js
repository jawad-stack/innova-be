import express from "express"
import { createUser, deleteUser, getAllUsers, getUserById, login, register, updateUser } from "../controllers/user.controller.js";

const router = express.Router();

router.post('/register', register)

router.post('/login', login)

router.get('/user/getAll', getAllUsers)

router.post('/user/create', createUser)

router.get('/user/:id', getUserById)

router.put('/user/update/:id', updateUser)

router.delete('/user/delete/:id', deleteUser)

export default router;