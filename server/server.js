const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors = require('cors');
const puppeteer = require('puppeteer');
require('dotenv').config();

const apiKey = process.env.GEMINI_KEY;


const genAI = new GoogleGenerativeAI(apiKey);

const app = express();
const PORT = 5000;

app.use(cors({origin: '*', methods: ['GET', 'POST']}));
app.use(express.json());

app.post("/books", async (req, res) => {

    const parameter = req.body.text;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", generation_config: {"response_mime_type": "application/json"} });
    

    const prompt = `
    
        You are giving book suggestions in an app based on the preferences of a user. 
        this user has already inputted what some of they're preferences are and they are the following

        the user wants to see books that are from the following genres: ${parameter.genre}

        the user wants books that similar to the following books: ${parameter.book} 


        please give 10 to 20 recomendations based off of these parameters, try to make the books interesting and something that the user has not already read

        please give these book recomendations in the form a JSON file. 

        use the following JSON format:

        Recomendation = {'title': string, 'author' : string, 'description': string}
        Return: Array<Recomendation>

        please don't include any comment code
        
        thank you very much.
    
    
    `;


    const result = await model.generateContent(prompt);

    const text = result.response.text()
    
    const jsonResp = JSON.parse(text.substring(7, text.length - 4));


    res.json(jsonResp);
})

app.post("/booksInfo", async (req, res) => {

    const books = req.body.books;

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    for (let i = 0; i < books.length; i++) {
        try {
                        
            console.log(books[i])
        } catch (err) {
            console.log(err)
        }
    }

    await browser.close()

})


app.listen(PORT, () => {
    console.log(`running on port ${PORT}`);
})