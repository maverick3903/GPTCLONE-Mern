import { connect, disconnect } from "mongoose";

async function connecttoDatabase() {
    try {
        await connect(process.env.MONGODB_URL)
    } catch (error) {
        console.log(error);
        throw new Error ("Cannot connect to MongoDb");
    }
}

async function disconnectDatabase() {
    try {
        await disconnect();
    } catch (error) {
        console.log(error);
        throw new Error ("Cannot connect to MongoDb");
    }
}

export {connecttoDatabase, disconnectDatabase}
