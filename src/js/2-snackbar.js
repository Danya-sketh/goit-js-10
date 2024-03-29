// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      // Отримання значень з форми
      const delay = parseInt(form.elements.delay.value);
      const state = form.elements.state.value;

      // Створення промісу
      const notificationPromise = new Promise((resolve, reject) => {
        // Затримка виклику промісу
        setTimeout(() => {
          if (state === 'fulfilled') {
            resolve(delay);
          } else {
            reject(delay);
          }
        }, delay);
      });

      // Обробка результатів промісу
      notificationPromise.then((delay) => {
        // Вивід повідомлення про вдале виконання промісу
        iziToast.success({ message: `✅ Fulfilled promise in ${delay}ms` });
      }).catch((delay) => {
        // Вивід повідомлення про невдале виконання промісу
        iziToast.error({ message: `❌ Rejected promise in ${delay}ms` });
      });
    });