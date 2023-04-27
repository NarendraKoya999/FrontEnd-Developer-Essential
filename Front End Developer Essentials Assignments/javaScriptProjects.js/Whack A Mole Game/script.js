let scoreH2 = document.getElementById('score');
let timeLeftH2 = document.getElementById('timeLeft');
let startNewGameButton = document.getElementById('startNewGame');
let pauseGameButton = document.getElementById('pauseGame');
let grid = document.getElementsByClassName('grid')[0];
let squares = document.querySelectorAll('.square');
let gameMusic = new Audio('Assets/magic-in-the-air-43177.mp3');
let hitMusic = new Audio('Assets/ping-82822.mp3');


let score = 0;
let timeLeft = 60;
let hitPosition = null;
let timerId = null;
let randomMoleId = null;

// Randomly place mole
function randomMole(){
    squares.forEach(square => {
        square.classList.remove('mole');
    })

    let randomSquare = squares[Math.floor(Math.random()*squares.length)];
    randomSquare.classList.add('mole');
    hitPosition = randomSquare.id;
}
//Count Down Feature
function countDown(){
    timeLeft--;
    timeLeftH2.innerHTML = `Time Left: ${timeLeft}`;

    if(timeLeft === 0){
        clearInterval(timerId);
        clearInterval(randomMoleId);
        grid.style.display = 'none';
    }
}
randomMole();
//Start Game Feature
function startGame(){
    score = 0;
    timeLeft = 60;

    scoreH2.innerHTML = 'Your Score: 0';
    timeLeft.innerHTML = 'Time Left: 60';
    grid.style.display = 'flex';
    pauseGameButton.style.display = 'inline-block'
    pauseGameButton.innerHTML = 'Pause';
    gameMusic.play();
    // callback function
    // setInterval call function at regular interval
    timerId = setInterval(randomMole, 1000);
    randomMoleId = setInterval(countDown, 1000);
}
//Pause and Resume the game Feature
function pauseResumeGame(){
    if(pauseGameButton.textContent === 'Pause'){
        gameMusic.pause();
        clearInterval(timerId);
        clearInterval(randomMoleId);
        timerId = null;
        randomMoleId = null;
        pauseGameButton.textContent = 'Resume';
    }else{
        gameMusic.play();
        timerId = setInterval(randomMole, 1000);
        randomMoleId = setInterval(countDown, 1000);
        pauseGameButton.textContent = 'Pause';
    }
}
//Actions performed basis on Mouse Down Event Listener
squares.forEach(square => {
    square.addEventListener('mousedown', () => {
        if(timerId !== null){
            if(square.id === hitPosition){
                hitMusic.play();
                setTimeout(() => {hitMusic.pause()}, 1000);
                score++;
                scoreH2.innerHTML = `Your Score ${score}`;
                hitPosition = null;
            }
        }
    })
})
startNewGameButton.addEventListener('click', startGame);
pauseGameButton.addEventListener('click', pauseResumeGame);