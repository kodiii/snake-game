const grid = document.querySelector('.grid')
const startBtn = document.getElementById('start')
const score = document.getElementById('score')
let squares = []

function createGrid() {
    //create elements
    //create 100 of these elements
    for (let i = 0; i < 100; i++) {
        // console.log(i)
        const square = document.createElement('div')
        //add styling to the element
        square.classList.add('square')
        //put the element into our grid
        grid.append(square)
        //push squares into squares array
        squares.push(square)
        // console.log(squares)
    }
}
createGrid()