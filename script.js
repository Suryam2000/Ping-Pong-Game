var rod1 = document.getElementById('rod1');
var rod2 = document.getElementById('rod2');
var ball = document.getElementById('ball');

var p1rod = document.getElementById('p1rod');
var p2rod = document.getElementById('p2rod');

var p1score = document.getElementById('p1score');
var p2score = document.getElementById('p2score');

var startmodal = document.getElementById('startmodal');
var modaltext = document.getElementById('modaltext');
var container = document.getElementById('container');
var home = document.getElementById('home');


const thisRod1 = localStorage.getItem("p1name");
const thisRod2 = localStorage.getItem("p2name");
const storeName = "abc";
const storeScore = 123;


/* ------- Used this for multiple key press handling ------------*/

const controller = {
    37: { pressed: false, func: p1_moveLeft},
    39: { pressed: false, func: p1_moveRight},
    65: { pressed: false, func: p2_moveLeft},
    68: { pressed: false, func: p2_moveRight}
};

function p1_moveLeft(){
    if(parseInt(rod1.style.left) - 50 >= 0){
        rod1.style.left = parseInt(rod1.style.left) - 50 + "px"; 
    }
    else{
        rod1.style.left = 0 + "px";
    }
};

function p1_moveRight(){
    if(parseInt(rod1.style.left) + 50 <= (window.innerWidth - 205)){
        rod1.style.left = parseInt(rod1.style.left) + 50 + "px";
    }
    else{
        rod1.style.left = (window.innerWidth - 205) + "px";
    }
};

function p2_moveLeft(){
    if(parseInt(rod2.style.left) - 50 >= 0){
        rod2.style.left = parseInt(rod2.style.left) - 50 + "px"; 
    }
    else{
        rod2.style.left = 0 + "px";
    }
};

function p2_moveRight(){
    if(parseInt(rod2.style.left) + 50 <= (window.innerWidth - 205)){
        rod2.style.left = parseInt(rod2.style.left) + 50 + "px"; 
    }
    else{
        rod2.style.left = (window.innerWidth - 205) + "px";
    }
};

p1rod.textContent = localStorage.getItem("p1name");
p2rod.textContent = localStorage.getItem("p2name");

let whichRod;
let moveX = 2;
let moveY = 2;
let ballMotion;
let border = 12;
let score;
let highScore;
let gameStart = false;

var score1 = 0;
var score2 = 0;

localStorage.setItem(storeScore, "null");
localStorage.setItem(storeName,"null");

(function(){
    highScore = localStorage.getItem(storeScore);
    whichRod = localStorage.getItem(storeName);

    if(whichRod == "null" || highScore == "null"){
        highScore = 0;
        whichRod = thisRod1;
    }
    else{
        alert(whichRod + " has maximum score of " + highScore * 100);
    }
    gameReset(whichRod);
})();


function gameReset(rodName){
    rod1.style.left=((window.innerWidth-rod1.offsetWidth)/2)+"px";
    rod2.style.left=((window.innerWidth-rod2.offsetWidth)/2)+"px";
    ball.style.left=((window.innerWidth-ball.offsetWidth)/2)+"px";
    if(rodName === thisRod1){
        ball.style.top = rod2.getBoundingClientRect().y - 20 + "px";
        moveY = -2;
    }
    else if(rodName === thisRod2){
        ball.style.top = rod1.getBoundingClientRect().height + "px";
        moveY = 2;       
    }
    score = 0;
    gameStart = false;
    startmodal.classList.remove("hid");
    home.classList.remove("hid");
    container.classList.remove("op1");
}



document.addEventListener('keypress', function(e){
    if(e.keyCode == 13){
        if(!gameStart){
            gameStart=true;
            startmodal.classList.add("hid");
            container.classList.add("op1");
            home.classList.add("hid");
            let ballRect = ball.getBoundingClientRect();
            let ballX = ballRect.x;
            let ballY=ballRect.y;
            let ballDia=ballRect.width;
            let rod1Height=rod1.offsetHeight;
            let rod2Height=rod2.offsetHeight;
            let rod1Width=rod2.offsetWidth;
            let rod2Width=rod2.offsetWidth;
            ballMotion = setInterval(function(){
            
                let rod1X=rod1.getBoundingClientRect().x;
                let rod2X=rod2.getBoundingClientRect().x;
                let ballCentre=ballX+ballDia/2;
                ballX+=moveX;
                ballY+=moveY;
                ball.style.left=ballX+"px";
                ball.style.top=ballY+"px";
                if(((ballX+ballDia)>window.innerWidth) || (ballX<0)){
                    moveX=-moveX;
                }
                if(ballY<=rod1Height){
                    moveY=-moveY;
                    score++;
                    if((ballCentre<rod1X) || (ballCentre>(rod1X+rod1Width))){
                        dataStoring(score,thisRod2);
                    }
                }
                if((ballY+ballDia)>=(window.innerHeight-rod2Height)){
                    moveY=-moveY;
                    score++;
                    if((ballCentre<rod2X) || (ballCentre>(rod2X+rod2Width))){
                        dataStoring(score,thisRod1);
                    }
                }
            }, 7);
        }
    }
});


document.addEventListener("keydown", (e) => {
    if(controller[e.keyCode]){
      controller[e.keyCode].pressed = true;
      executeMoves();
    }
  });

  document.addEventListener("keyup", (e) => {
    if(controller[e.keyCode]){
      controller[e.keyCode].pressed = false;
    }
  });


  const executeMoves = () => {
    Object.keys(controller).forEach(key=> {
      controller[key].pressed && controller[key].func()
    })
  };    


function dataStoring(scoreObtained,winningBar){
    if(score>highScore){
        highScore=score;
        localStorage.setItem(storeName,winningBar);
        localStorage.setItem(storeScore,highScore);
    }
    if(winningBar == thisRod2){
        score2++;
        p2score.textContent = score2;
    }
    else{
        score1++;
        p1score.textContent = score1; 
    }

    if(score1 == 1){
        startmodal.classList.remove("hid");
        modaltext.textContent = winningBar + " Wins by " + score1 + " - " + score2 + ". Press Enter to Play Again.";
        score1 = 0;
        score2 = 0;
        p1score.textContent = score1;
        p2score.textContent = score2;
    }

    else if(score2 == 1){
        startmodal.classList.remove("hid");
        modaltext.textContent = winningBar + " Wins by " + score2 + " - " + score1 + ". Press Enter to Play Again.";
        score1 = 0;
        score2 = 0;
        p1score.textContent = score1;
        p2score.textContent = score2;
    }

    clearInterval(ballMotion);
    gameReset(winningBar);
    alert(winningBar+" wins. Score: "+(scoreObtained*100)+". Max Score is: "+(highScore*100));
}