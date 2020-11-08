const grid = document.querySelector('.grid')
const startBtn = document.getElementById('start')
const rulesBtn = document.getElementById('rules')
const scoreDisplay = document.getElementById('score')
const looseAudio = document.getElementById('looseAudio')
const appleByte = document.getElementById('appleByte')
const modal = document.getElementById('modal')
const closeModal = document.getElementById('close-modal')

let squares = []
let currentSnake = [2, 1, 0]
let direction = 1
const width = 10
let appleIndex = 0
let score = 0
let intervalTime = 700
let speed = 0.9
let timerId = 0

// define grid layout
function createGrid() {
    //create elements
    //create 100 of these elements
    for (let i = 0; i < width * width; i++) {
        const square = document.createElement('div')
        //add styling to the element
        square.classList.add('square')
        //put the element into our grid
        grid.append(square)
        //push squares into squares array
        squares.push(square)
    }
}
createGrid()

currentSnake.forEach(index => squares[index].classList.add('snake'))

// add head to the snake
function snakeHead() {
    squares[currentSnake[0]].textContent = '⚫'
    squares[currentSnake[0]].style.fontSize = '10px'
    squares[currentSnake[0]].style.textAlign = 'center'
}
snakeHead()

// remove the snake head
function removeSnakeHead() {
    squares[currentSnake[0]].textContent = ''
}

// start and reset the game 
function startGame() {
    // close modal rules if open
    modal.style.display = 'none'
    // remove the snake
    currentSnake.forEach(index => squares[index].classList.remove('snake'))
    // remove snake head
    removeSnakeHead()
    // remove the apple
    squares[appleIndex].classList.remove('apple')
    squares[appleIndex].textContent = ''
    clearInterval(timerId)
    currentSnake = [2, 1, 0]
    score = 0
    // re add new score to browser
    scoreDisplay.textContent = score
    direction = 1
    intervalTime = 1000
    generateApple()
    // rea dd the class of snake to our new currentSnake
    currentSnake.forEach(index => squares[index].classList.add('snake'))
    // add snake head
    snakeHead()
    timerId = setInterval(move, intervalTime)
}

function move() {
    if (
        (currentSnake[0] + width >= width * width && direction === width) || //if snake has hit bottom
        (currentSnake[0] % width === width - 1 && direction === 1) || //if snake has hit right wall
        (currentSnake[0] % width === 0 && direction === -1) || //if snake has hit left wall
        (currentSnake[0] - width < 0 && direction === -width) || //if snake has hit top
        squares[currentSnake[0] + direction].classList.contains('snake')
    ) {
        // play audio when hit the walls
        looseAudio.play()
        return clearInterval(timerId)
    }

    //remove last element from our currentSnake array
    const tail = currentSnake.pop()
    //remove styling from last element
    squares[tail].classList.remove('snake')
    //remove snake head
    removeSnakeHead()
    //add sqaure in direction we are heading
    currentSnake.unshift(currentSnake[0] + direction)
    //add styling so we can see it
    squares[currentSnake[0]].classList.add('snake')
    snakeHead()

    //deal with snake head getting the apple
    if (squares[currentSnake[0]].classList.contains('apple')) {
        // play sound when apple is eated
        appleByte.play()
        // remove the class of apple and content
        squares[currentSnake[0]].classList.remove('apple')
        squares[appleIndex].textContent = ''
        // grow our snake by adding class of snake to it
        squares[tail].classList.add('snake')
        // grow our snake array
        currentSnake.push(tail)
        // generate a new apple
        generateApple()
        // add snake head
        snakeHead()
        // add one to the score
        score++
        //display our score
        scoreDisplay.textContent = score
        // reset the timer
        clearInterval(timerId)
        // speed up our snake
        intervalTime = intervalTime * speed
        timerId = setInterval(move, intervalTime)
    }
}

// generate a new random apple after been eaten by the snake
function generateApple() {
    do {
        appleIndex = Math.floor(Math.random() * squares.length)
    } while (squares[appleIndex].classList.contains('snake')) {
        squares[appleIndex].classList.add('apple')
        squares[appleIndex].textContent = '🍎'
        squares[appleIndex].style.fontSize = '13px'
        squares[appleIndex].style.textAlign = 'center'
    }
}

function control(e) {
    // 39 is right arrow
    // 38 is for the up arrow
    // 37 is for the left arrow
    // 40 is for the down arrow
    if (e.which === 39) {
        direction = +1
    } else if (e.which === 38) {
        direction = -width
    } else if (e.which === 37) {
        direction = -1
    } else if (e.which === 40) {
        direction = +width
    }
}
document.addEventListener('keydown', control)

startBtn.addEventListener('click', startGame)

// event to open modal rules window to display rules
function displayModalRules() {
    // stop game
    clearInterval(timerId)
    // display the modal rules
    modal.style.display = 'block'
    // event to close the modal rules
    closeModal.addEventListener('click', function () {
        modal.style.display = 'none'
    })
}
rulesBtn.addEventListener('click', displayModalRules)