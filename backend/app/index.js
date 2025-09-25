const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");

const { safeParse } = require("zod");
const { SignupSchema , formSchema } = require("../zodtypes/types");

const app = express();
const port = 5000;

// --- Middleware --- //
app.use(cors());
app.use(express.json());

const Data = []

// --- API Endpoints --- //

/**
 * Endpoint for user signup.
 */
// app.post("/signup", async (req, res) => {
//     const data = req.body;
//     const parsedData = SignupSchema.safeParse(data);

//     if (!parsedData.success) {
//         return res.status(400).json({ error: parsedData.error.errors });
//     }

//     const { username, password } = parsedData.data;

//     try {
//         const existingUser = await User.findOne({ username });
//         if (existingUser) {
//             return res.status(409).json({ message: "Username already exists." });
//         }

//         const saltRounds = 10;
//         const hashedPassword = await bcrypt.hash(password, saltRounds);

//         const newUser = new User({ username, password: hashedPassword });
//         await newUser.save();
        
//         console.log(`New user created: ${username}`);
//         res.status(201).json({ message: "User created successfully!" });

//     } catch (error) {
//         console.error("Error during signup:", error);
//         res.status(500).json({ error: "Could not create user." });
//     }
// });

// /**
//  * Endpoint to handle form data submission.
//  */
// app.post("/api/geodata", upload.fields([
//     { name: 'geologicalSurveys', maxCount: 1 },
//     { name: 'topographyMaps', maxCount: 1 }
// ]), async (req, res) => {
    
//     const { jsonData } = req.body;
//     if (!jsonData) {
//         return res.status(400).json({ error: "Form data is missing." });
//     }

//     try {
//         const parsedFormData = JSON.parse(jsonData);

//         // Placeholder for file upload logic (e.g., to S3)
//         // const surveyUrl = await uploadToCloud(req.files.geologicalSurveys[0]);
//         // parsedFormData.geologicalSurveyUrl = surveyUrl;
        
//         const newGeoData = new GeoData(parsedFormData);
//         const savedData = await newGeoData.save();

//         console.log("--- New GeoData Record Saved ---");
//         console.log(savedData);

//         res.status(201).json({ 
//             message: "Data saved successfully!",
//             data: savedData 
//         });

//     } catch (error) {
//         console.error("Error processing form data:", error);
//         res.status(500).json({ error: "Failed to save form data." });
//     }
// });



app.post("/api/data", async (req, res) => {
    const data = req.body;
    const parsedData = formSchema.safeParse(data);
    if(!parsedData.success){
        return res.status(400).json({ error: parsedData.error.errors });
    }
    Data.push(parsedData.data);
    console.log(Data);
    res.status(200).json({message: "Data received successfully", data: parsedData.data});

    
})

// --- Start Server --- //
app.listen(port, () => {
    // We require db.js here to ensure the database connection is initiated
    // when the server starts.
    
    console.log(`Server is running on port ${port}`);
});
