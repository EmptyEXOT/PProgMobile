const express = require('express');
import {mainPage} from "./Router";
require('dotenv').config({path: '../.env'})
const app = express();

app.get('/', mainPage);

app.listen(process.env.PORT, process.env.IP, () => {
    console.log(`server started on port ${process.env.PORT}`);
});