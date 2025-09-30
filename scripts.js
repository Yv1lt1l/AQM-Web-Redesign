// Reviews JS Carousel
document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".carousel-track");
  const nextBtn = document.querySelector(".carousel-btn.next");
  const prevBtn = document.querySelector(".carousel-btn.prev");
  const dotsContainer = document.querySelector(".carousel-dots");

  // If no carousel elements found, exit
  if (!track || !nextBtn || !prevBtn) return;

  let index = 0;
  let startX = 0;
  let isDragging = false;
  let autoplayInterval;

  // Initialize carousel
  function initCarousel() {
    createDots();
    updateCarousel();
    startAutoplay();
  }

  // Create dots dynamically
  function createDots() {
    if (!dotsContainer) return;

    dotsContainer.innerHTML = "";
    for (let i = 0; i < track.children.length; i++) {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      dot.dataset.index = i;
      dot.addEventListener("click", () => {
        index = i;
        updateCarousel();
        resetAutoplay();
      });
      dotsContainer.appendChild(dot);
    }
  }

  // Update Carousel position
  function updateCarousel() {
    const cardWidth = track.parentElement.offsetWidth;
    track.style.transform = `translateX(-${cardWidth * index}px)`;

    // Update active dot
    if (dotsContainer) {
      dotsContainer
        .querySelectorAll(".dot")
        .forEach((dot) => dot.classList.remove("active"));
      const activeDot = dotsContainer.querySelector(
        `.dot[data-index="${index}"]`
      );
      if (activeDot) activeDot.classList.add("active");
    }
  }

  // Next review - moves to the right
  function nextSlide() {
    index = (index + 1) % track.children.length;
    updateCarousel();
  }

  // Previous review - moves to the left
  function prevSlide() {
    index = (index - 1 + track.children.length) % track.children.length;
    updateCarousel();
  }

  // Autoplay functions
  function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, 5000);
  }

  function resetAutoplay() {
    clearInterval(autoplayInterval);
    startAutoplay();
  }

  // Event listeners
  nextBtn.addEventListener("click", () => {
    nextSlide();
    resetAutoplay();
  });

  prevBtn.addEventListener("click", () => {
    prevSlide();
    resetAutoplay();
  });

  // Touch / swipe support for mobile
  track.addEventListener(
    "touchstart",
    (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    },
    { passive: true }
  );

  track.addEventListener(
    "touchend",
    (e) => {
      if (!isDragging) return;
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;

      if (diff > 50) {
        // Swipe left - go to next
        nextSlide();
      } else if (diff < -50) {
        // Swipe right - go to previous
        prevSlide();
      }

      resetAutoplay();
      isDragging = false;
    },
    { passive: true }
  );

  // Initialize carousel
  initCarousel();
});

// Rest of your existing code for nav toggle and copyright year...
document.querySelectorAll(".nav-toggle").forEach((btn) => {
  btn.addEventListener("click", () => {
    const expanded = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", String(!expanded));
    document.getElementById("nav-list").classList.toggle("open");
  });
});

document.getElementById("year").textContent = new Date().getFullYear();
