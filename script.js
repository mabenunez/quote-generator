const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const quoteLocation = document.getElementById('location')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')

let apiQuotes = []

function newQuote() {
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
    
    !quote.author ? quoteLocation.textContent = 'Unknown' :  quoteLocation.textContent = quote.author

    if(quote.text.length > 150) {
        quoteText.classList.add('long-quote')
    } else {
        quoteText.classList.remove('long-quote')
    }
    
    quoteText.textContent = quote.text
}

// Get quotes from API
async function getQuotes() {
    const apiURL = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiURL)
        apiQuotes = await response.json()
        newQuote()
    } catch (error) {

    }
}

// On load 
getQuotes()