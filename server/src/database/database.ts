const {MongoClient} = require('mongodb');

export const connectDB = async (url:string) => {
    try {
        const client = new MongoClient('mongodb://localhost:27017/');
        await client.connect();
        console.log('db has been connected');
    } catch (e) {
        console.log(e)
    }
}