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


var speedrod1 = 0;
var speedrod2 = 0;
var positionrod1 = rod1.getBoundingClientRect().left;
var positionrod2 = rod2.getBoundingClientRect().left;


const thisRod1 = localStorage.getItem("p1name");
const thisRod2 = localStorage.getItem("p2name");
const storeName = "abc";
const storeScore = 123;


/* ------- Used this for multiple key press handling ------------*/

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



document.addEventListener('keydown', (e) => {
    if(e.keyCode == 37 || e.which == 37){
        speedrod1 = -10;
    }

    if(e.keyCode == 39 || e.which == 39){
        speedrod1 = 10;
    }

    if(e.keyCode == 65 || e.which == 65){
        speedrod2 = -10;
    }

    if(e.keyCode == 68 || e.which == 68){
        speedrod2 = 10;
    }
  });

  document.addEventListener('keyup', (e) => {
    if(e.keyCode == 37 || e.which == 37){
        speedrod1 = 0;
    }

    if(e.keyCode == 39 || e.which == 39){
        speedrod1 = 0;
    }

    if(e.keyCode == 65 || e.which == 65){
        speedrod2 = 0;
    }

    if(e.keyCode == 68 || e.which == 68){
        speedrod2 = 0;
    }
  });

  window.setInterval(function show(){
      positionrod1 += speedrod1;
      positionrod2 += speedrod2;

      if(positionrod1 <= 1){
          positionrod1 = 1;
      }

      if(positionrod2 <= 1){
            positionrod2 = 1;
      }

      if(positionrod1 >= window.innerWidth - rod1.offsetWidth){
        positionrod1 = window.innerWidth - rod1.offsetWidth;
      }

      if(positionrod2 >= window.innerWidth - rod2.offsetWidth){
        positionrod2 = window.innerWidth - rod2.offsetWidth;
      }

      rod1.style.left = positionrod1 + 'px';
      rod2.style.left = positionrod2 + 'px';

  },1000/60);



function gameReset(rodName){
    if(rodName === thisRod1){
        ball.style.top = rod2.getBoundingClientRect().y - 20 + "px";
        ball.style.left = rod2.getBoundingClientRect().left + (rod2.offsetWidth/2) + "px";
        moveY = -2;
    }
    else if(rodName === thisRod2){
        ball.style.top = rod1.getBoundingClientRect().height + "px";
        ball.style.left = rod1.getBoundingClientRect().left + (rod1.offsetWidth/2) + "px";
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
            modaltext.textContent = "Press Enter to Play.";
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

    if(score1 == 3){
        startmodal.classList.remove("hid");
        modaltext.textContent = winningBar + " wins by " + score1 + " - " + score2 + ". Press Enter to Play Again.";
        score1 = 0;
        score2 = 0;
        p1score.textContent = score1;
        p2score.textContent = score2;
    }

    else if(score2 == 3){
        startmodal.classList.remove("hid");
        modaltext.textContent = winningBar + " wins by " + score2 + " - " + score1 + ". Press Enter to Play Again.";
        score1 = 0;
        score2 = 0;
        p1score.textContent = score1;
        p2score.textContent = score2;
    }

    clearInterval(ballMotion);
    gameReset(winningBar);
    alert(winningBar+" wins. Score: "+(scoreObtained*100)+". Max Score is: "+(highScore*100));
}