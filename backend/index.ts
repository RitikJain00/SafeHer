import express from 'express'
import bodyParser from 'body-parser';
import dotenv from "dotenv";
import cors from "cors";
import alert from "./src/Routes/alert/alert"
import userRoutes from "./src/Routes/users/user"

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.json()); // parse raw body
app.use(cors())

app.use('/alert', alert);
app.use("/user", userRoutes);

app.listen(PORT , () => console.log(`Server is running at ${PORT}`))