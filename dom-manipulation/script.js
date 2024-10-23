const quoteDisplay = document.getElementById('quoteDisplay')
const newQuote = document.getElementById('newQuote')
const newQuoteText = document.getElementById('newQuoteText')
const newQuoteCategory = document.getElementById('newQuoteCategory')
const message = document.getElementById('message')
const addQuote = document.getElementById('addQuote')
const ul = document.getElementById('quotes')
// const removeBtn = document.createElement('button')


let arr = JSON.parse(localStorage.getItem('quoteList')) || [];

function generateQuote(){
    let randomNum = arr[Math.floor(Math.random() * arr.length)]
    
    arr.length == 0 ? 
    (
        newQuote.style.display = 'none'
    )
    :
    (quoteDisplay.textContent = `" ` + randomNum.text + ` "` + ' - ' + randomNum.ctg)
}
newQuote.addEventListener('click',generateQuote)
generateQuote()

function addQuotes(e){
   e.preventDefault()
    
    if(newQuoteText.value == '' || newQuoteCategory.value == ''){
        message.textContent = 'all fields are required'
        message.style.color = 'red'
    }else{
        ul.innerHTML = ''
        arr.push({text : newQuoteText.value, ctg : newQuoteCategory.value})
        message.textContent = ''
        localStorage.setItem('quoteList',JSON.stringify(arr))
        newQuoteText.value = newQuoteCategory.value = ''
        message.textContent = 'Quote added succesfuly'
        message.style.color = 'green'
        console.log('arr', arr)
        display()
        generateQuote()
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
    arr.length == 0 ?
    (ul.textContent = 'No quote yet. add one!')
    :
    (
        arr.forEach((e,i)=>{
            const li = document.createElement('li')
            const removeBtn = document.createElement('button')
            removeBtn.textContent = 'remove'
            removeBtn.id = 'removeBtn'
            li.textContent = `" ` + e.text + ` "` + ' - '+ e.ctg
            ul.appendChild(li)
            li.appendChild(removeBtn)
            removeBtn.addEventListener('click', function(){
                remove(i,li)
                generateQuote()   
                

            })
            
        })
    )
}
display()
 
function remove(i,li){
    ul.removeChild(li)
    arr.splice(i,1)
    localStorage.setItem('quoteList',JSON.stringify(arr)) 
}
// removeBtn.addEventListener('click',remove)

// document.getElementById('removeBtn').addEventListener('click',function remove(e,li){
//     console.log('llllllllllll');
// li.removeChild(e)
// })
