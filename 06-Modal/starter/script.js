'use strict';

const showModalBtns = document.querySelectorAll('.show-modal');
const closeModalBtn = document.querySelector('.close-modal');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

const showModal = function () {
  modal.classList.toggle('hidden', 0);
  overlay.classList.toggle('hidden', 0);
};

const closeModal = function () {
  modal.classList.toggle('hidden', 1);
  overlay.classList.toggle('hidden', 1);
};

showModalBtns.forEach(element => {
  element.addEventListener('click', showModal);
});

closeModalBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closesModal);
document.addEventListener('keydown', function (e) {
  if (e.key.toString().toLowerCase() === 'escape') closeModal();
});
