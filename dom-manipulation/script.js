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


