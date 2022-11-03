const {MongoClient} = require('mongodb');

export const connectDB = async () => {
    try {
        const client = new MongoClient('mongodb://localhost:27017/')
        await client.connect();
    } catch (e) {
        console.log(e)
    }
}