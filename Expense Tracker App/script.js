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

 function updateIncome(currIncome,amount,currBalance,showBalance){
    currIncome += amount;
    showIncome.innerHTML = "+$"+currIncome;
    currBalance += amount
    if(currBalance > 0){
        showBalance.innerHTML = "+$"+currBalance
    }
    else if(currBalance == 0){
        showBalance.innerHTML = "$"+currBalance
    }
    else{
        let temp = String(currBalance)        
        console.log(typeof(currBalance))
        showBalance.innerHTML = temp[0]+"$"+temp.slice(1)
        console.log("----")
    }
    console.log(currIncome,currBalance,"hello")
    return [currIncome,currBalance];
}
function updateExpense(currExpense,amount,currBalance,showBalance){
    currExpense += amount;
    showExpense.innerHTML = "-$"+currExpense;
    console.log(currBalance,"currBalance")
    currBalance -= amount
    if(currBalance > 0){
        showBalance.innerHTML = "+$"+currBalance
    }
    else if(currBalance == 0){
        showBalance.innerHTML = "$"+currBalance
    }
    else{
        let temp = String(currBalance)        
        showBalance.innerHTML = temp[0]+"$"+temp.slice(1)
        console.log("----")
    }
    return [currExpense,currBalance];
 }

incomeSection.addEventListener('click', () => {
    const classCheckOfSection3Row = section3Row.getAttribute('class').split(" ")[2]
    if(classCheckOfSection3Row != 'toggle__bgc--green'){
        income = true
        expense = false
        incomeSection.classList.toggle('toggle__bgc--white')
        expenseSection.classList.toggle('toggle__bgc--white')
        section3Row.classList.toggle('toggle__bgc--green')
        section3Row.classList.toggle('toggle__bgc--indianred')
    }
})
expenseSection.addEventListener('click', () => {
    const classCheckOfSection3Row = section3Row.getAttribute('class').split(" ")[2]
    if(classCheckOfSection3Row != 'toggle__bgc--indianred'){
        expense = true
        income = false
        incomeSection.classList.toggle('toggle__bgc--white')
        expenseSection.classList.toggle('toggle__bgc--white')
        section3Row.classList.toggle('toggle__bgc--green')
        section3Row.classList.toggle('toggle__bgc--indianred')
    }
})
formElem.addEventListener("submit",(e) =>{
    e.preventDefault()
    const formData = new FormData(formElem);
    [name,amount,date] = [formData.get('name'),formData.get('amount'),formData.get('date')]
    const listItem = document.createElement('li')
    const div1 = document.createElement('div')
    const div2 = document.createElement('div')
    const div1H3 = document.createElement('h3')
    const div1Text = document.createElement('p')
    const div2Text = document.createElement('p')
    listItem.setAttribute('class','list__item')
    div1H3.textContent = name;
    div1Text.textContent = date;
    if(income == true){

    }
    else{

    }
    div1.setAttribute('class','name__date')
    div2.setAttribute('class','value')
    div1Text.setAttribute('class','position__date para__date')
    div1.appendChild(div1H3)
    div1.appendChild(div1Text)
    div2.appendChild(div2Text)
    listItem.appendChild(div1)
    listItem.appendChild(div2)
    list.appendChild(listItem)
    if(income == true ){
        div2Text.textContent = "+$"+amount;
        div2Text.style.color = "rgb(154, 205, 50)"
        expense = true
        income = false
        incomeSection.classList.toggle('toggle__bgc--white');
        expenseSection.classList.toggle('toggle__bgc--white');
        section3Row.classList.toggle('toggle__bgc--green');
        section3Row.classList.toggle('toggle__bgc--indianred');
        console.log(calculateIncome,calculateBalance,"before");
        ([calculateIncome,calculateBalance] = updateIncome(calculateIncome,Number(amount),calculateBalance,showBalance))
        console.log(calculateIncome,calculateBalance,"after")
    }
    else{
        div2Text.textContent = "-$"+amount;
        div2Text.style.color = "rgb(205, 92, 92)" ;
        ([calculateExpense,calculateBalance] = updateExpense(calculateExpense,Number(amount),calculateBalance,showBalance))
        console.log(calculateIncome,calculateBalance,"hmm")
    }
})
