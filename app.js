
// Ahnaf's Code    
// IG : @ahnaf.rahmn   
// Mail : ahnaf.rahmn@gmail.com

let disp = document.querySelector('.disp'),
btns = [
    ['AC', '+/-', '%', '÷'],
    ['7', '8', '9', 'x'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '='],
],
opActive = false,
min = false,
dot = ".",
preOp,
tempNum = '0',
ans = '';



//=========================================================================
//=========================================================================
start();

function start(){
    for(let i=0; i<5; i++){
        for(let j=0; j<4; j++){
            let newBtn = document.createElement('div');
            newBtn.classList.add('btn');
            if(i==0 && j==0)newBtn.classList.add('AC');
            if(i==0 && j<3){
                newBtn.classList.add('grey');
            }
            if(j==3 || (i==4 && j==2)){
                newBtn.classList.add('op');
            }
            if(i==4 && j==0){
                newBtn.classList.add('zero');
            }
            newBtn.innerHTML = btns[i][j];
            document.querySelector('.grid').appendChild(newBtn);

        // =============================================================================

        // ===========================================  Button Clicks ==================
        
        // =============================================================================

            newBtn.addEventListener('click', function(){
                if(opActive){
                    if(j==3)ans = ans.slice(0, -1);
                    tempNum='';
                    preOp.classList.remove('opActive');
                    opActive = false;
                }
                if(this.innerHTML == '='){  //===================================== Equal button Click 
                    if(tempNum=='' && ans==''){ tempNum += '0'; }
                    else if(tempNum==''){ ans = ans.slice(0, -1); }
                    display(); 
                }

                if((tempNum.length == 0 && this.innerHTML=='0') || (ans=='0' && this.innerHTML=='0')){
                } else{
                    if(i==0 && j<3){  //=================================================== Functions 
                        switch(j){
                            case 0: allClear(); break;

                            case 1: plsmin(); break;

                            case 2: percent(); break;
                        }
                    } else if(j==3){  //==================================================== Operators
                        if(ans=='' && tempNum=='')ans+='0';
                        this.classList.add('opActive');
                        opActive = true;
                        preOp = this;
                        if(ans[ans.length-1]=='0' && tempNum[0]=='0')ans = ans.substring(1);
                        ans += tempNum;
                        tempNum = '';
                        switch(i){
                            case 0: ans += '/'; break;
                            case 1: ans += '*'; break;
                            case 2: ans += '-'; break;
                            case 3: ans += '+'; break;
                        }
                    } else if((i>0 && i<4 && j<3) || (i==4 && j<2)){//==================== Numbers
                        document.querySelector('.AC').innerHTML = 'C';
                        if(!tempNum.includes(dot)){
                            if(tempNum=='' && this.innerHTML=='.')tempNum+='0';
                            else if(this.innerHTML=='.')dot=true;
                            else if(tempNum=='0')tempNum='';
                            if(tempNum.length < 6){
                                tempNum += this.innerHTML;
                                disp.innerHTML = tempNum;
                            }
                            console.log('temp : ' , tempNum);
                            console.log('ans : ' , ans);
                        } else if(this.innerHTML != '.'){
                            if(tempNum.length < 6){
                                tempNum += this.innerHTML;
                                disp.innerHTML = tempNum;
                            }
                        }
                    }
                }
            });

            if(i==4 && j==2){break;}
        }
    }
}
function display(){ // ======================= equal function (=)
    ans += tempNum;
    console.log('temp : ' , tempNum);
    console.log('ans : ' , ans);
    let result = eval(ans).toString();
    tempNum = result;
    ans = '';
    disp.innerHTML = result;

}

function allClear(){ // ============================ (AC) function
    ans = '';
    tempNum = '0';
    min = false;
    opActive = false;
    document.querySelector('.AC').innerHTML = 'AC';
    disp.innerHTML = '0';
}

function plsmin(){  // ============================ (+/-) function
    if(tempNum[0]!='-')tempNum='-'+tempNum;
    else tempNum = tempNum.substring(1);
    disp.innerHTML = tempNum;
}

function percent(){ // ====================================   (%) function
    if(ans=='')tempNum = eval(tempNum + '/100').toString();
    else {
        let lastOp = ans[ans.length-1];
        ans = eval(ans.slice(0, -1)).toString();
        tempNum = eval(ans + lastOp + eval(ans + '*0.01*' + tempNum)).toString();
    }
    ans = '';
    display();
}


// =======================================   Swipe to delete action

let left, right;
disp.addEventListener('touchstart', function(e) {
  left = e.touches[0].clientX;
});

disp.addEventListener('touchend', function(e) {
  right = e.changedTouches[0].clientX;

  const swipeDistance = right - left;
  const threshold = 50; 

  if (Math.abs(swipeDistance) > threshold) {
    tempNum = tempNum.slice(0, -1);
    if(tempNum=='')tempNum='0';
    disp.innerHTML = tempNum;
  }
});
