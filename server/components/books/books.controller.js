import { GoogleGenerativeAI } from '@google/generative-ai';
import puppeteer from 'puppeteer';
import dotenv from 'dotenv';
import db from '../../db/connection.js';

dotenv.config();

const apiKey = process.env.GEMINI_KEY;

const genAI = new GoogleGenerativeAI(apiKey);

export const getBooks = async (req, res) => {
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
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36');

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

            const amazonBook = amazonList[1]

            const price = await amazonBook.$eval('.a-price .a-offscreen', el => el.textContent.trim()).catch(() => 'N/A');

            const image = await amazonBook.$eval('.s-image', el => el.src).catch(() => '');


            const goodreadsUrl = `https://www.goodreads.com/search?utf8=%E2%9C%93&query=${encodeURIComponent(books[i].title)}`;

            console.log(goodreadsUrl)

            await page.goto(goodreadsUrl, { waitUntil: 'load' })

            await page.screenshot({ path: 'debug.png', fullPage: true });

            await page.waitForSelector('tbody')
            console.log('waited')

            const goodreadsBook = await page.$('tbody tr')

            const rating = await goodreadsBook.$eval('.minirating', el => el.textContent.trim().substring(0,4)).catch(() => 'N/A')

            console.log(rating)

            books[i] = {...books[i], image: image, price: price, url: amazonUrl, rating: rating}


        } catch (err) {
            console.log(err)
        }
    }

    await browser.close()
 
    console.log(books)

    res.json(books);

}

function clean(input) {
  return input.replace(/[\s\p{P}]+/gu, '').toLowerCase();
}

export const addUserBooks = async (req, res) => {
    const { userId, books } = req.body

    try {
        const [rows] = await db.execute('SELECT title, author FROM user_books WHERE user_id = ?', [userId]);
        
        await Promise.all(
            books.map(async book => {
                let duplicate = false;

                for (const userBook of rows) {
                    if (
                        clean(userBook.title) === clean(book.title) ||
                        clean(userBook.author) === clean(book.author)
                    ) {
                        duplicate = true;
                        break;
                    }
                }

                if (!duplicate) {
                    await db.execute(
                        'INSERT INTO user_books (user_id, title, author, description, image, rating, url) VALUES (?,?,?,?,?,?,?)',
                        [userId, book.title, book.author, book.description, book.image, book.rating, book.url]
                    );
                }
            })
        );


        res.status(201).json({data: "success"});
    } catch(error) {
        res.status(500).json({data: "failure", error})
    }
}

export const getUserBooks = async (req, res) => {
    const { userId } = req.body;

    try {
        const [rows] = await db.execute('SELECT title, author, description, image, rating, url FROM user_books WHERE user_id = ?', [userId]);

        res.status(200).json(rows)
    } catch (error) {
        res.status(500).json({data: "failure", error})
    }
}