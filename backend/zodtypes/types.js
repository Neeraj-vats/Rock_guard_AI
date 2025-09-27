const z = require("zod");

const SignupSchema = z.object({
    name: z.string().min(2).max(100),
    email: z.string().email() ,
    password: z.string().min(6).max(20),
    
});

const SigninSchema = z.object({
    email: z.string().email() ,
    password: z.string().min(6).max(20)
});



 const formSchema = z.object({
     latitude: z.string(),
     longitude: z.string(),
     slope_deg: z.string(),
     distance_to_rock: z.string(),
     rock_type: z.string(),
     soil_type: z.string(),
     rock_size: z.string(),
     rock_volume: z.string(),
});




module.exports = {
    SignupSchema,
    SigninSchema,
    formSchema
};