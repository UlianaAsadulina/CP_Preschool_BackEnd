import express from "express";
import dotenv from 'dotenv';
import connectDB from './config/db.mjs';
import cors from 'cors'
import cookieParser from "cookie-parser";

//import routes
import groupsRouter from './routes/groups.mjs';
import usersRouter from './routes/users.mjs';
import authRouter from './routes/auth.mjs';


//-----SETUP----
const app = express();
dotenv.config();
const PORT = process.env.PORT || 3030;
connectDB();

//---MIDDLEWARE----
app.use(cors());
app.use(express.json({ extended: false }));
app.use(cookieParser());




//----ROUTES----
app.use("/groups", groupsRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);

app.use("/", (req,res) => {
    res.send("Landing page");
})

// Listener
app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
});