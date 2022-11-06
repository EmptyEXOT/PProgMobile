require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const router = require('./Router/index');

const app = express();
const PORT = process.env.PORT;

app.use(express.json())
app.use(cookieParser());
app.use(cors());
app.use('/api', router);


const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            UseUnifiedTopology: true,
        });
        app.listen(PORT, '127.0.0.1', () => {
            console.log(`server started on port 3000!`);
        })
    } catch (e) {
        console.log(e)
    }
}

start();