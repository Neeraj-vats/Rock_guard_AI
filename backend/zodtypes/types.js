const zod = require("zod");

const SignupSchema = zod.object({
    name: zod.string().min(2).max(100),
    email: zod.string().email() ,
    password: zod.string().min(6).max(20),
    
});

const SigninSchema = zod.object({
    email: zod.string().email() ,
    password: zod.string().min(6).max(20)
});



module.exports = {
    SignupSchema,
    SigninSchema
};