let minutes = 0;
let seconds = 0;
let globalnie = null;


let timerText = document.querySelector("#time");
let startButton = document.querySelector("#start");
let stopButton = document.querySelector("#stop");
let restartButton = document.querySelector("#restart");

function timer() {
    seconds++; 
    
    if(seconds > 59){
        seconds = 0;
        minutes ++;
    }

    if(seconds < 10){
        if(minutes == 0){
            timerText.textContent = `0${seconds}s`
        }else{
            timerText.textContent = `${minutes}min 0${seconds}s`
        }
    }
    else{
        if(minutes == 0){
            timerText.textContent = `${seconds}s`
        }else{
            timerText.textContent = `${minutes}min ${seconds}s`
        }
    }
}



function start(){
    globalnie = setInterval(timer, 1000);
    startButton.disabled = true;
}

function stop(){
    clearInterval(globalnie);
    startButton.disabled = false;
}

function reset(){
    clearInterval(globalnie);
    startButton.disabled = true;
    seconds = 0;
    minutes = 0;
    timerText.textContent = `0s`;
    globalnie = setInterval(timer, 1000);
}