import moment from "moment"
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { User } from "../model/user.model.js"
const prisma = new PrismaClient()

// import { v4 } from "uuid"
import { generateTokens } from "../utils/jwt.js"

export const login = async (req, res) => {
    try {
        // const data = await prisma.User.findUnique({
        //     where: {
        //         email: req.body.email,
        //     },
        // })
        const data = await User.findOne({
            email: req.body.email,
        })
        const validPassword = await bcrypt.compare(req.body.password, data.password);
        if (!validPassword) {
            res.send({ data, succeeded: false, status: 403, message: "Invalid Credentials" })
            return
        }
        const accessToken = generateTokens(data);

        data.token = accessToken;

        res.send({ data, succeeded: true, status: 200, message: "Logged in Successfully" })

    } catch (e) {
        res.send({ succeeded: false, status: res.statusCode, message: e.message, })
    }
}

export const register = async (req, res) => {

    req.body.password = bcrypt.hashSync(req.body.password, 12);
    try {
        // const data = await prisma.User.create({
        //     data:
        //     {
        //         ...req.body
        //     },
        // })
        // const newUser = new User({
        //     firstName: 'John',
        //     lastName: 'Doe',
        //     email: 'john@example.com',
        //     password: 'password',
        //     role: 'customer'
        // });

        const newUser = new User(req.body);

        const data = await newUser.save()

        const accessToken = generateTokens(data);
        data.token = accessToken;

        res.send({ data: data, succeeded: true, status: 200, message: "User created Successfully" })

    } catch (e) {
        res.send({ succeeded: false, status: 404, message: e.message })
    }
}


export const getAllUsers = async (req, res) => {

    try {
        // const data = await prisma.User.findMany()
        const data = await User.find()
        res.send({ data, succeeded: true, status: 200, message: "Users get Successfully" })
    } catch (err) {
        res.send({ data: [], succeeded: false, status: 400, message: err.message })
    }

}

export const createUser = async (req, res) => {
    try {
        // const data = await prisma.User.create({
        //     data:
        //     {
        //         ...req.body
        //     },
        // })
        const data = new User(req.body);
        const finalData = data.save()
        res.send({ finalData, succeeded: true, status: 200, message: "User created Successfully" })
    } catch (err) {
        res.send({ finalData: null, succeeded: false, status: 400, message: err.message })
    }
}

export const getUserById = async (req, res) => {
    try {
        // const data = await prisma.User.findUnique({
        //     where: { id: +req.params.id }
        // })

        const data = await User.findOne({ _id: req.params.id })
        res.send({ data, succeeded: true, status: 200, message: "User get Successfully" })
    } catch (error) {
        res.send({ data: null, succeeded: false, status: 400, message: error.message })
    }
}

export const updateUser = async (req, res) => {
    try {
        // const data = await prisma.User.update({
        //     where: { id: +req.params.id },
        //     data: {
        //         ...req.body, dob: `${moment(req.body.dob).format("YYYY-MM-DD")}`
        //     },
        // })
        const data = findOneAndUpdate({ _id: req.params.id }, {
            ...req.body, dob: `${moment(req.body.dob).format("YYYY-MM-DD")}`
        })
        res.send({ data, succeeded: true, status: 200, message: "User updated Successfully" })
    } catch (err) {
        res.send({ data: [], succeeded: false, status: 400, message: err.message })
    }
}

export const deleteUser = async (req, res) => {
    try {
        // const data = await prisma.User.delete({
        //     where: { id: +req.params.id }
        // })
        const data = await User.deleteOne({ _id: req.params.id })
        res.send({ data, succeeded: true, status: 200, message: "User deleted Successfully" })
    } catch (err) {
        res.send({ data: [], succeeded: false, status: 400, message: err.message })
    }
}