const quoteDisplay = document.getElementById('quoteDisplay')
const newQuote = document.getElementById('newQuote')
const newQuoteText = document.getElementById('newQuoteText')
const newQuoteCategory = document.getElementById('newQuoteCategory')
const message = document.getElementById('message')
const addQuote = document.getElementById('addQuote')
const ul = document.getElementById('quotes')


let arr = JSON.parse(localStorage.getItem('quoteList'))||[]

function generateQuote(){
    let randomNum = arr[Math.floor(Math.random() * arr.length)]
    
    arr.lenght<0 ? 
    quoteDisplay.textContent = 'no quote found!'
    :
    quoteDisplay.textContent = `" ` + randomNum.text + ` "` + ' - ' + randomNum.ctg
}
newQuote.addEventListener('click',generateQuote)
generateQuote()

function addQuotes(e){
   e.preventDefault()
   ul.innerHTML = ''
    console.log('mmmmmmmmmmmmmmmmmmmmm',newQuoteText.value);
    console.log('mmmmmmmmmmmmmmmmmmmmm',newQuoteCategory.value);
    
    if(newQuoteText.value == '' || newQuoteCategory.value == ''){
        message.textContent = 'all fields are required'
        message.style.color = 'red'
    }else{
        arr.push({text : newQuoteText.value, ctg : newQuoteCategory.value})
        message.textContent = ''
        localStorage.setItem('quoteList',JSON.stringify(arr))
        newQuoteText.value = newQuoteCategory.value = ''
        message.textContent = 'Quote added succesfuly'
        message.style.color = 'green'
        console.log('arr', arr)
        display()
    }
}
newQuoteText.addEventListener('keypress',function(event){
    if(event.key == "Enter"){
        event.preventDefault()
        newQuoteCategory.focus()
    }
})
document.getElementById('addQuote').addEventListener('click',addQuotes)
newQuoteCategory.addEventListener('keypress',function(event){
    if(event.key == "Enter"){
        addQuotes(e)
    }
})

function display(){
    arr.forEach((e)=>{
        // console.log('e', e.ctg)
        const li = document.createElement('li')
        li.textContent = `" ` + e.text + ` "` + ' - '+ e.ctg
        ul.appendChild(li)
    })
}
display()
 


