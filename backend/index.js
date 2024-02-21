import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoute from './routes/authRoute.js';
import userRoute from './routes/userRoute.js';
dotenv.config();

const app = express();
app.use(cors({
    origin: `http://localhost:3000`,
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/user', userRoute);

mongoose.connect(process.env.MONGODB_URL).then(() => {
    app.listen(process.env.PORT || 8080, () => {
        console.log(`Database Connected & Server is running on port :${process.env.PORT}`);
    })
}).catch((error) => {
    console.log(error);
})
