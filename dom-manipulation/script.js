const quoteDisplay = document.getElementById('quoteDisplay')
const newQuote = document.getElementById('newQuote')
const newQuoteText = document.getElementById('newQuoteText')
const newQuoteCategory = document.getElementById('newQuoteCategory')
const message = document.getElementById('message')
const addQuote = document.getElementById('addQuote')
const ul = document.querySelector('ul')
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
        arr.forEach((e,index)=>{
            const li = document.createElement('li')
            const removeBtn = document.createElement('button')
            removeBtn.textContent = 'remove'
            removeBtn.classList.add('removeBtn')
            li.textContent = `" ` + e.text + ` "` + ' - '+ e.ctg
            // console.log('e.text', e)
            ul.appendChild(li)
            li.appendChild(removeBtn)
            removeBtn.addEventListener('click', function(){
                remove(index,li)
                generateQuote()   
                

            })
            
        })
    )
}
display()
 
function remove(index,li){
    ul.removeChild(li)
    arr.splice(index,1)
    localStorage.setItem('quoteList',JSON.stringify(arr)) 
} 

function getCategories(){   
    const categorySelect = document.getElementById('categoryFilter')
    if(arr.length !== 0){

        arr.forEach((e)=>{
        const option = document.createElement('option')
        option.textContent = e.ctg
        option.value = e.ctg
        categorySelect.appendChild(option)
        categorySelect.addEventListener('change', function (){
            const value = categorySelect.value
            // console.log('categorySelect', categorySelect.value)
            filterQuotes(value)
        })
        
        })

        
    }else{
        categorySelect.style.display = 'none'
    }
     
}
document.addEventListener('DOMContentLoaded',getCategories)

function filterQuotes(value){
    
    ul.innerHTML = ''
    const filteredQuotes = arr.filter((e)=>e.ctg === value)
    console.log('filteredQuotes', filteredQuotes)
    if(filterQuotes.length > 0){
        filteredQuotes.forEach((quote) =>{
            const li = document.createElement('li')
            li.textContent = ` ${quote.text}  - ${quote.ctg}`
            const removeBtn = document.createElement('button')
            removeBtn.classList.add('removeBtn')
            removeBtn.textContent = 'remove'
            li.appendChild(removeBtn)
            ul.appendChild(li)
            li.appendChild(removeBtn)
            removeBtn.addEventListener('click',function (){
                const indexInOriginalArray = arr.findIndex(item => item === quote);
                removeAfterFilter(indexInOriginalArray);
                filterQuotes(value);
            })
        })
    } 
    else{
        const li = document.createElement('li');
        li.textContent = 'No quote found in this category.';
        ul.appendChild(li);
    }
}

function removeAfterFilter(index){
    arr.splice(index,1)
    localStorage.setItem('quoteList',JSON.stringify(arr)) 
}
 
// document.getElementById('all').addEventListener('click',display)





