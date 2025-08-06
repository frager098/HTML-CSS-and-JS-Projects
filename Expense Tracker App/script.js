//state
const state = {
    income: 0,
    expense : 0,
    balance:0,
    incomeFlag:true
}
//UI Selectors
const elem =  document.getElementsByTagName("input");
const formElem = document.querySelector('.form')
const list = document.querySelector('.list')
const showBalance = document.querySelector('.balance__text')
const showIncome = document.querySelector('.income')
const showExpense = document.querySelector('.expense')
const section3Row = document.querySelector('.section__3--row')
const incomeSection = document.querySelector('.section__3--income')
const expenseSection = document.querySelector('.section__3--expense')
const deleteButton = document.querySelector('#delete')
const listItem = document.querySelector('.list').children
//Event Handlers
incomeSection.addEventListener('click', handleClick )    
expenseSection.addEventListener('click', handleClick)
formElem.addEventListener("submit", handleFormSubmit )
list.addEventListener('click',handleDelete)

function handleDelete(e){
    let item;
    const target = e.target;
    if(target.classList.contains("delete")){
        item = target.closest(".list__item")
    }
    if (item){
        const id = item.getAttribute("data-id")
        list.removeChild(item);
        const index = transactions.findIndex(transaction => transaction.id == id)
    
    if(transactions[index].transactionType == "income"){
        state.income -= transactions[index].transactionAmount;
        state.balance = state.income - state.expense;
    }
    else{
        state.expense -= transactions[index].transactionAmount;
        state.balance = state.income - state.expense;
    }
    updateUI()
    transactions.splice(index,1);
    }
    if(transactions.length == 0) {
        list.innerHTML ="";
    }
}

function handleClick(e){
    const classCheckOfSection3Row = section3Row.getAttribute('class').split(" ")[2]
    if(classCheckOfSection3Row != 'toggle__bgc--green'){
        state.incomeFlag = true
        toggleTransactionType()
    }
    else{
        state.incomeFlag = false
        toggleTransactionType()
    }
} 
function handleFormSubmit(e){
    e.preventDefault();
    const formData = new FormData(formElem);
    [name,amount,date] = [formData.get('name'),Number(formData.get('amount')),formData.get('date')]
    formElem.reset()
    createTransaction()
    createListItem()
    if(state.incomeFlag == true ){
        state.incomeFlag = false
        toggleTransactionType();
        updateIncome()
    }
    else{
        updateExpense()
    }
    updateUI()
}
function createTransaction(){
    const transactionType =  state.incomeFlag == true ? "income" : "expense";
    const transactionData = {
        id:transactions.length + 1,
        transactionType,
        transactionName:name,
        transactionAmount:amount,
        transactionDate:date
    }
    transactions.push(transactionData)
}
function createListItem(){
        list.innerHTML += `
    <li class="row list__item" data-id="${transactions[transactions.length - 1 ].id}">
        <div class = "row list__item--row">    
            <div class="name__date">
                <h3>${name}</h3>
                <p class="position__date para__date">${date}</p>
            </div>
            <div class="value" style = "color:${state.incomeFlag? 'rgb(154, 205, 50)':'rgb(205, 92, 92)'}">
                <p>${state.incomeFlag? "+$":"-$"}${amount}</p>
            </div>
        </div>
        <div class="svg__container row">  
            <svg class="delete" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                <title>Delete</title>
                <!-- !Font Awesome Free v7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. -->
                <path d="M232.7 69.9L224 96L128 96C110.3 96 96 110.3 96 128C96 145.7 110.3 160 128 160L512 160C529.7 160 544 145.7 544 128C544 110.3 529.7 96 512 96L416 96L407.3 69.9C402.9 56.8 390.7 48 376.9 48L263.1 48C249.3 48 237.1 56.8 232.7 69.9zM512 208L128 208L149.1 531.1C150.7 556.4 171.7 576 197 576L443 576C468.3 576 489.3 556.4 490.9 531.1L512 208z"/></svg>

            <svg title="Edit" class="edit" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 
            Fonticons, Inc.-->
            <title>Edit</title>
            <path d="M128.1 64C92.8 64 64.1 92.7 64.1 128L64.1 512C64.1 547.3 92.8 576 128.1 576L274.3 576L285.2 521.5C289.5 499.8 300.2 479.9 315.8 464.3L448 332.1L448 234.6C448 217.6 441.3 201.3 429.3 189.3L322.8 82.7C310.8 70.7 294.5 64 277.6 64L128.1 64zM389.6 240L296.1 240C282.8 240 272.1 229.3 272.1 216L272.1 122.5L389.6 240zM332.3 530.9L320.4 590.5C320.2 591.4 320.1 592.4 320.1 593.4C320.1 601.4 326.6 608 334.7 608C335.7 608 336.6 607.9 337.6 607.7L397.2 595.8C409.6 593.3 421 587.2 429.9 578.3L548.8 459.4L468.8 379.4L349.9 498.3C341 507.2 334.9 518.6 332.4 531zM600.1 407.9C622.2 385.8 622.2 350 600.1 327.9C578 305.8 542.2 305.8 520.1 327.9L491.3 356.7L571.3 436.7L600.1 407.9z"/></svg>
        </div>    
    </li>
        `;
}
function updateIncome(){
    state.income += amount, 
    state.balance = state.income - state.expense;
}

function updateExpense(e){
    state.expense += amount
    state.balance = state.income - state.expense;
}
function updateUI(e){
    console.log(state.incomeFlag,"state")
    showIncome.textContent = "+$"+state.income;  
    state.expense > 0 ? showExpense.textContent = "-$"+state.expense : showExpense.textContent = "$"+state.expense
    const balance = state.balance;
    showBalance.textContent = `${(balance > 0 ? "+$": balance < 0 ? "-$":"$")}${Math.abs(balance)}`
}

function toggleTransactionType(){
    incomeSection.classList.toggle('toggle__bgc--white')
    expenseSection.classList.toggle('toggle__bgc--white')
    section3Row.classList.toggle('toggle__bgc--green')
    section3Row.classList.toggle('toggle__bgc--indianred')
} 

//Initialization
const transactions = []
let name,amount,date
const formatter = new Intl.NumberFormat('en-us',{
    currency:'USD',
    style:"currency",
    signDisplay:'always'
})
// formatter.format(0).re
    console.log(Date.now())
    // <div class="delete__svg">
    // <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M232.7 69.9L224 96L128 96C110.3 96 96 110.3 96 128C96 145.7 110.3 160 128 160L512 160C529.7 160 544 145.7 544 128C544 110.3 529.7 96 512 96L416 96L407.3 69.9C402.9 56.8 390.7 48 376.9 48L263.1 48C249.3 48 237.1 56.8 232.7 69.9zM512 208L128 208L149.1 531.1C150.7 556.4 171.7 576 197 576L443 576C468.3 576 489.3 556.4 490.9 531.1L512 208z"/></svg>
    // </div>
    