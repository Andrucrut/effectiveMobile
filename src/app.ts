import "reflect-metadata";
import express, { Request, Response } from "express";
import { AppDataSource } from "./config/AppDataSource";
import requestRouter from "./routes/requestRoutes"

const app = express();
const PORT = 3000;

const handler = (request: Request, response: Response) => {
    response.status(200).send({
        message: "Hello world!",
    });
};

app.use(express.json());
app.get("/", handler);
app.use('/requests', requestRouter);


AppDataSource.initialize()
    .then(() => {
        console.log("Database connected");

        app.listen(PORT, () => {
            console.log("Server is running on port: " + PORT);
        });
    })
    .catch((error) => console.log(error));

