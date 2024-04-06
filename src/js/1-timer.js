// // Описаний в документації
// import flatpickr from './path/to/flatpickr';

// // Додатковий імпорт стилів
// import "flatpickr/dist/flatpickr.min.css";

// // Описаний у документації
// import iziToast from "izitoast";
// // Додатковий імпорт стилів
// import "izitoast/dist/css/iziToast.min.css";

// // ======================================================================================= >>>>>>>>>

// const startBtn = document.querySelector('data-start');
// const days = document.querySelector('span[data-days]');
// const hours = document.querySelector('span[data-hours]');
// const minutes = document.querySelector('span[data-minutes]');
// const seconds = document.querySelector('span[data-seconds]');


// startBtn.addEventListener('click', () => {
//     const initTime = Date.now();

//     setInterval(() => {
//         const currentTime = Date.now();
//         const diff = currentTime - initTime;

//         const time = convertMs(diff);
//         days.textContent = time.days; 
//         hours.textContent = time.hours; 
//         minutes.textContent = time.minutes; 
//         seconds.textContent = time.seconds; 
//     }, 1000);
// });

// // ======================================================================================= >>>>>>>>>

//     const options = {
//         enableTime: true,
//         time_24hr: true,
//         defaultDate: new Date(),
//         minuteIncrement: 1,
//         onClose(selectedDates) {
//             if (selectedDates[0].getTime()<new Date().getTime()){
//             iziToast.error();
//             } else {
//                 const myInterval = convertMs (selectedDates[0].getTime() - new Date().getTime())
//             }
//         console.log(selectedDates[0]);
//         },
//     };


// // ======================================================================================= >>>>>>>>>

// function convertMs(ms) {
//     // Number of milliseconds per unit of time
//     const second = 1000;
//     const minute = second * 60;
//     const hour = minute * 60;
//     const day = hour * 24;

//     // Remaining days
//     const days = Math.floor(ms / day);
//     // Remaining hours
//     const hours = Math.floor((ms % day) / hour);
//     // Remaining minutes
//     const minutes = Math.floor(((ms % day) % hour) / minute);
//     // Remaining seconds
//     const seconds = Math.floor((((ms % day) % hour) % minute) / second);

//     return { days, hours, minutes, seconds };
//     }

//   console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
//   console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
//   console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

// ======================================================================================= >>>>>>>>>


// const startBtn = document.querySelector('data-start');
// const days = document.querySelector('span[data-days]');
// const hours = document.querySelector('span[data-hours]');
// const minutes = document.querySelector('span[data-minutes]');
// const seconds = document.querySelector('span[data-seconds]');

// startBtn.addEventListener('click', () => {
//     const initTime = Date.now();

//     setInterval(() => {
//         const currentTime = Date.now();
//         const diff = currentTime - initTime;

//         const time = convertMs(diff);
//         days.textContent = time.days; 
//         hours.textContent = time.hours; 
//         minutes.textContent = time.minutes; 
//         seconds.textContent = time.seconds; 
//     }, 1000);
// });








import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

// Отримуємо посилання на необхідні елементи з DOM
const startBtn = document.querySelector('[data-start]');
const dateTimePicker = document.querySelector('#datetime-picker');
const daysDisplay = document.querySelector('[data-days]');
const hoursDisplay = document.querySelector('[data-hours]');
const minutesDisplay = document.querySelector('[data-minutes]');
const secondsDisplay = document.querySelector('[data-seconds]');

let interval; // Змінна для зберігання ідентифікатора інтервалу

// Функція для підрахунку часу та оновлення інтерфейсу таймера
function updateTimer(endTime) {
    const currentTime = new Date().getTime();
    const timeRemaining = endTime - currentTime;

    if (timeRemaining <= 0) {
        clearInterval(interval); // Зупиняємо таймер, якщо час вийшов
        iziToast.success({ message: "Time's up!" }); // Повідомлення про завершення часу
        return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeRemaining);

    // Оновлення значень у відповідних елементах
    daysDisplay.textContent = addLeadingZero(days);
    hoursDisplay.textContent = addLeadingZero(hours);
    minutesDisplay.textContent = addLeadingZero(minutes);
    secondsDisplay.textContent = addLeadingZero(seconds);
}

// Функція для перевірки і форматування значень часу
function addLeadingZero(value) {
    return value < 10 ? `0${value}` : value;
}

// Функція для конвертації мілісекунд у об'єкт з часом
function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor((ms % hour) / minute);
    const seconds = Math.floor((ms % minute) / second);

    return { days, hours, minutes, seconds };
}

// Обробник події для кнопки "Start"
startBtn.addEventListener('click', () => {
    const selectedDate = new Date(dateTimePicker.value).getTime();

    // Перевірка на валідну дату
    if (isNaN(selectedDate) || selectedDate <= Date.now()) {
        iziToast.error({ message: "Please choose a date in the future" });
        return;
    }

    // Оновлення інтерфейсу
    updateTimer(selectedDate);

    // Запуск таймера
    interval = setInterval(() => {
        updateTimer(selectedDate);
    }, 1000);

    // Вимикаємо кнопку "Start" та поле вибору дати
    startBtn.disabled = true;
    dateTimePicker.disabled = true;
});

// Ініціалізація календаря flatpickr
flatpickr(dateTimePicker, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
});

startBtn.addEventListener('click', () => {
    const selectedDate = new Date(dateTimePicker.value).getTime();

    // Перевірка на валідність дати та часу
    if (isNaN(selectedDate) || selectedDate <= Date.now()) {
        iziToast.error({ message: "Please choose a future date and time" });
        return;
    }

    // Оновлення інтерфейсу
    updateTimer(selectedDate);

    // Запуск таймера
    interval = setInterval(() => {
        updateTimer(selectedDate);
    }, 1000);

    // Вимикаємо кнопку "Start" та поле вибору дати
    startBtn.disabled = true;
    dateTimePicker.disabled = true;
});


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < new Date()) {
            iziToast.error({ message: "Please choose a future date and time" });
            startBtn.disabled = true;
        } else {
            startBtn.disabled = false;
        }
    },
};

    // Оновлення інтерфейсу
    updateTimer(selectedDate);

    // Запуск таймера
    interval = setInterval(() => {
        updateTimer(selectedDate);
    }, 1000);

// Ініціалізація календаря flatpickr
flatpickr(dateTimePicker, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
});

// Деактивація кнопки "Start" при завантаженні сторінки
startBtn.disabled = true;

// Після завершення роботи таймера розблоковуємо інпут для вибору дати
dateTimePicker.disabled = false;
