const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors({origin: '*', methods: ['GET']}))

app.get("/", (req, res) => {
    console.log("received");
    res.json({ message: "Hello from the server!" });
})


app.listen(PORT, () => {
    console.log(`running on port ${PORT}`);
})