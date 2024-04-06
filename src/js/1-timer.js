







import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

let userSelectedDate;
let timeInterval;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    timeInterval = userSelectedDate - options.defaultDate;

    if (timeInterval < 0) {
      iziToast.error({
        color: 'red',
        position: 'topRight',
        message: `Please choose a date in the future`,
      });

      inputTime.disabled = false;
    } else {
      startBtn.disabled = false;
      inputTime.disabled = true;
    }
  },
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

const calendar = flatpickr('#datetime-picker', options);
const inputTime = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const timeValueElements = document.querySelectorAll('.value');

startBtn.disabled = true;
startBtn.addEventListener('click', event => {
  const repeatTime = setInterval(() => {
    timeInterval = userSelectedDate - new Date();
    
    if (timeInterval < 0) {
      startBtn.disabled = true;
      inputTime.disabled = false;
      clearInterval(repeatTime);
      return;
    }
    const timer = convertMs(timeInterval);
    timeValueElements[0].textContent = timer.days.toString().padStart(2, '0');
    timeValueElements[1].textContent = timer.hours.toString().padStart(2, '0');
    timeValueElements[2].textContent = timer.minutes.toString().padStart(2, '0');
    timeValueElements[3].textContent = timer.seconds.toString().padStart(2, '0');
  }, 1000);
});