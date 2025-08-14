//state
const state = {
    income: 0,
    expense : 0,
    balance:0,
    incomeFlag:true
}
//UI Selectors
const formElem = document.querySelector('.form');
const list = document.querySelector('.list');
const listItems = document.querySelector('.list').children;
const showBalance = document.querySelector('.balance__text');
const showIncome = document.querySelector('.income');
const showExpense = document.querySelector('.expense');
const section3Row = document.querySelector('.section__3--row');
const incomeSection = document.querySelector('.section__3--income');
const expenseSection = document.querySelector('.section__3--expense');
const deleteButton = document.querySelector('#delete');
//Event Handlers
incomeSection.addEventListener('click', handleIncomeSectionClick)    
expenseSection.addEventListener('click',handleExpenseSectionClick)    
formElem.addEventListener("submit", handleFormSubmit )
list.addEventListener('click',handleDelete)
list.addEventListener('click',handleEdit)

function handleIncomeSectionClick(){
    if(state.incomeFlag == true)return;
    state.incomeFlag = true;
    toggleTransactionType()
    console.log("doing now");
}
function handleExpenseSectionClick(){
    if(state.incomeFlag == false)return;
    state.incomeFlag = false;
    toggleTransactionType()
    console.log("doing now");
}

function handleDelete(e){
    const target = e.target;
    if(target.classList.contains("delete")){
        const item = target.closest(".list__item")
        if(!item)return;
        const id = item.getAttribute("data-id")
        list.removeChild(item);
        localStorage.removeItem(`transaction-${id}`);
        const index = transactions.findIndex(transaction => transaction.id == id)
        if(transactions[index].transactionType == "income"){
            state.income -= transactions[index].transactionAmount;
        }
        else{
            state.expense -= transactions[index].transactionAmount;
        }
        transactions.splice(index,1);
        updateBalance();
        console.log("ho",state)
        updateUI()
        if(transactions.length == 0) {
            list.innerHTML ="";
        }
    }
}

function handleEdit(e){
    const target = e.target;
    if(target.classList.contains("edit")){
        const item = target.closest(".list__item")
        if(!item)return;
        toggleSubmitContainer(item);
        const id = item.getAttribute("data-id");
        const index = transactions.findIndex(transaction => transaction.id == id)
        if(index === -1) return;
        formElem.name.value = transactions[index].transactionName
        formElem.amount.value = transactions[index].transactionAmount
        formElem.date.value = transactions[index].transactionDate;
        togglePointerEventsOnListItems(id);
        const svgs = item.querySelector('.svg__container');
        svgs.innerHTML = crossSvg+tickSvg;
        const cross = svgs.querySelector(".svg__cross");
        const tick = svgs.querySelector(".svg__tick");
        cross.addEventListener('click',() => undoEditedContent(item,svgs,id));
        tick.addEventListener('click',() => saveEditedContent(item,svgs,index,id))
    }
}
function toggleSubmitContainer(item){
    formElem.submit.classList.toggle("toggle__submit--pointer");
    const submitContainer = document.querySelector('.submit__container');
    submitContainer.classList.toggle("toggle__submit--container");
    item.classList.toggle('opacity');
    formElem.reset()
}
function togglePointerEventsOnListItems(id){
    const listItems__local  = [...listItems];
    listItems__local.forEach((item) => {
        if(item.getAttribute("data-id") == id) return;
        item.classList.toggle("pointer__events--none");
    })
}
function undoEditedContent(item,svgs,id){
    toggleSubmitContainer(item)
    svgs.innerHTML = deleteSvg+editSvg
    togglePointerEventsOnListItems(id)

}
function saveEditedContent(item,svgs,index,id){
    const editedTransaction = transactions[index];
    if(editedTransaction.transactionType == "income"){
        updateIncome(-editedTransaction.transactionAmount)
    }
    else{
        updateExpense(-editedTransaction.transactionAmount)
    }
    transactions[index].transactionName = formElem.name.value;
    transactions[index].transactionAmount = Number(formElem.amount.value);
    transactions[index].transactionDate = formElem.date.value;
    transactions[index].transactionType = state.incomeFlag == true ? "income":"expense";
    const lsItem = JSON.parse(localStorage.getItem(`transaction-${transactions[index].id}`));
    lsItem.transactionName = transactions[index].transactionName;
    lsItem.transactionAmount = transactions[index].transactionAmount;   
    lsItem.transactionDate = transactions[index].transactionDate;
    lsItem.transactionType = transactions[index].transactionType;
    localStorage.setItem(`transaction-${transactions[index].id}`,JSON.stringify(lsItem));
    svgs.innerHTML = deleteSvg+editSvg
    toggleSubmitContainer(item);
    const tName = item.querySelector(".tr__title")
    const tDate = item.querySelector(".date__text");
    const tValue = item.querySelector(".value__text");
    tName.innerHTML = transactions[index].transactionName;
    tDate.innerHTML = transactions[index].transactionDate;
    tValue.innerHTML = `${state.incomeFlag? "+$":"-$"}${transactions[index].transactionAmount}`;
    if(transactions[index].transactionType == "income"){
        updateIncome(transactions[index].transactionAmount);
        tValue.style.color = "rgb(154, 205, 50)"
    }
    else{
        updateExpense(transactions[index].transactionAmount);
        tValue.style.color = "rgb(205, 92, 92)"

    }
    updateUI();
    togglePointerEventsOnListItems(id)
}

