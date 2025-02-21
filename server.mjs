import express from "express";
import dotenv from 'dotenv';
import connectDB from './config/db.mjs';

//import routes
import groupsRouter from './routes/groups.mjs';


//-----SETUP----
const app = express();
dotenv.config();
const PORT = process.env.PORT || 3030;
connectDB();

//---MIDDLEWARE----
app.use(express.json());


//----ROUTES----
app.use("/groups", groupsRouter);

app.use("/", (req,res) => {
    res.send("Landing page");
})

// Listener
app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
});