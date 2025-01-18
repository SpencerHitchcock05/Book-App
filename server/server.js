const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors = require('cors');
require('dotenv').config();

const apiKey = process.env.GEMINI_KEY;


const genAI = new GoogleGenerativeAI(apiKey);

const app = express();
const PORT = 5000;

app.use(cors({origin: '*', methods: ['GET']}))

app.get("/books", async (req, res) => {

    const parameter = req.params.text;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", generation_config: {"response_mime_type": "application/json"} });
    
    console.log(parameter)

    const prompt = `give me some ${parameter} books in a JSON file format where the json is an array and each element is a book. and no comment code.`;

    const result = await model.generateContent(prompt);

    const text = result.response.text()
    
    const jsonResp = JSON.parse(text.substring(7, text.length - 4));


    res.json(jsonResp);
})


app.listen(PORT, () => {
    console.log(`running on port ${PORT}`);
})