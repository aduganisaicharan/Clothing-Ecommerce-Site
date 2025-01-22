import mongoose, { mongo } from "mongoose";

const connectDB = async()=>{

        mongoose.connection.on('connected',()=>{
            console.log('DB connected');
        })
        // whenever mongodb connection is established then the above function will be executed
        // we can connect our mongoose package from the mongodb atlas server
        await mongoose.connect(`${process.env.MONGODB_URL}`)
}
export default connectDB;