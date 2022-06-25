// js-slider
// get slider element constants
const sliderImgs = [...document.querySelectorAll('.slider-img img')];
const pravBtn = document.querySelector('.prav');
const nextBtn = document.querySelector('.next');
const counter = document.getElementById('counter');
const sliderPagination = document.querySelector('.slider-pagination');
const styleTag = document.createElement('style') ;

// set helper variables and adding it to the window
const slidCounter = sliderImgs.length;
let currentSlide = 1;
document.head.appendChild(styleTag);



/**
 * pagination loop
 * loop to add pagination and pagination count to the slider
*/

const paginationContainer = document.createElement('ul');
paginationContainer.className = 'pagination-container';

// add pagination items
for(let i = 1; i <= slidCounter; i++) {

  let paginationItem = document.createElement('li');

  paginationItem.setAttribute('data-index', i);

  paginationItem.appendChild(document.createTextNode(i));

  paginationContainer.appendChild(paginationItem);

}

sliderPagination.appendChild(paginationContainer);
const paginationItems = [...document.querySelectorAll('.pagination-container li')];

// ===> end pagination loop <===

/**
 * checker function
 * chekcer function do all slider logic [change slider image, chenge active buttons color, ...] 
*/

function checker() {

  counter.innerHTML = `#Slider ${currentSlide} of ${slidCounter}`;

  removeActiveClass();

  // change active and disabled buttons and images
  sliderImgs[currentSlide - 1].classList.add('active');
  paginationItems[currentSlide - 1].classList.add('active');

  if(currentSlide <= 1) {
    pravBtn.classList.add('disable');
  } else {
    pravBtn.classList.remove('disable');
  }

  if(currentSlide >= slidCounter) {
    nextBtn.classList.add('disable');
  } else {
    nextBtn.classList.remove('disable');
  }

  // change active color 
  nextBtn.style.backgroundColor = `#${sliderImgs[currentSlide - 1].getAttribute('data-color')}`;
  pravBtn.style.backgroundColor = `#${sliderImgs[currentSlide - 1].getAttribute('data-color')}`;
  paginationItems[currentSlide - 1].style.cssText = `background-color: #${sliderImgs[currentSlide - 1].getAttribute('data-color')}`; 
  styleTag.innerHTML = `
    .slider-pagination .pagination-container li {color: #${sliderImgs[currentSlide - 1].getAttribute('data-color')}; border-color: #${sliderImgs[currentSlide - 1].getAttribute('data-color')};}
    .slider-pagination .pagination-container li:hover {color: #fff !important; background-color: #${sliderImgs[currentSlide - 1].getAttribute('data-color')} !important;}
  `;

}

checker(); // running checker function whene the project page loading

//===> end cheker function <===

/**
 * adding project click events to clickable buttons
 * pagination items click event
 * pravious button click event
 * next button click event
*/

//  adding click event to all pagination items
paginationItems.forEach( ele => {
  ele.addEventListener('click', function () {
    currentSlide = parseInt(this.getAttribute('data-index'));
    checker();
  });
});

// add click function to pravious button
pravBtn.onclick =  pravImage;

// add click function to next button
nextBtn.onclick = nextImage;

//===> end project click events <===

/*
 * start add project helper functions
 * removeActiveClass function [removes all active classes before runming checker function logic] 
 * pravImage function [changes current slider image 'to pravious']
 * nextImage function [changes current slider image 'to next']
*/

// remove active classes function
function removeActiveClass() {
  
  // remove all active class from slider images
  sliderImgs.forEach(ele => ele.classList.remove('active'));
  
  // remove active class from pagination items
  paginationItems.forEach(ele => {
    ele.classList.remove('active');
    ele.style.backgroundColor = '#fff';
  });
  
}

// pravious image function
function pravImage() {
  if(currentSlide <= 1) {
    return false;
  }
  currentSlide--;
  checker();
}

// next image function
function nextImage() {
  if(currentSlide >= slidCounter) {
    return false;
  }
  currentSlide++;
  checker();
}

//===> end helper functions <===