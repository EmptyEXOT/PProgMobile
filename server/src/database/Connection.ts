const {MongoClient} = require('mongodb')

export const connect = async (url:string) => {
    try {
        const client = new MongoClient(url);
        await client.connect();
    } catch (e) {
        console.log(e)
    }
}
