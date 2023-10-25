const add = function(x,y){
    return x+y
}

const subtract = function(x,y){
    return x-y
}

const multiply = function(x,y){
    return x*y
}

const divide = function(x,y){
    return x/y
}

// num1 num2 should be number, operate should return string
const operate = function(num1,num2,operator){
    if (operator==='/'){
        if (num2==0)
            return "Error: cannot divide a number by zero"
        else
            return divide(num1,num2).toFixed(3)
    }
    else if (operator==='x'){
        return multiply(num1,num2).toFixed(3)
    }
    else if (operator==='+'){
        return add(num1,num2).toFixed(3)
    }
    else if (operator==='-'){
        return subtract(num1,num2).toFixed(3)
    }
}
const numBtns = document.querySelectorAll('.numBtn');
const operatorBtns = document.querySelectorAll('.operatorBtn');
const dispScreen = document.querySelector('.displayScreen');

let disp = "";
let num1;
let num2;
let opt;

numBtns.forEach((numBtn) =>{
    numBtn.addEventListener('click',
    () => {let num = numBtn.textContent;
            disp = disp.concat(num);
            dispScreen.textContent = disp;
            }
    )
})

operatorBtns.forEach((optBtn) => {
    optBtn.addEventListener('click',
    () => {
        if (optBtn.textContent ==='.'){
            if (disp.slice(-1)==' ') return
            else if (num1 !==undefined){
                if (disp.slice(num1.length+3).includes('.')) return
            }
            else if (num2 === undefined && disp.includes('.')) return
            
            disp=disp.concat('.');
            dispScreen.textContent = disp;
        }
        else{
            let optOld = opt;
            opt = optBtn.textContent;
            
            if (opt ==='Clear'){
                disp = "";
                num1= undefined;
                num2=undefined;
                opt=undefined;
                dispScreen.textContent = disp;
            }
            else if (disp === "") return
            else if (isNaN(disp.slice(-1)) || disp.slice(-1)===' ') return
            else if ((opt ==='=' && optOld===undefined) || (optOld==='=' && opt==='=')) return
            else if (opt ==='='){
                idx = disp.lastIndexOf(optOld);
                num2 = disp.slice(idx+2);
                disp = disp.concat(' = ', operate(Number(num1),Number(num2),optOld));
                dispScreen.textContent = disp;
                disp = "";
                num1= undefined;
                num2=undefined;
                opt=undefined;
            }
            else if (optOld !== undefined){
                idx = disp.lastIndexOf(optOld);
                num2 = disp.slice(idx+2);
                num1 = operate(Number(num1),Number(num2),optOld);
                disp = disp.concat(' ',opt,' ');
                dispScreen.textContent = disp;
            }
            else if (optOld === undefined){
                num1 = disp;
                disp = disp.concat(' ',opt,' ');
                dispScreen.textContent = disp;
            }
        }
    })
})

