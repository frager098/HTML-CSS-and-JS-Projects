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
const listItem = document.querySelector('.list').children
//Event Handlers
incomeSection.addEventListener('click', handleClick )    
expenseSection.addEventListener('click', handleClick)
formElem.addEventListener("submit", handleFormSubmit )
list.addEventListener('click',handleEditDelete)

function handleEditDelete(e){
    target = e.target
    console.log(target.closest(".list__item"))
    if (target.closest(".list__item")){
        list.removeChild(target)
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
    e.preventDefault()
    const formData = new FormData(formElem);
    [name,amount,date] = [formData.get('name'),Number(formData.get('amount')),formData.get('date')]
    const transactionType =  state.incomeFlag == true ? "income" : "expense";
    const transactionData = {
        transactionType,
        transactionName:name,
        transactionAmount:amount,
        transactionDate:date
    }
    transaction.push(transactionData)
    list.innerHTML += `
    <li class="list__item ">
        <div class="name__date">
            <h3>${name}</h3>
            <p class="position__date para__date">${date}</p>
        </div>
        <div class="value" style = "color:${state.incomeFlag? 'rgb(154, 205, 50)':'rgb(205, 92, 92)'}">
            <p>${state.incomeFlag? "+$":"-$"}${amount}</p>
        </div>
    </li>
    `
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
const transaction = []
let name,amount,date
