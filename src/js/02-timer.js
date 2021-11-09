import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startBtn = document.querySelector('button');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
const timer = document.querySelector('.timer');
const head = document.querySelector('head');
head.insertAdjacentHTML(
  'beforeend',
  `<style> .timer {
  margin-top: 40px;
  display: flex;
}

.field {
  display: flex;
  flex-direction: column;
  margin-right: 30px;
  align-items: center;
}

.value {
  font-size: 40px;
}</style>`,
);

startBtn.addEventListener('click', onStartClick);

startBtn.disabled = true;
let futureTime = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  minDate: null,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (Date.now() > selectedDates[0]) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      startBtn.disabled = false;
      futureTime = selectedDates[0].getTime();
    }
    return futureTime;
  },
};

const fp = flatpickr('#datetime-picker', options);

let isActive = false;
let intervalId = null;

function onStartClick() {
  if (isActive) {
    return;
  }
  isActive = true;

  intervalId = setInterval(() => {
    const deltaTime = futureTime - new Date().getTime();
    const time = convertMs(deltaTime);
    updateTimer(time);
    console.log(convertMs(deltaTime));
    console.log(futureTime);

    if (deltaTime <= 2) {
      clearInterval(intervalId);
    }
  }, 1000);
}

function updateTimer({ days, hours, minutes, seconds }) {
  daysEl.textContent = days;
  hoursEl.textContent = hours;
  minutesEl.textContent = minutes;
  secondsEl.textContent = seconds;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
