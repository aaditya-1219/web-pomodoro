// Periods
// work
// shortBreak
// longBreak - after every 4 work sessions
function minToSec(min) {
    return min * 60
}
let sessionTime = minToSec(25)
let breakTime = minToSec(5)
let longBreakTime = minToSec(15)
let currentSessionTime = sessionTime
let currentBreakTime = breakTime
let currentLongBreakTime = longBreakTime
let timer
const clickSound = new Audio('../sound/click.mp3')
const notifSound = new Audio('../sound/notification.mp3')
const timerTitle = document.getElementById('timer-title')
const pauseBtn = document.getElementById('pause')
const container = document.getElementById('container')
const period = document.getElementById('period')
const workTab = document.getElementById('workTab')
const breakTab = document.getElementById('breakTab')
const longBreakTab = document.getElementById('longBreakTab')
const sessionCounterElement = document.getElementById('sessionCounter')
const tabs = [workTab, breakTab, longBreakTab]
const bgClasses = ['bg-red', 'bg-purple', 'bg-blue']
const textClasses = ['text-red', 'text-purple', 'text-blue']
const settingsMenu = document.getElementById('settings-menu')
const darkLayer = document.getElementById('dark-layer')
let currentTab = workTab
workTab.classList.add('chosenTab')
let sessionCounter = 0
const workSessionField = document.getElementById('workSessionField')
const shortBreakField = document.getElementById('shortBreakField')
const longBreakField = document.getElementById('longBreakField')
let isRunning = false

let settingsObj = {
    session: minToSec(25),
    break: minToSec(5),
    longBreak: minToSec(15)
}
retrieveData()
timerTitle.innerHTML = formatTime(sessionTime)
workSessionField.value = sessionTime / 60
shortBreakField.value = breakTime / 60
longBreakField.value = longBreakTime / 60

function saveData() {
    localStorage.setItem("pomodoroSettings", JSON.stringify(settingsObj))
}

function retrieveData() {
    if(localStorage.getItem("pomodoroSettings")){
        settingsObj = JSON.parse(localStorage.getItem("pomodoroSettings"))
        sessionTime = settingsObj.session
        breakTime = settingsObj.break
        longBreakTime = settingsObj.longBreak
    }
}

function changeTime() {
    sessionTime = minToSec(workSessionField.value)    // sessionTime stores in seconds
    currentSessionTime = sessionTime
    settingsObj.session = sessionTime
    breakTime = minToSec(shortBreakField.value)    // breakTime stores in seconds
    currentBreakTime = breakTime
    settingsObj.break = breakTime
    longBreakTime = minToSec(longBreakField.value)    // longBreakTime stores in seconds
    currentLongBreakTime = longBreakTime
    settingsObj.longBreak = longBreakTime
    saveData()
    switch (currentTab) {
        case workTab:
            workScreen()
            break
        case breakTab:
            breakScreen()
            break
        case longBreakTab:
            longBreakScreen()
            break
    }
}

tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
        switch (e.target) {
            case workTab:
                resetTimer()
                workScreen()
                break
            case breakTab:
                resetTimer()
                breakScreen()
                break
            case longBreakTab:
                resetTimer()
                longBreakScreen()
                break
        }
    })
})

function handleClick() {
    isRunning = !isRunning
    if (isRunning) {  // run the timer
        pauseBtn.innerHTML = "PAUSE"
        pressButton()
        switch (currentTab) {
            case workTab:
                startWork()
                break
            case breakTab:
                startBreak()
                break
            case longBreakTab:
                startLongBreak()
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
            notifSound.play()
            isRunning = false
            unpressButton()
            clearInterval(timer)
            sessionCounterElement.innerHTML = "Sessions Completed - " + (++sessionCounter)
            if (sessionCounter % 4 == 0) {
                currentTab = longBreakTab
                longBreakScreen()
            }
            else {
                currentTab = breakTab
                breakScreen()
            }
        }
        else {
            currentSessionTime--
            timerTitle.innerHTML = formatTime(currentSessionTime)
        }
    }, 1000);
}

function startBreak() {
    timer = setInterval(() => {
        if (currentBreakTime == 0) {
            notifSound.play()
            isRunning = false
            currentTab = workTab
            unpressButton()
            workScreen()
            resetTimer()
        }
        else {
            currentBreakTime--
            timerTitle.innerHTML = formatTime(currentBreakTime)
        }
    }, 1000);
}

function startLongBreak() {
    timer = setInterval(() => {
        if (currentLongBreakTime == 0) {
            notifSound.play()
            isRunning = false
            currentTab = workTab
            unpressButton()
            workScreen()
            resetTimer()
        }
        else {
            currentLongBreakTime--
            timerTitle.innerHTML = formatTime(currentLongBreakTime)
        }
    }, 1000);
}

function removeSelectionAll() {
    tabs.forEach(tab => {
        tab.classList.remove('chosenTab')
    })
}

function chooseTab(tab) {
    removeSelectionAll()
    tab.classList.add('chosenTab')
    currentTab = tab
}

function breakScreen() {
    chooseTab(breakTab)
    changeToPurple()
    period.innerHTML = "Time for a Break!"
    timerTitle.innerHTML = formatTime(currentBreakTime)
    pauseBtn.innerHTML = "START"
}

function longBreakScreen() {
    chooseTab(longBreakTab)
    changeToBlue()
    period.innerHTML = "Time for a Break!"
    timerTitle.innerHTML = formatTime(currentLongBreakTime)
    pauseBtn.innerHTML = "START"
}

function workScreen() {
    chooseTab(workTab)
    changeToRed()
    period.innerHTML = "Get to Work!"
    timerTitle.innerHTML = formatTime(currentSessionTime)
    pauseBtn.innerHTML = "START"
}

function resetTimer() {
    if (isRunning) {
        isRunning = false
        unpressButton()
        pauseBtn.innerHTML = "START"
    }
    clearInterval(timer)
    currentSessionTime = sessionTime
    currentBreakTime = breakTime
    currentLongBreakTime = longBreakTime
    switch (currentTab) {
        case workTab:
            timerTitle.innerHTML = formatTime(currentSessionTime)
            break
        case breakTab:
            timerTitle.innerHTML = formatTime(currentBreakTime)
            break
        case longBreakTab:
            timerTitle.innerHTML = formatTime(currentLongBreakTime)
            break
    }
}

function openSettings() {
    settingsMenu.classList.remove('hide')
    darkLayer.style.zIndex = 0
}

function closeSettings() {
    settingsMenu.classList.add('hide')
    darkLayer.style.zIndex = -1
}

function changeToPurple() {
    removeBg()
    container.classList.add('bg-purple')
    removeTextColour()
    pauseBtn.classList.add('text-purple')
}

function changeToRed() {
    removeBg()
    container.classList.add('bg-red')
    removeTextColour()
    pauseBtn.classList.add('text-red')
}

function changeToBlue() {
    removeBg()
    container.classList.add('bg-blue')
    removeTextColour()
    pauseBtn.classList.add('text-blue')
}

function removeBg() {
    bgClasses.forEach(colourClass => {
        container.classList.remove(colourClass)
    })
}

function removeTextColour() {
    textClasses.forEach(colourClass => {
        pauseBtn.classList.remove(colourClass)
    })
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
