// Periods
// work
// shortBreak
// longBreak

function minToSec(min) {
    return min * 60
}
let sessionTime = minToSec(0.05)
let breakTime = minToSec(0.05)
let currentSessionTime = sessionTime
let currentBreakTime = breakTime
let isRunning = false
const clickSound = new Audio('../sound/click.mp3')
let timer

const timerTitle = document.getElementById('timer-title')
timerTitle.innerHTML = formatTime(sessionTime)
const pauseBtn = document.getElementById('pause')
const container = document.getElementById('container')
const period = document.getElementById('period')

const workTab = document.getElementById('workTab')
const shortBreakTab = document.getElementById('shortBreakTab')
let currentScreen = "work"
workTab.classList.add('chosenScreen')


function handleClick() {
    isRunning = !isRunning
    if (isRunning) {  // run the timer
        pauseBtn.innerHTML = "PAUSE"
        pressButton()
        // if (work) { startWork() }
        // else { startBreak() }
        switch(currentScreen){
            case "work":
                startWork()
                break
            case "shortBreak":
                startBreak()
                break
        }

    }
    else {   // pause the timer
        pauseBtn.innerHTML = "START"
        unpressButton()
        clearInterval(timer)
    }
}

function startWork() {
    timer = setInterval(() => {
        if (currentSessionTime == 0) {
            isRunning = false
            unpressButton()
            currentScreen = "shortBreak"
            breakScreen()
            clearInterval(timer)
        }
        else {
            currentSessionTime--
            timerTitle.innerHTML = formatTime(currentSessionTime)
        }
    }, 1000);
}

function breakScreen() {
    redToPurple()
    period.innerHTML = "Time for a Break!"
    timerTitle.innerHTML = formatTime(currentBreakTime)
    pauseBtn.innerHTML = "START"
}

function workScreen() {
    purpleToRed()
    period.innerHTML = "Get to Work!"
    timerTitle.innerHTML = formatTime(currentSessionTime)
    pauseBtn.innerHTML = "START"
}

function startBreak() {
    timer = setInterval(() => {
        if (currentBreakTime == 0) {
            currentScreen = "work"
            workScreen()
            resetTimer()            
        }
        else {
            currentBreakTime--
            timerTitle.innerHTML = formatTime(currentBreakTime)
        }
    }, 1000);
}

function resetTimer() {
    if (isRunning) {
        isRunning = false
        unpressButton()
        pauseBtn.innerHTML = "START"
    }
    clearInterval(timer)
    currentSessionTime = sessionTime;
    currentBreakTime = breakTime;
    switch(currentScreen){
        case "work":
            timerTitle.innerHTML = formatTime(currentSessionTime)
            break
        case "shortBreak":
            timerTitle.innerHTML = formatTime(currentBreakTime)
            break
    }
}

function redToPurple() {
    container.classList.remove('bg-red')
    container.classList.add('bg-purple')
    pauseBtn.classList.remove('text-red')
    pauseBtn.classList.add('text-purple')
}

function purpleToRed() {
    container.classList.remove('bg-purple')
    container.classList.add('bg-red')
    pauseBtn.classList.remove('text-purple')
    pauseBtn.classList.add('text-red')
}

function formatTime(sec) {
    let minutes = Math.floor(sec / 60)
    let seconds = sec - (60 * minutes)
    if (minutes < 10) { minutes = "0" + minutes }
    if (seconds < 10) { seconds = "0" + seconds }
    return minutes + ":" + seconds
}

function unpressButton() {
    clickSound.play()
    pauseBtn.classList.remove('btn-pressed')
    pauseBtn.classList.add('btn-not-pressed')
}

function pressButton() {
    clickSound.play()
    pauseBtn.classList.remove('btn-not-pressed')
    pauseBtn.classList.add('btn-pressed')
}