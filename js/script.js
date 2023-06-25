function minToSec(min){
    return min*60
}

let work = true
let sessionTime = minToSec(25)
let breakTime = minToSec(5)
let currentSessionTime = sessionTime
let currentBreakTime = breakTime
let isRunning = false
let timer

const timerTitle = document.getElementById('timer-title')
timerTitle.innerHTML = formatTime(sessionTime)
const pauseBtn = document.getElementById('pause')
const container = document.getElementById('container')
const period = document.getElementById('period')

function handleClick(){
    isRunning = !isRunning
    if(isRunning){  // run the timer
        pauseBtn.innerHTML = "PAUSE"
        pressButton()
        if(work){startWork()}
        else {startBreak()}
    }
    else{   // pause the timer
        clearInterval(timer)
        unpressButton()
        pauseBtn.innerHTML = "START"
    }
}

function startWork(){
    timer = setInterval(() => {
        if(currentSessionTime==0) {
            work = false
            restScreen()
            // call resetTimer() after rest finish
        }
        else{
            currentSessionTime--
            timerTitle.innerHTML = formatTime(currentSessionTime)
        }
    }, 1000);
}

function restScreen(){
    redToGreen()
    unpressButton()
    period.innerHTML = "Time for a Break!"
    timerTitle.innerHTML = formatTime(currentBreakTime)
    pauseBtn.innerHTML = "START"
}

function startBreak(){
    timer = setInterval(() => {
        if(currentBreakTime==0) {
            isRunning = false
            clearInterval(timer)
            resetTimer()
            // call resetTimer() after rest finish
        }
        else{
            currentBreakTime--
            timerTitle.innerHTML = formatTime(currentBreakTime)
        }
    }, 1000);
}

function resetTimer(){
    greenToRed()
    unpressButton()
    clearInterval(timer)
    work = true
    pauseBtn.innerHTML = "START"
    period.innerHTML = "Get to Work!"
    timerTitle.innerHTML = formatTime(sessionTime) 
    currentSessionTime = sessionTime
    currentBreakTime = breakTime
}

function redToGreen(){
    container.classList.remove('bg-red')
    container.classList.add('bg-green')
    pauseBtn.classList.remove('text-red')
    pauseBtn.classList.add('text-green')
}

function greenToRed(){
    container.classList.remove('bg-green')
    container.classList.add('bg-red')
    pauseBtn.classList.remove('text-green')
    pauseBtn.classList.add('text-red')
}

function formatTime(sec){
    let minutes = Math.floor(sec/60)
    let seconds = sec-(60*minutes)
    if(minutes<10) {minutes = "0"+minutes}
    if(seconds<10) {seconds = "0"+seconds}
    return minutes + ":" + seconds
}

function unpressButton(){
    pauseBtn.classList.remove('btn-pressed')
    pauseBtn.classList.add('btn-not-pressed')
}

function pressButton(){
    pauseBtn.classList.remove('btn-not-pressed')
    pauseBtn.classList.add('btn-pressed')
}