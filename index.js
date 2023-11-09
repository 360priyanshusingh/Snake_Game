let   inputDr={x:0,y:0};
const sound=new Audio('ps.mp3');
const movesound= new Audio('movesound.mp3');
const gameover= new Audio('gameover.mp3');
let speed=5;
let lasttime=0;
let Snakearr=[{x:13,y:15}];
let score=0;
food={x:6,y:7};
movesound.playbackRate=10.0;
gameover.playbackRate=4.0;
// function game


function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime - lasttime)/1000 < 1/speed){
        return ;
    }

    lasttime=ctime;
    gameEngine();
}
function  check(Snakearr){
    let a=2;
    let b=16;
    food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())};

    for(let i=0;i<Snakearr.length;i++){
        if(Snakearr[i].x === food.x && Snakearr[i].y === food.y){
            check(Snakearr);
        }
    }
    
}
function iscolied(Snakearr){
     
    for(let i=1;i<Snakearr.length;i++){
        if(Snakearr[i].x === Snakearr[0].x && Snakearr[i].y === Snakearr[0].y){
            return true;
        }
    }

    if(Snakearr[0].x<=0 || Snakearr[0].y<=0 || Snakearr[0].x>=18 || Snakearr[0].y>=18 ){
        return true;
    }

    return false;
}


function gameEngine(){
    // part 1 update the snake
    
    if(iscolied(Snakearr)){
       
        gameover.play();
        sound.pause();
        // movesound.pause();
        inputDr={x:0,y:0};
        alert("Game over ! Press to play  again");
        gameover.pause();
        Snakearr=[ {x:13,y:6} ];
        sound.play();
        score=0;
        scoreBox.innerHTML= "Score :" + score;
        speed=5;
    }

    // if you have eten the food incremet the snake and generate the food


    if(Snakearr[0].x === food.x && Snakearr[0].y === food.y){
        sound.play();
        score+=1;
        
        scoreBox.innerHTML= "Score :" + score;
        if(hiscoreval<score){
            hiscoreval=score;
            localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML= "HiScore :" + hiscoreval;
        }
        Snakearr.unshift({x:Snakearr[0].x+inputDr.x , y:Snakearr[0].y+inputDr.y} );
       
        check(Snakearr);
        speed++;
    }
    // move the snake game 

    for(let i=Snakearr.length-2;i>=0;i--){
        Snakearr[i+1]={...Snakearr[i]};
    }

    Snakearr[0].x+=inputDr.x;
    Snakearr[0].y+=inputDr.y;

    // part 2 dispaly the snake

    board.innerHTML="";
    Snakearr.forEach((e,index)=>{
         snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    // display the foodElement for snake

    let foodElement=document.createElement('div');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}



// logic game 

let hiscore = localStorage.getItem("hiscore");
// let hiscoreBox = document.getElementById("hiscoreBox"); // Assuming hiscoreBox is the element to display the hiscore

if (hiscore === null) {
     var hiscoreval = 0;
    
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval)); // Store the actual value of hiscoreval
}else {
     hiscoreval = JSON.parse(hiscore); // Parse the retrieved value from localStorage
     hiscoreBox.innerHTML = "HiScore: " + hiscoreval; // Display the retrieved hiscore value
}

window.requestAnimationFrame(main);

window.addEventListener('keydown',e=>{
    inputDr={x:0,y:1};
    movesound.play();

    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp");
            inputDr.x=0;
            inputDr.y=-1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDr.x=0;
            inputDr.y=1;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDr.x=1;
            inputDr.y=0;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDr.x=-1;
            inputDr.y=0;
            break; 
        default:
            break ;     
    }

});
