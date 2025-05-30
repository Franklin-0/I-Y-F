document.addEventListener("DOMContentLoaded", function () {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.course-img, .testimonial-img').forEach(img => {
    observer.observe(img);
  });

  function scrollCourses(direction) {
    const gallery = document.querySelector('.course-gallery');
    const scrollAmount = 400;
    gallery?.scrollBy({
      left: direction * scrollAmount,
      behavior: 'smooth'
    });
  }
  window.scrollCourses = scrollCourses;

  const carousel = document.getElementById("testimonial-carousel");
  const leftArrow = document.getElementById("left-arrow");
  const rightArrow = document.getElementById("right-arrow");
  const scrollAmount = 300;

  if (carousel && leftArrow && rightArrow) {
    leftArrow.addEventListener("click", () => {
      carousel.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });

    rightArrow.addEventListener("click", () => {
      carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });

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

      if (Math.abs(diffX) > 50) {
        carousel.scrollBy({ left: diffX > 0 ? scrollAmount : -scrollAmount, behavior: "smooth" });
        isSwiping = false;
      }
    });

    carousel.addEventListener("touchend", () => {
      isSwiping = false;
    });
  }

  const sliderTrack = document.getElementById("slider-track");
  const btnLeft = document.getElementById("btn-left");
  const btnRight = document.getElementById("btn-right");
  let currentPosition = 0;

  function getMaxScroll() {
    const container = document.querySelector('.slider-wrap');
    return -(sliderTrack.scrollWidth - container.offsetWidth);
  }

  function moveLeft() {
    const card = sliderTrack.querySelector('.testimonial-card');
    const cardWidth = card.offsetWidth + 20;
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

  if (btnLeft && btnRight && sliderTrack) {
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
      if (Math.abs(deltaX) > 10) e.preventDefault();
    });

    sliderTrack.addEventListener('touchend', (e) => {
      if (!isDragging) return;
      const endX = e.changedTouches[0].clientX;
      const deltaX = endX - startX;
      if (Math.abs(deltaX) > 50) {
        deltaX > 0 ? moveLeft() : moveRight();
      }
      isDragging = false;
    });
  }

  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    let icon = question.querySelector('.icon');
    if (!icon) {
      icon = document.createElement('span');
      icon.classList.add('icon');
      icon.textContent = '+';
      question.appendChild(icon);
    }

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => {
        i.classList.remove('active');
        const ic = i.querySelector('.icon');
        if (ic) {
          ic.textContent = '+';
          ic.classList.remove('rotate');
        }
      });
      if (!isActive) {
        item.classList.add('active');
        icon.textContent = '−';
        icon.classList.add('rotate');
      } else {
        item.classList.remove('active');
        icon.textContent = '+';
        icon.classList.remove('rotate');
      }
    });
  });

  const backToTopBtn = document.getElementById("backToTop");

  window.addEventListener("scroll", function () {
    backToTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
  });

  backToTopBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
