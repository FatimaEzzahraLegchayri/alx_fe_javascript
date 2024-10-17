// const { type } = require("express/lib/response")

const newQuote = document.getElementById('newQuote')
const quoteDisplay = document.getElementById('quoteDisplay')
const newQuoteText = document.getElementById('newQuoteText')
const newQuoteCategory = document.getElementById('newQuoteCategory')
const exportBtn = document.getElementById('exportBtn')
const importFile = document.getElementById('importFile')
const categories = document.getElementById('categoryFilter')
// console.log(categories.value,'jj');


let arr = JSON.parse(localStorage.getItem('QUOTE')) || [] 
function showRandomQuote(){
    const randomQuote = arr[Math.floor(Math.random()*arr.length)]
    quoteDisplay.innerHTML = randomQuote.text + ' - ' +  randomQuote.category   
}
showRandomQuote()
newQuote.addEventListener('click',showRandomQuote)

function addQuote(){
    if(newQuoteText.value.length == 0 || newQuoteCategory.value.length==0){
        alert('all fiels are required.')
    }else{
        arr.push({text : newQuoteText.value, category : newQuoteCategory.value})
        localStorage.setItem('QUOTE',JSON.stringify(arr))
        newQuoteText.value.innerHTML = ''
        newQuoteCategory.value.innerHTML = ''
        // newQuoteText.value = ''
        // newQuoteCategory.value = ''
    }
}

function exportQuotesToJSON(){  
    const a = document.createElement('a')
    const arrTostring = JSON.stringify(arr);
    const blob = new Blob([arrTostring], {type : 'application/json'})
    const url = URL.createObjectURL(blob)
    // console.log('blob',url);
    a.href = url
    a.download = 'quotes.json'
    a.click()
}
exportBtn.addEventListener("click", exportQuotesToJSON);

function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
      const importedQuotes = JSON.parse(event.target.result);
      arr.push(...importedQuotes);
    //   saveQuotes();
    localStorage.setItem('QUOTE',JSON.stringify(arr))
      alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
}

// Array of quote objects
const quotes = [
    { text: 'The only way to do great work is to love what you do.', category: 'motivation' },
    { text: 'Don’t count the days, make the days count.', category: 'motivation' },
    { text: 'Productivity is never an accident.', category: 'productivity' },
    { text: 'In the end, it’s not the years in your life that count, it’s the life in your years.', category: 'classic' },
    { text: 'The best way to predict the future is to create it.', category: 'productivity' }
];

// Function to filter and display quotes
function filterQuote() {
    const selectedCategory = document.getElementById('categoryFilter').value; // Get selected category
    const quoteListDiv = document.getElementById('quoteList'); // Get the div where quotes will be displayed

    // Clear any previously displayed quotes
    quoteListDiv.innerHTML = '';

    // Filter and display quotes based on selection
    const filteredQuotes = quotes.map(quote => 
        selectedCategory === '' || quote.category === selectedCategory
    );
localStorage.setItem('quote',arr)
    // Display the filtered quotes
    filteredQuotes.forEach(quote => {
        const quoteElement = document.createElement('p');
        quoteElement.textContent = quote.text;
        quoteListDiv.appendChild(quoteElement);
    });

    // Handle case when no quotes are found for the selected category
    if (filteredQuotes.length === 0) {
        const noQuotesMessage = document.createElement('p');
        noQuotesMessage.textContent = 'No quotes found for the selected category.';
        quoteListDiv.appendChild(noQuotesMessage);
    }
}

// Initial load: Display all quotes when the page loads
window.onload = filterQuotes;

// categories.addEventListener('click',populateCategories)




// ///
// function createAddQuoteForm(){

// }
// const li = document.createElement('li')
// li.appendChild(ok)
// document.addEventListener('click',document.getElementById())


option
// ///////////////// api mock ////////////////

 
fetchQuotesFromServer
async function dg (){
    await", "https://jsonplaceholder.typicode.com/posts"}

    method", "POST", "headers", "Content-Type
// Simulated server response (JSONPlaceholder mock)
const serverQuotes = [
    { id: 1, text: 'The only way to do great work is to love what you do.', category: 'motivation' },
    { id: 5, text: 'The best way to predict the future is to create it.', category: 'productivity' }
];

// Save initial quotes to localStorage if not already saved
if (!localStorage.getItem('quotes')) {
    localStorage.setItem('quotes', JSON.stringify(localQuotes));
}

// Function to fetch quotes from localStorage
function getLocalQuotes() {
    return JSON.parse(localStorage.getItem('quotes'));
}

// Function to filter and display quotes
function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value; // Get selected category
    const quoteListDiv = document.getElementById('quoteList'); // Get the div where quotes will be displayed
    const quotes = getLocalQuotes();

    // Clear previous quotes
    quoteListDiv.innerHTML = '';

    // Filter and display quotes
    const filteredQuotes = quotes.filter(quote => 
        selectedCategory === '' || quote.category === selectedCategory
    );

    filteredQuotes.forEach(quote => {
        const quoteElement = document.createElement('p');
        quoteElement.textContent = quote.text;
        quoteListDiv.appendChild(quoteElement);
    });
}

// Initial load: display all quotes
window.onload = filterQuotes;

// Simulate periodic server fetching (every 10 seconds)
setInterval(() => {
    console.log('Checking for new quotes from the server...');
    checkForNewServerQuotes();
}, 10000);

// Function to check if there are new quotes from the server
function checkForNewServerQuotes() {
    const localData = getLocalQuotes();
    const serverData = serverQuotes; // In real implementation, this would be fetched from an API

    const hasConflict = serverData.some(serverQuote => 
        !localData.find(localQuote => localQuote.id === serverQuote.id)
    );

    if (hasConflict) {
        document.getElementById('notification').style.display = 'block';
    }
}

// Function to sync quotes (resolve conflicts)
function syncQuotes() {
    const localData = getLocalQuotes();
    const serverData = serverQuotes; // Simulating server response

    // Merge data (server data takes precedence)
    const mergedData = [...localData];

    serverData.forEach(serverQuote => {
        const existingQuote = mergedData.find(localQuote => localQuote.id === serverQuote.id);
        if (existingQuote) {
            // Update existing quote if there's a conflict
            existingQuote.text = serverQuote.text;
        } else {
            // Add new quote from server if it doesn't exist locally
            mergedData.push(serverQuote);
        }
    });

    // Save updated data to localStorage
    localStorage.setItem('quotes', JSON.stringify(mergedData));

    // Hide notification and refresh quotes list
    document.getElementById('notification').style.display = 'none';
    filterQuotes();
}
