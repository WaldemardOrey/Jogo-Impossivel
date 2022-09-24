const screens = document.querySelectorAll('.screen')
const chooseBtn = document.querySelectorAll('.choose-insect-btn')
const game_container = document.querySelector('.game-container')

const startBtn = document.getElementById('start-btn')
const timeEl = document.querySelector('#time')
const scoreEl = document.querySelector('#score')
const messageEl = document.querySelector('#message')


let seconds = 0
let score = 0
let selected_insect = {}

startBtn.addEventListener('click', ()=> screens[0].classList.add('up'))
chooseBtn.forEach(btn => {
    btn.addEventListener('click', ()=>
    {
        const img = btn.querySelector('img')
        const src = img.getAttribute('src')
        const alt = img.getAttribute('alt')
        selected_insect ={ src, alt}
        screens[1].classList.add('up')
        setTimeout(createInsect, 1000)
        startGame()
    })
})

let increTime
function startGame()
{
   increTime = setInterval(increaseTime, 1000)
}

function increaseTime()
{
    let m = Math.floor(seconds/60)
    let s = seconds % 60
    m = m < 10 ? `0${m}` : m
    s = s < 10 ? `0${s}` : s
    timeEl.innerHTML = `${m}:${s}`
    seconds++
}


    function createInsect()
    {
        const insect = document.createElement('div')
        insect.classList.add('insect')
        const { x, y }= getRandomLocation()
        insect.style.top = `${y}px`
        insect.style.left = `${x}px`
        insect.innerHTML = `<img src="${selected_insect.src}" alt="${selected_insect.alt}" style="transform: rotate(${Math.random()*360}deg)" </img>`

        insect.addEventListener('click', catchInsect)

        game_container.appendChild(insect)

    }


    function catchInsect()
    {
        increaseScore()
        this.classList.add('caught')
        setTimeout(() => this.remove(), 2000)
        addInsects()
    }


    function addInsects()
    {
        setTimeout(createInsect, 1000)
        setTimeout(createInsect, 1500)
    }


    function increaseScore()
    {
        score++
        if(score === 15){
            messageEl.classList.add('visible')
        }
        scoreEl.innerHTML = `${score*50}`
        if(score === 20)
        {
            messageEl.classList.remove('visible')
        }
    }



    function getRandomLocation()
    {
        const width = window.innerWidth
        const height = window.innerHeight

        const x = Math.random() * (width - 150) + 100
        const y = Math.random() * (height - 150) + 100
        return {x, y}

    }



    function restart()
    {
        screens.forEach((screen) => screen.classList.remove('up'))

 seconds = 0
 score = 0
 selected_insect = {}
 clearInterval(increTime)

 game_container.querySelectorAll('.insect').forEach((e)=> e.remove())


    }



// screens[0].classList.add('up')
