const mainTitle = document.querySelector('#title');
let curValue = 0;

//Button Actions of Increment, Decrement, Reset
const btnDecrement = document.querySelector('#decrement');
const btnReset = document.querySelector('#reset');
const btnIncrement = document.querySelector('#increment');

//Increment Action
btnIncrement.addEventListener('click', () => {
  curValue++;
  mainTitle.textContent = curValue;
});

//Decrement Action
btnDecrement.addEventListener('click', () => {
  curValue--;
  mainTitle.textContent = curValue;
});

//Reset Action
btnReset.addEventListener('click', () => {
  curValue = 0;
  mainTitle.textContent = curValue;
});