// const { type } = require("express/lib/response")

const newQuote = document.getElementById('newQuote')
const quoteDisplay = document.getElementById('quoteDisplay')
const newQuoteText = document.getElementById('newQuoteText')
const newQuoteCategory = document.getElementById('newQuoteCategory')
const exportBtn = document.getElementById('exportBtn')

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
        // newQuoteText.value.innerHTML = ''
        // newQuoteCategory.value.innerHTML = ''
        newQuoteText.value = ''
        newQuoteCategory.value = ''
    }
}

function exportQuotesToJSON(){
    
    const a = document.createElement('a')
    // exportBtn.appendChild(a)
    const arrTostring = JSON.stringify(arr);
    const blob = new Blob([arrTostring], {type : 'text/plain'})
    const url = URL.createObjectURL(blob)
    console.log('blob',url);
    a.href = url
    a.download = 'quotes.json'
    a.click()
}
exportBtn.addEventListener("click", exportQuotesToJSON);

// ///
// function createAddQuoteForm(){

// }
// const li = document.createElement('li')
// li.appendChild(ok)
// document.addEventListener('click',document.getElementById())


