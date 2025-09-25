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



export const formSchema = z.object({
  latitude: z
    .string()
    .nonempty("Latitude is required")
    .refine((val) => !isNaN(Number(val)), {
      message: "Latitude must be a number",
    }),
    
  longitude: z
    .string()
    .nonempty("Longitude is required")
    .refine((val) => !isNaN(Number(val)), {
      message: "Longitude must be a number",
    }),

  slope_deg: z
    .string()
    .nonempty("Slope is required")
    .refine((val) => !isNaN(Number(val)), {
      message: "Slope must be a number",
    }),

  distance_to_rock: z
    .string()
    .nonempty("Distance to rock is required")
    .refine((val) => !isNaN(Number(val)), {
      message: "Distance must be a number",
    }),

  rock_type: z.string().nonempty("Rock type is required"),

  soil_type: z.string().nonempty("Soil type is required"),

  rock_size: z
    .string()
    .nonempty("Rock size is required")
    .refine((val) => !isNaN(Number(val)), {
      message: "Rock size must be a number",
    }),

  rock_volume: z
    .string()
    .nonempty("Rock volume is required")
    .refine((val) => !isNaN(Number(val)), {
      message: "Rock volume must be a number",
    }),
});



module.exports = {
    SignupSchema,
    SigninSchema
};