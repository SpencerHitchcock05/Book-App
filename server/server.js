const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors = require('cors');

const genAI = new GoogleGenerativeAI("AIzaSyAewepeYHVjfAM8_aaXZ1ZP_heiuadXKRs");

const app = express();
const PORT = 5000;

app.use(cors({origin: '*', methods: ['GET']}))

app.get("/books", async (req, res) => {

    console.log("received")

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", generation_config: {"response_mime_type": "application/json"} });
    
    const prompt = "give me some book recomendations in a JSON file format"

    const result = await model.generateContent(prompt);

    const text = result.response.text()
    
    const jsonResp = JSON.parse(text.substring(7, text.length - 4));


    res.json(jsonResp);
})


app.listen(PORT, () => {
    console.log(`running on port ${PORT}`);
})