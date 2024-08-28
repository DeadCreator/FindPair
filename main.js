let time = 61
let x = 4
let y = 6
let currLevel = {}
const delay = ms => new Promise(res => setTimeout(res, ms))
const timerHUD = document.getElementById('timer')

const checkMatched = () => {
    const matchedCards = document.querySelectorAll(".matched")
    if (matchedCards.length === x * y) {
        stopTimer()
        pauseButtons[0].hidden = true
        let currLevelStats = localStorage.getItem(`${currLevel.name}`)
        if (currLevelStats) {
            localStorage.removeItem(`${currLevel.name}`)
            localStorage.setItem(`${currLevel.name}`, JSON.stringify(parseInt(currLevelStats) + 1))
        } else {
            localStorage.setItem(`${currLevel.name}`, JSON.stringify(1))
        }
        pauseMenu.classList.add('show')
        pauseButtons[1].hidden = true
        timeSpent = 0
        pauseMenu.children[0].innerHTML = "Solved!!"
    }
}
async function lol() {
    let activeCards = document.querySelectorAll('.active')
    if (activeCards.length < 2) {
        this.classList.add('active')
        activeCards = document.querySelectorAll('.active')

        await delay(500)
    }
    if (activeCards.length === 2) {

        if (activeCards[0].classList[1] === activeCards[1].classList[1]) {
            activeCards[0].classList.add('matched')
            activeCards[1].classList.add('matched')

            await delay(500)

            activeCards[0].removeEventListener("click", lol)
            activeCards[1].removeEventListener("click", lol)
        }
        activeCards[0].classList.remove('active')
        activeCards[1].classList.remove('active')

        checkMatched()
    }
}
const makeField = (x, y) => {
    const imgUrl = "media/cards/card-"
    while (field.hasChildNodes()) {
        field.removeChild(field.firstChild)
    }

    const size = 80 / x
    const pairs = []
    for (let k = 0; k < x * y / 2; k++) {
        pairs[k] = 2
    }

    for (let i = 0; i < x; i++) {
        for (let j = 0; j < y; j++) {
            const card = document.createElement('div')
            const front = document.createElement('div')
            const back = document.createElement('div')

            card.style.width = `${size}vw`
            card.style.height = `${size}vw`
            card.classList.add('card')

            let num = false
            while (!num) {
                let k = Math.ceil(Math.random() * pairs.length) - 1
                if (pairs[k] !== 0) {
                    pairs[k]--
                    num = k + 1
                }
            }

            front.style.backgroundImage = `url("${imgUrl + num}.png")`

            card.classList.add(`pair-${num}`)
            card.addEventListener("click", lol)

            card.appendChild(back)
            card.appendChild(front)
            field.appendChild(card)
        }
    }
}

let timeSpent = 0
let t = null

const displayTimer = (timeSpent, time) => {
    const mins = Math.floor((time - timeSpent) / 60)
    const secs = (time - timeSpent) % 60
    mins < 10 ?
        timerHUD.innerHTML = "0" + mins :
        timerHUD.innerHTML = "" + mins
    secs < 10 ?
        timerHUD.innerHTML += ":0" + secs :
        timerHUD.innerHTML += ":" + secs
}

const startTimer = () => {
    if (timeSpent !== time) {
        timeSpent++
        displayTimer(timeSpent, time)
        t = setTimeout(startTimer, 1000)
    } else {
        pauseMenu.classList.add('show')
        timeSpent = 0
        pauseButtons[1].hidden = true
        pauseMenu.children[0].innerHTML = "Failed!!"
    }
}
const stopTimer = () => {
    clearTimeout(t)
}

window.onload = () => {
    musicShuffle(0)
    setGame()
}



//How to add difficulty to the game:
// 1) Add timer (for example, 1 minute)
// 2) Set a restricted amount of touches (more than minimal, but restricted)
// 3) Different amount of cards

