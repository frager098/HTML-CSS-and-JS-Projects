let plusIcons = document.querySelectorAll('.plus')
let minusIcons = document.querySelectorAll('.minus')
const question = document.querySelectorAll('.question')
const obj = document.querySelectorAll('.answer')
question.forEach( function (element) {
    element.addEventListener('click',function(){
        for(let i = 0 ; i < plusIcons.length ; i++ ){
            if(element != minusIcons[i].parentNode){
                continue ;
            }
            else{
                plusIcons[i].classList.toggle('no-display');
                minusIcons[i].classList.toggle('no-display');
                obj[i].classList.toggle('no-display');
            }
        }
    },event)
})