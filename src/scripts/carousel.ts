// Carousel Setup
const carousel = document.getElementById("carousel") as HTMLElement;
const carouselItems = document.getElementById("carouselItems") as HTMLElement;
const prevButton = document.getElementById("prevButton") as HTMLButtonElement;
const nextButton = document.getElementById("nextButton") as HTMLButtonElement;
const pagination = document.getElementById("pagination") as HTMLElement;

let currentIndex = 0;
const slides = carouselItems.children;
const totalSlides = slides.length;

// Create pagination dots dynamically
for (let i = 0; i < totalSlides; i++) {
  const dot = document.createElement('div');
  dot.classList.add('w-2', 'h-2', 'bg-white', 'rounded-full', 'cursor-pointer');
  dot.addEventListener('click', () => goToSlide(i));
  pagination.appendChild(dot);
}

// Update pagination to reflect the current slide
const updatePagination = () => {
  const dots = pagination.children;
  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.toggle('bg-blue-500', i === currentIndex);
  }
};

// Go to a specific slide
const goToSlide = (index: number) => {
  currentIndex = index;
  carouselItems.style.transform = `translateX(-${currentIndex * 100}%)`;
  updatePagination();
};

// Prev button click event
prevButton.addEventListener("click", () => {
  currentIndex = (currentIndex === 0) ? totalSlides - 1 : currentIndex - 1;
  goToSlide(currentIndex);
});

// Next button click event
nextButton.addEventListener("click", () => {
  currentIndex = (currentIndex === totalSlides - 1) ? 0 : currentIndex + 1;
  goToSlide(currentIndex);
});

// Initial setup
updatePagination();
