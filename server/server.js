const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");


const app = express();
const PORT = 5000;

app.get("/books", async (req, res) => {
    const prompt = req.body;

    console.log("received");
})


app.listen(PORT, () => {
    console.log(`running on port ${PORT}`);
})