//libs
const express = require('express');

//dotenv
require('dotenv').config()

//user functions
import {mainPage} from "./Routers/MainPage";
const mongoose = require('mongoose');
//mongodb initialization

//express app initialization
const app = express();
app.use(express.json())
const authRouter = require('./database/Register');

//main
app.get('/', mainPage);
app.use('/api/auth', authRouter);


const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
    } catch (e) {
        console.log(e)
    } finally {
        app.listen(3000, process.env.IP, () => {
            console.log(`server started on port 3000!`);
        })
    }
}

start();