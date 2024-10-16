const newQuote = document.getElementById('newQuote')
const quoteDisplay = document.getElementById('quoteDisplay')
const newQuoteText = document.getElementById('newQuoteText')
const newQuoteCategory = document.getElementById('newQuoteCategory')

let arr = JSON.parse(localStorage.getItem('QUOTE')) || [] 
function showRandomQuote(){
    const randomQuote = arr[Math.floor(Math.random()*arr.length)]
    quoteDisplay.textContent = randomQuote.text + ' - ' +  randomQuote.category   
}
showRandomQuote()
newQuote.addEventListener('click',showRandomQuote)

function addQuote(){
    // console.log(newQuoteText.value,'llk');
    if(newQuoteText.value.length == 0 || newQuoteCategory.value.length==0){
        alert('all fiels are required.')
    }else{
        arr.push({text : newQuoteText.value, category : newQuoteCategory.value})
        localStorage.setItem('QUOTE',JSON.stringify(arr))
        // console.log(arr,'arr');
        newQuoteText.value = ''
        newQuoteCategory.value = ''
    }

}
function createAddQuoteForm(){

}