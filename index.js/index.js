document.addEventListener("DOMContentLoaded", function () {
  // 🔁 Fade-in Observer for course and testimonial images
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.3
  });

  document.querySelectorAll('.course-img, .testimonial-img').forEach(img => {
    observer.observe(img);
  });

  // 📚 Course Scroll Buttons
  function scrollCourses(direction) {
    const gallery = document.querySelector('.course-gallery');
    const scrollAmount = 400;
    gallery?.scrollBy({
      left: direction * scrollAmount,
      behavior: 'smooth'
    });
  }
  window.scrollCourses = scrollCourses;

document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.getElementById('testimonial-carousel');
  const leftArrow = document.getElementById('left-arrow');
  const rightArrow = document.getElementById('right-arrow');

  let currentPosition = 0;

  function getMaxScroll() {
    const container = document.querySelector('.testimonial-carousel-container');
    const maxScroll = carousel.scrollWidth - container.offsetWidth;
    return -maxScroll;
  }

  function moveLeft() {
    const box = carousel.querySelector('.testimonial-img');
    const boxWidth = box.offsetWidth + 20; // width + margin both sides (10px left + 10px right)
    currentPosition += boxWidth;
    if (currentPosition > 0) currentPosition = 0;
    carousel.style.transform = `translateX(${currentPosition}px)`;
  }

  function moveRight() {
    const box = carousel.querySelector('.testimonial-img');
    const boxWidth = box.offsetWidth + 20;
    currentPosition -= boxWidth;
    const maxScroll = getMaxScroll();
    if (currentPosition < maxScroll) currentPosition = maxScroll;
    carousel.style.transform = `translateX(${currentPosition}px)`;
  }

  leftArrow.addEventListener('click', moveLeft);
  rightArrow.addEventListener('click', moveRight);

  // Optional: Adjust on resize
  window.addEventListener('resize', () => {
    const maxScroll = getMaxScroll();
    if (currentPosition < maxScroll) {
      currentPosition = maxScroll;
      carousel.style.transform = `translateX(${currentPosition}px)`;
    }
  });
});





  // ❓ FAQ Toggle
  const questions = document.querySelectorAll(".faq-question");

  questions.forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.parentElement;
      const isActive = item.classList.contains("active");

      document.querySelectorAll(".faq-item").forEach(i => i.classList.remove("active"));
      if (!isActive) item.classList.add("active");
    });
  });

  // 🔝 Back to Top Button
  const backToTopBtn = document.getElementById("backToTop");

  window.addEventListener("scroll", function () {
    backToTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
  });

  backToTopBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.getElementById("testimonial-carousel");
  const leftArrow = document.getElementById("left-arrow");
  const rightArrow = document.getElementById("right-arrow");
  const scrollAmount = 300;

  if (carousel && leftArrow && rightArrow) {
    // Arrow button clicks
    leftArrow.addEventListener("click", () => {
      carousel.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });

    rightArrow.addEventListener("click", () => {
      carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });

    // Swipe support on touch devices
    let startX = 0;
    let isSwiping = false;

    carousel.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
      isSwiping = true;
    });

    carousel.addEventListener("touchmove", (e) => {
      if (!isSwiping) return;
      const currentX = e.touches[0].clientX;
      const diffX = startX - currentX;

      // Swipe threshold
      if (Math.abs(diffX) > 50) {
        carousel.scrollBy({ left: diffX > 0 ? scrollAmount : -scrollAmount, behavior: "smooth" });
        isSwiping = false; // prevent multiple triggers
      }
    });

    carousel.addEventListener("touchend", () => {
      isSwiping = false;
    });
  }
});


const sliderTrack = document.getElementById("slider-track");
const btnLeft = document.getElementById("btn-left");
const btnRight = document.getElementById("btn-right");

let currentPosition = 0;

function getMaxScroll() {
  const container = document.querySelector('.slider-wrap');
  const maxScroll = sliderTrack.scrollWidth - container.offsetWidth;
  return -maxScroll;
}

function moveLeft() {
  const card = sliderTrack.querySelector('.testimonial-card');
  const cardWidth = card.offsetWidth + 20; // margin on both sides: 10px each
  currentPosition += cardWidth;
  if (currentPosition > 0) currentPosition = 0;
  sliderTrack.style.transform = `translateX(${currentPosition}px)`;
}

function moveRight() {
  const card = sliderTrack.querySelector('.testimonial-card');
  const cardWidth = card.offsetWidth + 20;
  currentPosition -= cardWidth;
  const maxScroll = getMaxScroll();
  if (currentPosition < maxScroll) currentPosition = maxScroll;
  sliderTrack.style.transform = `translateX(${currentPosition}px)`;
}

btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);

window.addEventListener("resize", () => {
  const maxScroll = getMaxScroll();
  if (currentPosition < maxScroll) {
    currentPosition = maxScroll;
    sliderTrack.style.transform = `translateX(${currentPosition}px)`;
  }
});
let startX = 0;
let isDragging = false;

sliderTrack.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
  isDragging = true;
});

sliderTrack.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  const currentX = e.touches[0].clientX;
  const deltaX = currentX - startX;

  // Optional: prevent native scrolling while swiping horizontally
  if (Math.abs(deltaX) > 10) {
    e.preventDefault();
  }
});

sliderTrack.addEventListener('touchend', (e) => {
  if (!isDragging) return;
  const endX = e.changedTouches[0].clientX;
  const deltaX = endX - startX;

  if (Math.abs(deltaX) > 50) { // threshold for swipe
    if (deltaX > 0) {
      moveLeft();  // Swipe right → move left
    } else {
      moveRight(); // Swipe left → move right
    }
  }

  isDragging = false;
});
document.addEventListener('DOMContentLoaded', () => {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const icon = document.createElement('span');
    icon.classList.add('icon');
    icon.textContent = '+';
    question.appendChild(icon);

    question.addEventListener('click', () => {
      item.classList.toggle('active');
      if (item.classList.contains('active')) {
        icon.textContent = '−';
      } else {
        icon.textContent = '+';
      }
    });
  });
});

