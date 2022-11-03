//libs
const {MongoClient} = require('mongodb');
const express = require('express');

//dotenv
require('dotenv').config()

//user functions
import {mainPage} from "./Router";
import {connectDB} from "./database/database";

//mongodb initialization
const client = new MongoClient(process.env.DB_URL)

//express app initialization
const app = express();

//main
app.get('/', mainPage);

const start = async () => {
    try {
        await connectDB(client);
    } catch (e) {
        console.log(e)
    } finally {
        app.listen(3000, process.env.IP, () => {
            console.log(`server started on port 3000!`);
        })
    }
}

start();