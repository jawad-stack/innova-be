import express from "express"
import swaggerUi from "swagger-ui-express"
import swaggerJSdoc from "swagger-jsdoc"
import cors from "cors"
import userRoute from "./routes/user.route.js"
import mongoose from 'mongoose';


const app = express();
app.use(cors())

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Innova",
            version: "1.0.0",
        },
        servers: [{
            url: 'http://localhost:5000'
        }],
    },
    apis: ['./index.js'],
}

const swaggerSpec = swaggerJSdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use(express.json())
mongoose.connect("mongodb+srv://jawadiqbal962:olx123@olx.5mpfkje.mongodb.net/?retryWrites=true&w=majority").then(() => console.log('Connected!'));

const PORT = process.env.PORT || 5000;

app.use("/api/user", userRoute)

app.listen(PORT, () => console.log(`listening on port ${PORT}`));