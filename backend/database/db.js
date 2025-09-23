import { Schema, model as _model } from "mongoose";
import { string, email, minLength, maxLength } from "zod";

const SignupSchema = new Schema({
    name : {
        type: String,
        required: true,
        minLength: 2,
        maxLength :100
    },

    email : {
        type: String,
        required: true,
        unique: true,
    },

    password : {
        type: String,
        required: true,
        minLength: 6,
        maxLength :20
    }

})


const SigninSchema = new Schema({
    email : {
        type: String,
        required: true,
        unique: true,
    },
    password : {
        type: String,
        required: true,
        minLength: 6,
        maxLength :20
    }
})

const Signin = _model("User",SignupSchema);
const Login = _model("Login",SigninSchema);

model.exports{
    Signin,
    Login
}