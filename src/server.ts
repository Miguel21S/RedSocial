
import express, { Application } from "express";
import bodyParser from "body-parser";
import "dotenv/config";
import { dbConnection } from "../entities/database/db";
import routerController from "../entities/controllers/routes";
import routesUser from "../entities/users/routes";


const app: Application = express();
const PORT = process.env.PORT || 4998;
app.use(bodyParser.json());

app.use('/api', routerController);
app.use('/api', routesUser);

dbConnection()
    .then(() => {
        console.log('Database connected');
    })
    .catch(error => {
        console.log(error)
    })

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});