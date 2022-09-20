var score=0;
var cross =true;
var audiobgm= new Audio('backgroundscore.mp3');
var audiodeath = new Audio('over.mp3');

const startElem = document.querySelector("[data-start]")
const obstacleElem = document.querySelector("[data-obstacle]")
document.addEventListener("keydown",handleStart,{once:true})


function handleStart(){
    startElem.classList.add("hide")
    score=0;
    updateScore(score);//so the score will be set to 0 every time the game resets
    obstacleElem.classList.add("obsAni") //so villain will move only after we click a key and start the game
}

document.onkeydown =function(k){
    audiobgm.play();
    var keydown =k.keyCode;
    console.log(keydown);
    var ben=document.querySelector(".ben");
    if(k.keyCode ==37){ //LEFT key
        console.log("LEFT");
        var benpos = parseInt(window.getComputedStyle(ben,null).getPropertyValue("left")) //getpropertyvalue(left) will take the left given in .ben
        console.log("Position is : "+benpos); 
        ben.style.left = benpos - 50 +"px";//ben will be moved 50px to the LEFT
    }
    
    if(k.keyCode ==39){ //RIGHT key
        console.log("RIGHT");
        var benpos = parseInt(window.getComputedStyle(ben,null).getPropertyValue("left"))
        console.log("original Position is : "+benpos);
        ben.style.left = benpos + 50 +"px";//ben will be moved 50px to the RIGHT
    }

    if(k.keyCode ==38){ //UP key
        console.log("UP");
        if(ben.classList =="benAni"){return;}/* Its adding classes again and agian, so the animation is not completing,
        so this line makes sure that ,when class is added once then return it*/
        ben.classList.add('benAni');//this attatches the benjump class to ben to make him jump using the animation
        setTimeout(()=>{
            ben.classList.remove('benAni');},3000);/*this is removing the animation after 2 seconds,
            so we need to click UP key again to move ben*/
    }   
}

setInterval(()=>{
    ben=document.querySelector('.ben');
    gameover=document.querySelector('.gameover');
    obstacle=document.querySelector('.obstacle');

    bl=parseInt(window.getComputedStyle(ben,null).getPropertyValue('left'));
    console.log("bl : "+bl);
    bt=parseInt(window.getComputedStyle(ben,null).getPropertyValue('top'));
    console.log("bt : "+bt);
    ol=parseInt(window.getComputedStyle(obstacle,null).getPropertyValue('left'));
    console.log("ol :" +ol);
    ot=parseInt(window.getComputedStyle(obstacle,null).getPropertyValue('top'));
    console.log("ot : "+ot);

    offsetX=Math.abs(bl-ol);
    offsetY=Math.abs(bt-ot);

    if(offsetX < 50 && offsetY < 50  ){ 
        gameover.innerHTML = "Game Over!";
        document.getElementById("restart").innerHTML="Reload to Restart the game";
        obstacle.classList.remove('obsAni');
        setTimeout(()=>{
            audiobgm.pause();
        },100); // stops the BGM as soon as obstacle is hit
        audiodeath.play();//Gameover music will play !
        setTimeout(()=>{
            audiodeath.pause();
        },3000); // Game over music will stop after 3 seconds
    }

    else if(offsetX<120 && cross){ 
        score+=1;
        updateScore(score);// sets the new score
        cross=false;
        setTimeout(() => { //this will make sure that score can keep on going
            cross=true;
        }, 1000);
        /*since the player is doing well, now the game will become more challenging*/
        setTimeout(() => {
            duration = parseFloat(window.getComputedStyle(obstacle,null).getPropertyValue('animation-duration'));
            console.log('duration'+duration);
            newdur=duration - 0.2; //so the villain will get faster slowly
            obstacle.style.animationDuration= newdur+ 's';
            console.log("new duration",newdur);//the duration of the animation will keep decreasing so it will be more challenging
        }, 500);
    }

},10);

function updateScore(score){
    scorecount.innerHTML="Score : "+ score;
}

