'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const operationsElement = document.querySelector('.operations');
const h1 = document.querySelector('h1');
const logo = document.querySelector('.nav__logo');
const header = document.querySelector('.header');
const message = document.createElement('div');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();

  section1.scrollIntoView({ behavior: 'smooth' });
});

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

document.querySelector('.nav__links').addEventListener(
  'click',
  function (e) {
    e.stopPropagation();
    e.preventDefault();
    console.log(e.target);
    console.log(e.target.classList);
    if (e.target.classList.contains('nav__link')) {
      const id = e.target.getAttribute('href');
      document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    }
  },
  true
);
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const allSections = document.querySelectorAll('.section');

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');

console.log(document.getElementsByClassName('btn'));

// Creating and inserting elements
// .insertAdjacentHTML

message.classList.add('cookie-message');
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

header.appendChild(message);
//header.append(message);

document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });

message.style.backgroundColor = '#37383d';
message.style.width = '120%';

console.log(message.style.backgroundColor);
console.log(message.style.width);

console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height) + 30 + 'px';

document.documentElement.style.setProperty('--color-primary', 'orangered');

// Attributes

console.log(logo.alt);
console.log(logo.src);

// const h1 = document.querySelector('h1');
// const alertH1 = function (e) {
//   alert(`addEventListener: Great, You are reading the heading!`);
// };
// h1.addEventListener('mouseenter', alertH1);

// setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 5000);

// rgb(255,255,255)
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

console.log(randomColor());
let seconds = 1;
function changeBColor(context) {
  setTimeout(function () {
    context.style.backgroundColor = randomColor();
  }, (seconds += 2) * 1000);
}
document.querySelector('.nav__link').addEventListener('click', function (e) {
  //e.stopPropagation();
  changeBColor(this);
  console.log(e.target);
});
document.querySelector('.nav__links').addEventListener('click', function (e) {
  changeBColor(this);
  console.log(e.target);
});
document.querySelector('.nav').addEventListener(
  'click',
  function (e) {
    changeBColor(this);
    console.log(e.target);
  },
  true
);

//Going downwards: child

console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children);
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

operationsElement.addEventListener('click', function (e) {
  // const clicked = e.target.parentElement.classList.contains('operations__tab')
  //   ? e.target.parentElement
  //   : e.target;
  const clicked = e.target.closest('.operations__tab');

  if (clicked?.classList.contains('operations__tab')) {
    if (!clicked.classList.contains('operations__tab--active')) {
      // Find and 'Deactivate' the current active tab and content
      document
        .querySelector('.operations__tab--active')
        .classList.toggle('operations__tab--active', false);
      document
        .querySelector('.operations__content--active')
        .classList.toggle('operations__content--active', false);

      // Activate the desired tab and content
      const btnNum = clicked.dataset.tab;
      console.log(`btnNum: `, btnNum);

      clicked.classList.toggle('operations__tab--active', true);
      this.querySelector(`.operations__content--${btnNum}`).classList.toggle(
        'operations__content--active',
        true
      );
    }
  }
});

// Menu fade animation

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// Sticky navigation
// const initialCoords = section1.getBoundingClientRect();
// window.addEventListener('scroll', function (e) {
//   if (this.window.scrollY > initialCoords.top)
//     nav.classList.toggle('sticky', true);
//   else nav.classList.toggle('sticky', false);
// });

const navHeight = nav.getBoundingClientRect().height;

const obsCallback = function (entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) nav.classList.toggle('sticky', true);
    else nav.classList.toggle('sticky', false);
  });
};
const obsOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};
const headerObserver = new IntersectionObserver(obsCallback, obsOptions);
headerObserver.observe(header);

//Reveal sections
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.classList.toggle('section--hidden', false);
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.toggle('section--hidden', true);
});

//Reveal images
const allFeatureImages = document.querySelectorAll('.features__img');
console.log(`allFeatureImages: `, allFeatureImages);
const revealImage = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  console.log('src attribute:', entry.target.getAttribute('src'));
  entry.target.setAttribute('src', entry.target.dataset.src);
  console.log('src attribute changed?:', entry.target.getAttribute('src'));
  entry.target.classList.toggle('lazy-img', false);
  observer.unobserve(entry.target);
};
const imageObserver = new IntersectionObserver(revealImage, {
  root: null,
  threshold: 0.3,
  rootMargin: '200px',
});
allFeatureImages.forEach(function (img) {
  imageObserver.observe(img);
  console.log(`I'm observing:`, img);
});

// // Slider
// const setupSlides = function () {
//   const allSlides = document.querySelectorAll('.slide');
//   allSlides.forEach((slide, index) => {
//     slide.style = `transform: translateX(${index * 100}%);`;
//     slide.dataset.translateX = index * 100;
//   });
//   return allSlides;
// };

