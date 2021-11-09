function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

startBtn.addEventListener('click', start);
stopBtn.addEventListener('click', stop);

let isActive = false;
let intervalId = null;

function start() {
  if (isActive) {
    return;
  }
  isActive = true;
  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function stop() {
  clearInterval(intervalId);
  isActive = false;
}
