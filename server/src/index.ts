//libs
const {MongoClient} = require('mongodb');
const express = require('express');
require('dotenv').config({path: '../.env'})
//const jsonParser = express.json();

//user functions
import {mainPage} from "./Router";

//express app initialization
const app = express();
//app.use(express.static(__dirname + '/public'))

app.get('/', mainPage);

const start = async () => {
    try {
        const client = new MongoClient('mongodb://localhost:27017/')
        await client.connect();
        console.log('db has been connected');
    } catch (e) {
        console.log(e)
    } finally {
        app.listen(3000, process.env.IP, () => {
            console.log(`server started on port 3000!`);
        })
    }
}

start();