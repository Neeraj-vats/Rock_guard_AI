import { Schema, model as _model } from "mongoose";

// Define the Signup Schema
const SignupSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,  // Mongoose validation keyword
    maxlength: 100 // Mongoose validation keyword
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    minlength: 6,  // Mongoose validation keyword
    maxlength: 20  // Mongoose validation keyword
  }
});

// Define the Signin Schema
const SigninSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,  // Mongoose validation keyword
    maxlength: 20  // Mongoose validation keyword
  }
});

// Create models
const Signin = _model("Signin", SignupSchema);
const Login = _model("Login", SigninSchema);

// Export models
export { Signin, Login };
