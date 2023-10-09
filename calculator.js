
//    Apple iphone Calculator

// Basic Functions
let allClear = document.querySelector('.clear'), plusMin = document.querySelector('.plusMinus'), percent = document.querySelector('.percent'), 

// Numbers/Digits
num_7 = document.querySelector('.digits7'), num_8 = document.querySelector('.digits8'), num_9 = document.querySelector('.digits9'), num_4 = document.querySelector('.digits4'), num_5 = document.querySelector('.digits5'), num_6 = document.querySelector('.digits6'),num_1 = document.querySelector('.digits1'), num_2 = document.querySelector('.digits2'), num_3 = document.querySelector('.digits3'), num_0 = document.querySelector('.digits0'),

// Operators
division = document.querySelector('.op_div'), multi = document.querySelector('.op_mul'), sub = document.querySelector('.op_sub'), sum = document.querySelector('.op_sum'), equal = document.querySelector('.op_eq'), decimal = document.querySelector('.deci'), 

// Display of the Calculator
result = document.querySelector(".disp"), 

// Other Variables
operator = false, final = false, ans = '';

const nums = [num_0, num_1, num_2, num_3, num_4, num_5, num_6, num_7, num_8, num_9, decimal];

//==============================================================>>


for(let i=0; i<nums.length; i++){
  const tempElm = nums[i];
  tempElm.addEventListener("click", function() {
    if(operator){ result.innerHTML = ''; }
    if(final){ ans = ''; }
    operator = false; final = false;
    ans += tempElm.textContent;
    result.innerHTML += tempElm.textContent;
  });
}


allClear.addEventListener("click", function(){
  result.innerHTML = ''; operator = false; ans = ''; final=false;
});

plusMin.addEventListener("click", function(){
if(!operator){ 
  let PM_num = -1*Number(result.textContent);
  ans=''; ans += PM_num.toString();
  result.innerHTML = PM_num;
}
});

percent.addEventListener("click", function(){
  if(hasOperatorsAndDigits(ans)){
    operator=false;
    let temp_ans = ans, anotherTempAns = ans;
    let i=0, temp_op;
    for(i=ans.length-1; i>=0; i--){
      temp_ans = temp_ans.slice(0, i);
      if(!isDigit(ans[i])){ temp_op = ans[i]; break; }
    }
    temp_ans = eval(temp_ans);
    let temp_num = temp_ans*0.01*Number(anotherTempAns.slice(i+1, ans.length));
    let temp_ansNum = temp_ans.toString() + temp_op + temp_num.toString();
    ans = eval(temp_ansNum).toString();
    const ansNum = eval(ans);
    result.innerHTML = ansNum;
  }
});

division.addEventListener("click", function(){
  operator = true; final=false;
  ans += '/';
  result.innerHTML = '';
});

multi.addEventListener("click", function(){
  operator = true; final=false;
  ans += '*';
  result.innerHTML = '';
});

sub.addEventListener("click", function(){
  operator = true; final=false;
  ans += '-';
  result.innerHTML = '';
});

sum.addEventListener("click", function(){
  operator = true; final=false;
  ans += '+';
  result.innerHTML = '';
});

equal.addEventListener("click", function(){
  operator = true;
  const finalAnswer = eval(ans);
  ans = finalAnswer
  result.innerHTML = finalAnswer;
  final = true;
});

function isDigit(character) {
  let digitRegex = /^\d$/;
  return digitRegex.test(character);
}

function hasOperatorsAndDigits(inputString) {
  const operatorRegex = /[+\-*/]/;
  const digitRegex = /[0-9]/;
  const hasOperators = operatorRegex.test(inputString);
  const hasDigits = digitRegex.test(inputString);
  return hasOperators && hasDigits;
}
  