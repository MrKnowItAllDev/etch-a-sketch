'use strict';

function main() {
    const board = document.querySelector('#board');
    const slider = document.querySelector('#slider');
    const resetBtn = document.querySelector('.reset');
    const activeGrids = [];

    generateBoard(board, slider, activeGrids);

    const sliderText = document.querySelector('.slider-output');
    sliderText.textContent = slider.value;

    slider.addEventListener('input', (e) => {
        e.target.value = sliderValues(board, e.target);
        sliderText.textContent = e.target.value;
        resetBoard(board, activeGrids);
    });

    resetBtn.addEventListener('click', (e) => {
        activeGrids.forEach((grid) => {
           reset(grid);
        });
    });
}

function generateBoard(board, slider, activeGrids) {
    let gridWidth = Math.floor(board.offsetWidth / slider.value);
    let gridHeight = Math.floor(board.offsetHeight / slider.value);
    console.log(gridWidth);

    // replaces the need for a nested loop, as nested loops run (i * j) times,
    // or in this case, boardwidth * boardheight, which can be captured in this variable
    let iterations = Math.floor((board.offsetWidth / gridWidth) * (board.offsetHeight / gridHeight));
    console.log(iterations);

    for (let i = 0; i < iterations; i++) {
        const grid = document.createElement('div');
        grid.setAttribute(`style`, `border: 1px solid #000`);
        grid.setAttribute(`id`, `grid-${i}`);

        grid.style.width = `${gridWidth}px`;
        grid.style.height = `${gridHeight}px`;

        board.appendChild(grid);
    }

    const grids = Array.from(board.querySelectorAll('div'));

    for (const grid of grids) {
        grid.addEventListener('mouseenter', (e) => {
            draw(grid, activeGrids);
        });
    }
}

function draw(grid, activeGrids) {
    grid.style.backgroundColor = `#000`;
    activeGrids.push(grid);
}

function reset(grid) { grid.style.backgroundColor = `#fff`; }

function sliderValues(board, slider) {
    const values = new Array();
    const boardWidth = document.querySelector('#board').offsetWidth;
    for (let j = 8; j < boardWidth; j++) {
        if (board.offsetWidth % j === 0)
            values.push(j);
    }

    let curr = slider.value;
    return values.reduce((a, b) => {
        return Math.abs(a - curr) < Math.abs(b - curr) ? a : b;
    });
}

function resetBoard(board, activeGrids) {
    board.querySelectorAll('div').forEach((grid) => {
        grid.parentElement.removeChild(grid);
    });
    generateBoard(board, slider, activeGrids);
}

function darken(grid, shade) {

}

main();
