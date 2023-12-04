import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import auth from './routes/auth.js';
import hotel from './routes/hotel.js';
import user from './routes/user.js';
import room from './routes/room.js';
import cookieParser from "cookie-parser";
import cors from 'cors';
// import auth from './routes/auth.js';
// import auth from './routes/auth.js';

const app = express();
dotenv.config();

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Db connected');
    }
    catch (e) {
        throw e;
    }
}
// another way to connect to mongodb
// mongoose.connect(process.env.MONGO_URL).then(() => console.log('db connected'));

//middlewares
// for cors
app.use(cors());
app.use(express.json()); 
app.use(cookieParser());
app.use('/api/auth', auth);
app.use('/api/hotel', hotel);
app.use('/api/user', user);
app.use('/api/room', room);
//Error handling middleware
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      stack: err.stack,
    });
});
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    connect();
    console.log(`Server listening at ${PORT}`)
});