require('dotenv').config({path: '../.env'});

export const mainPage = (req, res) => {
    console.log('router works!');
    res.send('hello!');
};



