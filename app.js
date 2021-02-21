const imagesArea = document.querySelector(".images");
const gallery = document.querySelector(".gallery");
const galleryHeader = document.querySelector(".gallery-header");
const searchBtn = document.getElementById("search-btn");
const sliderBtn = document.getElementById("create-slider");
const sliderContainer = document.getElementById("sliders");
// selected image
let sliders = [];

// If this key doesn't work
// Find the name in the url and go to their website
// to create your own api key

const KEY = "15674931-a9d714b6e9d654524df198e00&q";
const getImages = (query) => {
  //toggle spinner function called for show true
  toggleSpinner(true);

  fetch(
    `https://pixabay.com/api/?key=${KEY}=${query}&image_type=photo&pretty=true`)
    .then((response) => response.json())
    .then((data) => showImages(data))
    .catch((err) => console.log(err));
};

// show images
const showImages = (images) => {
  console.log(images.hits);
  imagesArea.style.display = "block";
  gallery.innerHTML = "";
  // show gallery title
  galleryHeader.style.display = "flex";
  console.log(images.hits.forEach);

  images.hits.forEach((image) => {
    let div = document.createElement("div");
    div.className = "col-lg-3 col-md-4 col-xs-6 img-item mb-2";
    div.innerHTML = ` <img class="img-fluid img-thumbnail" onclick=selectItem(event,"${image.webformatURL}") src="${image.webformatURL}" alt="${image.tags}">`;
    gallery.appendChild(div);
//toggle spinner function call for show false    
    toggleSpinner(false);
  });
};

// problem(5)image select and unselect method:
let slideIndex = 0;
const selectItem = (event, img) => {
  let element = event.target;
  element.classList.add("added");

  let item = sliders.indexOf(img);
  if (item === -1) {
    sliders.push(img);
  } else {
    element.classList.remove("added");
    sliders.splice(item, 1);
    // alert('Hey, Already added !')
  }
};

var timer;
const createSlider = () => {
  // check slider image length
  if (sliders.length < 2) {
    alert("Select at least 2 image.");
    return;
  }
  // crate slider previous next area
  sliderContainer.innerHTML = "";
  const prevNext = document.createElement("div");
  prevNext.className =
    "prev-next d-flex w-100 justify-content-between align-items-center";
  prevNext.innerHTML = ` 
  <span class="prev" onclick="changeItem(-1)"><i class="fas fa-chevron-left"></i></span>
  <span class="next" onclick="changeItem(1)"><i class="fas fa-chevron-right"></i></span>
  `;

  sliderContainer.appendChild(prevNext);
  document.querySelector(".main").style.display = "block";
  // hide image aria
  imagesArea.style.display = "none";
  var duration = document.getElementById("duration").value || 1000;
  sliders.forEach((slide) => {
    let item = document.createElement("div");
    item.className = "slider-item";
    item.innerHTML = `<img class="w-100"
    src="${slide}"
    alt="">`;
    sliderContainer.appendChild(item);
  });

  //problem(3)negative value remove:
  changeSlide(0);
  if (duration < 0) {
    duration = Math.abs(duration);
    alert("The negative duration number is not valid. It will work by default");
  }
  timer = setInterval(function () {
    slideIndex++;
    changeSlide(slideIndex);
  }, duration);
};

// change slider index
const changeItem = (index) => {
  changeSlide((slideIndex += index));
};

// change slide item
const changeSlide = (index) => {
  const items = document.querySelectorAll(".slider-item");
  if (index < 0) {
    slideIndex = items.length - 1;
    index = slideIndex;
  }

  if (index >= items.length) {
    index = 0;
    slideIndex = 0;
  }

  items.forEach((item) => {
    item.style.display = "none";
  });

  items[index].style.display = "block";
};

//click event listener for search button
searchBtn.addEventListener("click", function () {
  document.querySelector(".main").style.display = "none";
  clearInterval(timer);
  var search = document.getElementById("search");
  getImages(search.value);
  sliders.length = 0;
});

//keyboard event listener add for search
var input = document.getElementById("search");
input.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    document.querySelector(".main").style.display = "none";
    clearInterval(timer);
    getImages(input.value);
    sliders.length = 0;
    event.preventDefault();
    document.getElementById("searchBtn").click();
  }
});

//click event listener for slider button
sliderBtn.addEventListener("click", function () {
  createSlider();
});

//keyboard event listener for slider button
  document.getElementById("duration")
  .addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
      document.getElementById("create-slider").click();
    }
  });

//extra features toggle spinner
const toggleSpinner = (show) => {
  const spinner = document.getElementById("loading-spinner");
  if (show == true) {
    spinner.classList.remove("d-none");
  } else {
    spinner.classList.add("d-none");
  }
};
