import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbConnect from "./utils/db.js";
dotenv.config();
import productsRoute from "./routes/products.routes.js"

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send(`
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh;">
            <h1 style="color: violet;">Welcome to our website!</h1>
            <h2>Choose, add, delete, update products</h2>
        </div>
    `);
});


app.use('/api/products', productsRoute);

const port = process.env.Port || 3001;
app.listen(port , ()=>{
    dbConnect();
console.log(`server is running on http://localhost:${port}`)
})