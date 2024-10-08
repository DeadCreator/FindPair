const mainMenu = document.getElementById('main-menu');
const pauseMenu = document.getElementById('pause-menu')
const pauseButtons = [document.getElementById('header-pause-btn'), document.getElementById('menu-pause-btn')]

const field = document.querySelector('.field')

const soundBtn = document.getElementById('header-sound-btn')
const audio = document.getElementById('audio')
const menuClick = new Audio("media/sounds/menu-click.wav")
const soundOff = new Audio("media/sounds/sound-off.wav")
const soundStart = new Audio("media/sounds/start-game.wav")
const soundPause = new Audio("media/sounds/pause-game.wav")
let levelOstSrc = ""

const musicMenu = [
    "night-in-kyoto.mp3",
    "lazy-love-kem.mp3",
    "lateflights-pryces.mp3"
]

const musicLevels = [
    "vibin.mp3",
    "storm-clouds.mp3",
    "double-rainbow.mp3",
    "when-i-was-a-boy.mp3",
    "where-are-we.mp3",
]


const levels = {
    "1": {
        name: "Level 1",
        x: 2,
        y: 3,
        time: 30
    },
    "2": {
        name: "Level 2",
        x: 3,
        y: 4,
        time: 30
    },
    "3": {
        name: "Level 3",
        x: 4,
        y: 5,
        time: 60
    },
    "4": {
        name: "Level 4",
        x: 4,
        y: 6,
        time: 90
    },
    "5": {
        name: "Level 5",
        x: 5,
        y: 8,
        time: 150
    }
}

const levelSelBtn = document.getElementById('level-select')
const backToMainSubmenuBtn = document.getElementById('back-to-main-submenu')
const backToLevelSelectionBtn = document.getElementById('back-to-level-selection')
const levelBtns = document.querySelectorAll('.level-btn')
const mainSubmenu = document.querySelector('.main-submenu')
const levelSelection = document.querySelector('.level-selection')
const startGameMenu = document.querySelector('.start-game')

const startGameBtn = document.getElementById('start-game-btn')
const restartGameBtn = document.getElementById('restart-game-btn')

const backToMainPaused = document.getElementById('back-to-main-submenu-paused')

const musicShuffle = (curr) => {
    let next = musicMenu[Math.floor(Math.random() * musicMenu.length)]
    while (next === curr) {
        next = musicMenu[Math.floor(Math.random() * musicMenu.length)]
    }
    audio.src = `media/ost/${next}`
}

pauseButtons.forEach(btn => {
   btn.addEventListener('click', () => {
        pauseMenu.children[0].innerText = "Paused"
        pauseButtons[1].hidden = false
       const soundCheck = soundBtn.classList[0]
       soundCheck ? audio.play() : audio.pause()
        const result = pauseMenu.classList.toggle('show');
        if (result) {
            pauseButtons[0].style.backgroundImage = 'url("media/buttons/Play Button.svg")'
            stopTimer()
            audio.pause()
        } else {
            pauseButtons[0].style.backgroundImage = 'url("media/buttons/Pause Button-2.svg")'
            startTimer()
        }
        soundPause.play()
   })
})

soundBtn.addEventListener('click', () => {
    const result = soundBtn.classList.toggle('sound-on');
    if (result) {
        soundBtn.style.backgroundImage = 'url("media/buttons/Sound Off Button.svg")'
        audio.play()
    }
    else {
        soundBtn.style.backgroundImage = 'url("media/buttons/Sound On Button.svg")'
        audio.pause()
        soundOff.play()
    }
})

levelSelBtn.addEventListener('click', () => {
    levelSelection.style.display = 'flex'
    mainSubmenu.style.display = 'none'
    menuClick.play()
})

backToMainSubmenuBtn.addEventListener('click', () => {
    levelSelection.style.display = 'none'
    menuClick.play()
    setGame()
})

levelBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        currLevel = levels[parseInt(btn.classList[1])]
        x = currLevel.x
        y = currLevel.y
        levelOstSrc = `media/ost/${musicLevels[parseInt(btn.classList[1]) - 1]}`
        time = currLevel.time
        makeField(x, y)
        displayTimer(timeSpent, time)
        startGameMenu.style.display = 'flex'
        levelSelection.style.display = 'none'
        field.classList.add('scale-field')
        menuClick.play()
    })
})

backToLevelSelectionBtn.addEventListener('click', () => {
    levelSelection.style.display = 'flex'
    startGameMenu.style.display = 'none'
    field.classList.remove('scale-field')
    timerHUD.innerHTML = '--:--'
    menuClick.play()
})

const setGame = () => {
    pauseButtons[0].style.backgroundImage = 'url("media/buttons/Pause Button-2.svg")'
    timeSpent = 0
    timerHUD.innerHTML = "--:--"
    pauseButtons[0].hidden = true
    mainMenu.classList.add('show')
    pauseMenu.classList.remove('show')
    startGameMenu.style.display = 'none'
    mainSubmenu.style.display = 'flex'
    levelBtns.forEach(btn => {
        const stats = localStorage.getItem(`Level ${parseInt(btn.classList[1])}`)
        btn.innerHTML = `${btn.classList[1]} - ${stats} wins`
    })

    makeField(0, 0)
}

const startGame = () => {
    timeSpent = 0
    pauseButtons[0].hidden = false
    mainMenu.classList.remove('show')
    pauseMenu.classList.remove('show')
    pauseButtons[0].style.backgroundImage = 'url("media/buttons/Pause Button-2.svg")'
    makeField(x, y)
    startTimer()
    soundStart.play()
    audio.src = levelOstSrc
    audio.play()
}

startGameBtn.addEventListener('click', startGame)
restartGameBtn.addEventListener('click', startGame)

backToMainPaused.addEventListener('click', () => {
    setGame()
    field.classList.remove('scale-field')
    menuClick.play()
    musicShuffle(0)
    const soundCheck = soundBtn.classList[0]
    soundCheck ? audio.play() : audio.pause()
})


audio.onended = () => {
    musicShuffle(0)
    audio.play()
}
