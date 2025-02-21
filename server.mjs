import express from "express";
import dotenv from 'dotenv';
import connectDB from './config/db.mjs';

//-----SETUP----
const app = express();
dotenv.config();
const PORT = process.env.PORT || 3030;
connectDB();

//---MIDDLEWARE----


//----ROUTES----

app.use("/", (req,res) => {
    res.send("Landing page");
})

// Listener
app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
});