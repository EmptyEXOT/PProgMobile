const {MongoClient} = require('mongodb')
require('dotenv').config();



export const registerUser = async () => {
    const client = new MongoClient(process.env.DB_URL);
    try {
        await client.connect();
        console.log('registration logic')
    } catch (e) {
        //errors handler
        console.log(e)
    } finally {
        //mongodb client close
        await client.close()
    }
}
