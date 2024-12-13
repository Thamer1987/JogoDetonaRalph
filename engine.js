const state = {

    view: {

        square: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#timeLeft"),
        scoreLife: document.querySelector("#scoreLife"),

    },


    values: {
        timerId: null,
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 100,
        countDownTimerId: setInterval(countDown, 1000),

    },
};

function countDown(){
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;
    if (state.values.currentTime < 1) {
        alert("Gamer Over!!! Seus pontos: " + state.values.result);
        clearInterval(state.values.countDownTimerId);
        clearInterval(state.values.timerId);
    }

};

function playSound(){
    let audio = new Audio("./audios/hit.m4a");
    audio.volume= 0.2;
    audio.pĺay();
}


function randomSquare(){
    state.view.square.forEach((square)=> {
        square.classList.remove("enemy")
    });
    let randomNumber = Math.floor(Math.random()*9);
    let randomSquare = state.view.square[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function moveEnemy(){
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity)
};

function addListenerHitBox(){
    state.view.square.forEach((square)=>{
        square.addEventListener("mousedown",()=> {
            if(square.id === state.values.hitPosition){
                state.values.result++;
                state.view.scoreLife.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound();
            }
        })

    })




};




function init(){ 
    countDown();
    moveEnemy();
    addListenerHitBox();
    
}

init();