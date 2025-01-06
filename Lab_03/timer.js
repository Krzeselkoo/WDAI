let minutes = 0;
let seconds = 0;
let globalnie = null;
let stopped = true;

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
    stopped = false;
}

function stop(){
    clearInterval(globalnie);
    startButton.disabled = false;
    stopped = true;
}

function reset(){
    if(stopped){
        seconds = 0;
        minutes = 0;
        timerText.textContent = `00s`;
        startButton.disabled = false;
    }
    else{
        clearInterval(globalnie);
        startButton.disabled = true;
        seconds = 0;
        minutes = 0;
        timerText.textContent = `00s`;
        globalnie = setInterval(timer, 1000);
    }
    
}