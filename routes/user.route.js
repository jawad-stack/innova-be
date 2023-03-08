import express from "express"
import { createPatient, deletePatient, getAllPatients, getPatientById, login, register, updatePatient } from "../controllers/user.controller.js";

const router = express.Router();

router.post('/register', register)

router.post('/login', login)

router.get('/patient/getAll', getAllPatients)

router.post('/patient/create', createPatient)

router.get('/patient/:id', getPatientById)

router.put('/patient/update/:id', updatePatient)

router.delete('/patient/delete/:id', deletePatient)

export default router;