function handleFormSubmit(e){
    e.preventDefault();
    const formData = new FormData(formElem);
    [name,amount,date] = [formData.get('name'),Number(formData.get('amount')),formData.get('date')] 
    formElem.reset()
    const transactionData = createTransaction(name,amount,date)
    localStorage.setItem(`transaction-${transactionData.id}`,JSON.stringify(transactionData));
    createListItem(transactionData)
    if(state.incomeFlag == true ){
        state.incomeFlag = false
        toggleTransactionType();
        updateIncome(transactionData.transactionAmount);
    }
    else{
        updateExpense(transactionData.transactionAmount);
    }
    updateUI()
}
function createTransaction(name,amount,date){
    const transactionType =  state.incomeFlag == true ? "income" : "expense";
    const transactionData = {
        id:Date.now(),
        transactionType,
        transactionName:name,
        transactionAmount:amount,
        transactionDate:date
    }
    transactions.push(transactionData)
    return transactionData;
}
function createListItem(transactionData){     
        list.innerHTML += `
    <li class="row list__item" data-id="${transactionData.id}">
        <div class = "row list__item--row">    
            <div class="name__date">
                <h3 class="tr__title">${transactionData.transactionName}</h3>
                <p class="position__date para__date date__text">${transactionData.transactionDate}</p>
            </div>
            <div class="value" style = "color:${transactionData.transactionType =="income" ? 'rgb(154, 205, 50)':'rgb(205, 92, 92)'}">
                <p class="value__text">${state.incomeFlag? "+$":"-$"}${transactionData.transactionAmount}</p>
            </div>
        </div>
        <div class="svg__container row">  
           ${deleteSvg+editSvg}
        </div>    
    </li>
        `;
}
function updateIncome(amount){
    state.income += amount, 
    updateBalance();
}

function updateExpense(amount){
    state.expense += amount
    updateBalance();
}
function updateBalance(){
    state.balance = state.income - state.expense;
}
function updateUI(){
     console.log(state,"state")
    showIncome.textContent = "+$"+(state.income).toFixed(2);  
    (state.expense) > 0 ? showExpense.textContent = "-$"+(state.expense).toFixed(2):"$"+(state.expense).toFixed(2);
    const balance = state.balance;
    showBalance.textContent = `${(balance > 0 ? "+$": balance < 0 ? "-$":"$")}${(Math.abs(balance)).toFixed(2)}`
}

function toggleTransactionType(){
    incomeSection.classList.toggle('toggle__bgc--white')
    expenseSection.classList.toggle('toggle__bgc--white')
    section3Row.classList.toggle('toggle__bgc--green')
    section3Row.classList.toggle('toggle__bgc--indianred')
} 

//Initialization
const transactions = []
let name,amount,date;

const deleteSvg = ` <svg class="svg__delete" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                <title>Delete</title>
                <!-- !Font Awesome Free v7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. -->
                <path class="delete" d="M232.7 69.9L224 96L128 96C110.3 96 96 110.3 96 128C96 145.7 110.3 160 128 160L512 160C529.7 160 544 145.7 544 128C544 110.3 529.7 96 512 96L416 96L407.3 69.9C402.9 56.8 390.7 48 376.9 48L263.1 48C249.3 48 237.1 56.8 232.7 69.9zM512 208L128 208L149.1 531.1C150.7 556.4 171.7 576 197 576L443 576C468.3 576 489.3 556.4 490.9 531.1L512 208z"/></svg>
`
const editSvg = `<svg class="svg__edit" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 
            Fonticons, Inc.-->
            <title>Edit</title>
            <path class="edit" d="M128.1 64C92.8 64 64.1 92.7 64.1 128L64.1 512C64.1 547.3 92.8 576 128.1 576L274.3 576L285.2 521.5C289.5 499.8 300.2 479.9 315.8 464.3L448 332.1L448 234.6C448 217.6 441.3 201.3 429.3 189.3L322.8 82.7C310.8 70.7 294.5 64 277.6 64L128.1 64zM389.6 240L296.1 240C282.8 240 272.1 229.3 272.1 216L272.1 122.5L389.6 240zM332.3 530.9L320.4 590.5C320.2 591.4 320.1 592.4 320.1 593.4C320.1 601.4 326.6 608 334.7 608C335.7 608 336.6 607.9 337.6 607.7L397.2 595.8C409.6 593.3 421 587.2 429.9 578.3L548.8 459.4L468.8 379.4L349.9 498.3C341 507.2 334.9 518.6 332.4 531zM600.1 407.9C622.2 385.8 622.2 350 600.1 327.9C578 305.8 542.2 305.8 520.1 327.9L491.3 356.7L571.3 436.7L600.1 407.9z"/></svg>`

const tickSvg = `<svg class="svg__tick" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">'
<title>cross</title>
<path class="tick" d="M530.8 134.1C545.1 144.5 548.3 164.5 537.9 178.8L281.9 530.8C276.4 538.4 267.9 543.1 258.5 543.9C249.1 544.7 240 541.2 233.4 534.6L105.4 406.6C92.9 394.1 92.9 373.8 105.4 361.3C117.9 348.8 138.2 348.8 150.7 361.3L252.2 462.8L486.2 141.1C496.6 126.8 516.6 123.6 530.9 134z"/></svg>`;

let crossSvg = `<svg class="svg__cross" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
<title>save</title>
<path class="cross" d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z"/></svg>`;
const formatter = new Intl.NumberFormat('en-us',{
    currency:'USD',
    style:"currency",
    signDisplay:'always'
})

if(localStorage.length != 0){
    for(let i = 0; i < localStorage.length; i++){
        const key = localStorage.key(i);
        if(key.startsWith('transaction-')){
            const transactionData = JSON.parse(localStorage.getItem(key));
            transactions.push(transactionData);
            createListItem(transactionData);
            if(transactionData.transactionType == "income"){
                updateIncome(transactionData.transactionAmount);
            }
            else{
                updateExpense(transactionData.transactionAmount);
            }
            updateUI();
        }
    }
}