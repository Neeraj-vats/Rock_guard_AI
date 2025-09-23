const express = require("express");

const app = express();
const port = 3000;

app.use(express.json());

app.get("/signup",(req,res)=>{
    const data = req.body;
    kl-
    
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})