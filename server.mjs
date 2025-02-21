import express from "express";
import dotenv from 'dotenv';

//Application setup
const app = express();
dotenv.config();
const PORT = process.env.PORT || 3030;

app.use("/", (req,res) => {
    res.send("Landing page");
})

// Listener
app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`);
});