const x = 4
const y = 6

const delay = ms => new Promise(res => setTimeout(res, ms))

const checkMatched = () => {
    const matchedCards = document.querySelectorAll(".matched")
    if (matchedCards.length === x * y) {
        console.log("GameOver!!")
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
            console.log("Great!")
            activeCards[0].classList.add('matched')
            activeCards[1].classList.add('matched')

            await delay(500)

            activeCards[0].removeEventListener("click", lol)
            activeCards[1].removeEventListener("click", lol)
        } else {
            console.log("Lose!")
        }
        activeCards[0].classList.remove('active')
        activeCards[1].classList.remove('active')

        checkMatched()
    }
}
const makeField = (x, y) => {
    const field = document.querySelector('.field')

    while (field.hasChildNodes()) {
        field.removeChild(field.firstChild)
    }

    const size = 72 / x
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

            back.innerHTML = `${num}`

            card.classList.add(`pair-${num}`)
            card.addEventListener("click", lol)

            card.appendChild(front)
            card.appendChild(back)
            field.appendChild(card)
        }
    }
}

window.onload = () => {makeField(x, y)}

