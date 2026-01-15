let gameSeq = [];
let userSeq = [];

let btns = ["yellow","red","purple","green"];

let started = false;
let level = 0;
let highestLevel = 0;
let h2 = document.querySelector("h2");
//1
document.addEventListener("keypress", function() {
    if(started == false){
        console.log("game started");
        started=true;

        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    },250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash");
    },250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level} `;
    

    let randIdx = Math.floor(Math.random() * 3);
    let randColor = btns[randIdx];
    let ranBtn = document.querySelector(`.${randColor}`);//to store as a veriable. random color class choose hoga querySelector se or o ranBtn me store hoga
    //console.log(randIdx);
    //console.log(randColor);
    //console.log(ranBtn);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(ranBtn);//random btn chhose
}

function checkAns(idx) {
    //console.log("curr level:",level);
    //let idx = level-1;//gameseq ka last value userseq se match karana ke liya
    if(userSeq[idx] === gameSeq[idx]){
        //console.log("same value");
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp, 1000);
        }
    }else{
        if(level > highestLevel){
            highestLevel = level;
        }
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> High Score: <b>${highestLevel}</b> <br> Press any key to start`;

        //h2.innerHTML=`Game Over !,your score was <b>${level}</b> <br> press any key to start`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white";
        },150);
        
        rest();
    }
}
function btnPress() {
    //console.log(this); // this -> those btn are click
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    
    checkAns(userSeq.length-1);// userSeq me last btn ko check karna he
}

let allBtn = document.querySelectorAll(".btn");
for(let btn of allBtn) {
    btn.addEventListener("click",btnPress);
}

function rest() {
    started = false;
    level = 0;
    gameSeq = [];
    userSeq = [];
}