// let slides = setupSlides();
// console.log(`slides: `, slides);
// const shiftSlides = function (shiftBy) {
//   slides.forEach(slide => {
//     slide.style = `transform: translateX(${
//       parseInt(slide.dataset.translateX) + shiftBy
//     }%);`;
//     slide.dataset.translateX = parseInt(slide.dataset.translateX) + shiftBy;
//   });
// };

// const slideThroughTestimonials = function (e) {
//   const button = e.target;

//   if (button.classList.contains('slider__btn')) {
//     const shiftSlidesBy = button.classList.contains('slider__btn--left')
//       ? 100
//       : -100;
//     console.log(`[0]translateX: `, parseInt(slides[0].dataset.translateX));
//     console.log(
//       `[last]translateX: `,
//       parseInt(slides[slides.length - 1].dataset.translateX)
//     );

//     console.log(slides.length * shiftSlidesBy);
//     console.log(
//       `Button contains left class:`,
//       button.classList.contains('slider__btn--left')
//     );
//     if (button.classList.contains('slider__btn--left')) {
//       if (
//         parseInt(slides[[slides.length - 1]].dataset.translateX) ===
//         (slides.length - 1) * shiftSlidesBy
//       ) {
//         console.log('reset slides');
//         shiftSlides(-shiftSlidesBy * (slides.length - 1));
//       } else {
//         console.log('Shifts left');
//         shiftSlides(shiftSlidesBy);
//       }
//     } else {
//       if (
//         parseInt(slides[0].dataset.translateX) ===
//         (slides.length - 1) * shiftSlidesBy
//       ) {
//         slides = setupSlides();
//       } else shiftSlides(shiftSlidesBy);
//     }
//   }
// };
// document
//   .querySelector('.slider')
//   .addEventListener('click', slideThroughTestimonials);

// Chat GPT version:
const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const totalSlides = slides.length;
const dotsContainer = document.querySelector('.dots');
const leftSliderBtn = document.querySelector('.slider__btn--left');
const rightSliderBtn = document.querySelector('.slider__btn--right');
let currentSlideIndex = 0;
let isKeydownListenerActive = false;
const addSliderDotButton = function (index) {
  const btnHtml = `<button class="dots__dot dots__dot--${index}" data-index="${index}"></button>`;
  dotsContainer.insertAdjacentHTML('beforeend', btnHtml);
};

const updateActiveDot = function () {
  document
    .querySelector('.dots__dot--active')
    ?.classList.toggle('dots__dot--active', false);
  document
    .querySelector(`.dots__dot--${currentSlideIndex}`)
    ?.classList.toggle('dots__dot--active', true);
};

const handleDotClick = e => {
  const dot = e.target;
  if (dot.classList.contains('dots__dot--active')) return;
  if (dot.classList.contains('dots__dot')) {
    goToSlide(Number(dot.dataset.index));
  }
};

// Initialize slides
const goToSlide = (slideIndex = currentSlideIndex, createDots = false) => {
  currentSlideIndex = slideIndex;
  if (createDots) {
    dotsContainer.innerHTML = '';
  }
  slides.forEach((slide, index) => {
    slide.style.transform = `translateX(${(index - currentSlideIndex) * 100}%)`;
    if (createDots) addSliderDotButton(index);
  });
  updateActiveDot();
};

const shiftSlides = direction => {
  if (direction === 'left') {
    currentSlideIndex =
      currentSlideIndex === 0 ? totalSlides - 1 : currentSlideIndex - 1;
  } else {
    currentSlideIndex =
      currentSlideIndex === totalSlides - 1 ? 0 : currentSlideIndex + 1;
  }
  goToSlide(currentSlideIndex);
};

const slideThroughTestimonials = e => {
  const button = e.target;

  if (button.classList.contains('slider__btn--left')) {
    shiftSlides('left');
  } else if (button.classList.contains('slider__btn--right')) {
    shiftSlides('right');
  }
};

const setupSlides = () => goToSlide(currentSlideIndex, true);
setupSlides();

const sliderKeyDownHandler = e => {
  if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
    shiftSlides(e.key === 'ArrowRight' ? 'right' : 'left');
  }
};

document
  .querySelector('.slider')
  .addEventListener('click', slideThroughTestimonials);

dotsContainer.addEventListener('click', handleDotClick);

const sliderObserverHandler = entries => {
  if (entries[0].isIntersecting && !isKeydownListenerActive) {
    window.addEventListener('keydown', sliderKeyDownHandler);
    isKeydownListenerActive = true;
  } else if (!entries[0].isIntersecting && isKeydownListenerActive) {
    window.removeEventListener('keydown', sliderKeyDownHandler);
    isKeydownListenerActive = false;
  }
};

const sliderObserverOptions = {
  threshold: 1.0,
};
const sliderObserver = new IntersectionObserver(
  sliderObserverHandler,
  sliderObserverOptions
);

sliderObserver.observe(slider);
