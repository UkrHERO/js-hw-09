import Notiflix from 'notiflix';

const form = document.querySelector('.form');
form.addEventListener('submit', onSubmitForm);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    if (shouldResolve) {
      resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
    }

    reject(`❌ Rejected promise ${position} in ${delay}ms`);
  });
}

let count = 0;
function onSubmitForm(e) {
  e.preventDefault();

  const firstDelay = form.elements[0].value;
  const step = form.elements[1].value;
  const amount = form.elements[2].value;
  let sumDelay = +form.elements[0].value;

  const firstPromise = setTimeout(() => {
    count += 1;
    createPromise(count, firstDelay)
      .then((count, firstDelay) => {
        Notiflix.Notify.success(`${count}`);
        console.log(`${count}`);
      })
      .catch((count, firstDelay) => {
        Notiflix.Notify.failure(`${count}`);
        console.log(`${count}`);
      });

    const nextPromises = setInterval(() => {
      count += 1;
      sumDelay += +step;
      createPromise(count, sumDelay)
        .then((count, sumDelay) => {
          Notiflix.Notify.success(`${count}`);
          console.log(`${count}`);
        })
        .catch((count, sumDelay) => {
          Notiflix.Notify.failure(`${count}`);
          console.log(`${count}`);
        });
      if (count >= amount) {
        clearInterval(nextPromises);
      }
    }, step);
  }, firstDelay);
  count = 0;
}
