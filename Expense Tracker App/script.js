const elem =  document.getElementsByTagName("input");
const formElem = document.querySelector('.form')
let name,amount,date
const list = document.querySelector('.list')
const showBalance = document.querySelector('.balance__text')
const showIncome = document.querySelector('.income')
const showExpense = document.querySelector('.expense')
const section3Row = document.querySelector('.section__3--row')
const incomeSection = document.querySelector('.section__3--income')
const expenseSection = document.querySelector('.section__3--expense')
let income = true
let expense = false
let calculateBalance = 0
let calculateIncome = 0
let calculateExpense = 0
const state = {
    income: 0,
    expense : 0,
    balance:0,
    incomeFlag:true
}
 function updateIncome(currIncome,amount,currBalance){
    console.log(list,"updateIncome()")
    state.income += amount, 
    showIncome.innerHTML = "+$"+state.income;
    state.balance = state.income - state.expense
    showBalance.innerHTML = `${(state.balance > 0 ? "+$": state.balance < 0 ? "-$":"$")}${Math.abs(state.balance)}`
}
function updateExpense(currExpense,amount,currBalance){
    state.expense += amount, 
    showExpense.innerHTML = "-$"+state.expense;
    state.balance = state.income - state.expense
    showBalance.innerHTML = `${(state.balance > 0 ? "+$": state.balance < 0 ? "-$":"$")}${Math.abs(state.balance)}`
}


function toggleTransactionType(){
    incomeSection.classList.toggle('toggle__bgc--white')
    expenseSection.classList.toggle('toggle__bgc--white')
    section3Row.classList.toggle('toggle__bgc--green')
    section3Row.classList.toggle('toggle__bgc--indianred')
} 
incomeSection.addEventListener('click', () => {
    const classCheckOfSection3Row = section3Row.getAttribute('class').split(" ")[2]
    if(classCheckOfSection3Row != 'toggle__bgc--green'){
        income = true
        expense = false
        toggleTransactionType()
    }
})
expenseSection.addEventListener('click', () => {
    const classCheckOfSection3Row = section3Row.getAttribute('class').split(" ")[2]
    if(classCheckOfSection3Row != 'toggle__bgc--indianred'){
        expense = true
        income = false
        toggleTransactionType()
    }
})
formElem.addEventListener("submit",(e) =>{
    e.preventDefault()
    const formData = new FormData(formElem);
    [name,amount,date] = [formData.get('name'),formData.get('amount'),formData.get('date')]
    list.innerHTML += `
    <li class="list__item ">
        <div class="name__date">
            <h3>${name}</h3>
            <p class="position__date para__date">${date}</p>
        </div>
        <div class="value" style = "color:${income? 'rgb(154, 205, 50)':'rgb(205, 92, 92)'}">
            <p>${income? "+$":"-$"}${amount}</p>
        </div>
    </li>
     `
    if(income == true ){
        expense = true
        income = false
        toggleTransactionType();
        (updateIncome(calculateIncome,Number(amount),calculateBalance))
    }
    else{
        (updateExpense(calculateExpense,Number(amount),calculateBalance))
    }
})
