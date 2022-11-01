import {Request, Response} from 'express';

require('dotenv').config({path: '../.env'});

export const mainPage = (req:Request, res:any) => {
    console.log('router works!');
    res.send('hello!');
};



