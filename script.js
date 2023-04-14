const quoteContainer = document.getElementById('quote-container')
const quote = document.getElementById('quote')
const quoteText = document.getElementById('quote-text')
const quoteLocation = document.getElementById('location')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')

let apiQuotes = []

function showLoadingSpinner() {
    loader.hidden = false
    quote.hidden = true
}

function hideLoadingSpinner() {
    quote.hidden = false
    loader.hidden = true
}

function newQuote() {
    showLoadingSpinner()
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]

    !quote.author ? quoteLocation.textContent = 'Unknown' :  quoteLocation.textContent = quote.author

    if(quote.text.length > 150) {
        quoteText.classList.add('long-quote')
    } else {
        quoteText.classList.remove('long-quote')
    }

    quoteText.textContent = quote.text
    hideLoadingSpinner()
}

// Get quotes from API
async function getQuotes() {

    const apiURL = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiURL)
        apiQuotes = await response.json()
        newQuote()
    } catch (error) {
        console.log(error)
    }
}

// Tweet quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteLocation.textContent}`
    window.open(twitterUrl, '_blank')
}

// Event listeners
newQuoteBtn.addEventListener('click', newQuote)

twitterBtn.addEventListener('click', tweetQuote)

// On load
getQuotes()