export const connectDB = async (client:any) => {
    try {
        await client.connect();
        console.log('db has been connected');
    } catch (e) {
        console.log(e)
    }
}