require('dotenv').config({path: '../.env'});

export const mainPage = (req:any, res:any) => {
    console.log('router works!');
    res.send('hello!');
};



