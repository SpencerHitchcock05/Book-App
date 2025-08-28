

export const amazonScrape = async (browser, books, i) => {
    try {

        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36');                
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
        
        await page.waitForSelector('tbody')
        
        const goodreadsBook = await page.$('tbody tr')
        
        const rating = await goodreadsBook.$eval('.minirating', el => el.textContent.trim().substring(0,4)).catch(() => 'N/A')
        
        console.log(rating)
        
        books[i] = {...books[i], image: image, price: price, url: amazonUrl, rating: rating}
        
    } catch (err) {
        console.log(err)
    }
} 