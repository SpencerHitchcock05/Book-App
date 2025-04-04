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

        Recomendation = {'title': string, 'author' : string, 'description': string, 'longDescription': string}
        Return: Array<Recomendation>

        please don't include any comment code
        
        thank you very much.
    
    
    `;


    const result = await model.generateContent(prompt);

    const text = result.response.text()
    
    const books = JSON.parse(text.substring(7, text.length - 4));

    console.log(books)


    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    for (let i = books.length - 1; i >= 0; i--) {
        try {
                    
            const amazonUrl = `https://www.amazon.ca/s?k=${encodeURIComponent(books[i].title)}`;

            console.log(amazonUrl)

            await page.goto(amazonUrl, { waitUntil: 'domcontentloaded' })

            await page.waitForSelector('.s-main-slot');

            const amazonList = await page.$$('.s-main-slot .s-result-item');

            if (!amazonList) {
                console.log('No results found');
                await browser.close();
                return null;
            }

            const book = amazonList[1]

            const price = await book.$eval('.a-price .a-offscreen', el => el.textContent.trim()).catch(() => 'N/A');

            const image = await book.$eval('.s-image', el => el.src).catch(() => 'N/A');

            books[i] = {...books[i], image: image, price: price, url: amazonUrl}

            const goodreadsUrl = `https://www.goodreads.com/search?utf8=%E2%9C%93&query=${encodeURIComponent(books[i].title)}`;

            console.log(goodreadsUrl)

            await page.goto(goodreadsUrl, { waitUntil: 'load' })


            await page.screenshot({ path: 'debug.png', fullPage: true });

            await page.waitForSelector('.tableList')
            console.log('waited')

            const goodreadsList = page.$$('.tableList tr')

            console.log(goodreadsList)

            console.log(book)
        } catch (err) {
            console.log(err)
        }
    }

    await browser.close()

    
    console.log(books)

    res.json(books);


})



app.listen(PORT, () => {
    console.log(`running on port ${PORT}`);
})