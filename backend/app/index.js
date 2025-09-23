const express = require("express");
const { SignupSchema, SigninSchema } = require("../zodtypes/types");

const app = express();
const port = 3000;

app.use(express.json());

app.get("/signup",(req,res)=>{
    const data = req.body;
    const parsedData = SignupSchema.safeParse(data);
    if(!parsedData.success){
        return res.status(400).json({error:parsedData.error.errors});    
    }
    

})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})