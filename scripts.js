document.addEventListener("DOMContentLoaded", function () {
  // =========================
  // 1. Reviews Carousel
  // =========================
  const track = document.querySelector(".carousel-track");
  const nextBtn = document.querySelector(".carousel-btn.next");
  const prevBtn = document.querySelector(".carousel-btn.prev");
  const dotsContainer = document.querySelector(".carousel-dots");

  if (track && nextBtn && prevBtn) {
    let index = 0;
    let autoplayInterval;

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

    function updateCarousel() {
      const cardWidth = track.parentElement.offsetWidth;
      track.style.transform = `translateX(-${cardWidth * index}px)`;

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

    function nextSlide() {
      index = (index + 1) % track.children.length;
      updateCarousel();
    }

    function prevSlide() {
      index = (index - 1 + track.children.length) % track.children.length;
      updateCarousel();
    }

    function startAutoplay() {
      autoplayInterval = setInterval(nextSlide, 5000);
    }

    function resetAutoplay() {
      clearInterval(autoplayInterval);
      startAutoplay();
    }

    // Init carousel
    createDots();
    updateCarousel();
    startAutoplay();

    // Event listeners
    nextBtn.addEventListener("click", () => {
      nextSlide();
      resetAutoplay();
    });
    prevBtn.addEventListener("click", () => {
      prevSlide();
      resetAutoplay();
    });

    // Touch swipe
    let startX = 0;
    let isDragging = false;
    track.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    });
    track.addEventListener("touchend", (e) => {
      if (!isDragging) return;
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      if (diff > 50) nextSlide();
      else if (diff < -50) prevSlide();
      resetAutoplay();
      isDragging = false;
    });
  }

  // =========================
  // 2. Contact Form
  // =========================
  const form = document.getElementById("contact-form");
  const result = document.getElementById("form-result");

  if (form && result) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(form);

      try {
        const response = await fetch(form.action, {
          method: form.method,
          body: formData,
          headers: { Accept: "application/json" },
        });

        if (response.ok) {
          result.style.display = "block";
          result.style.color = "green";
          result.innerText =
            "✅ Thank you! Your message has been sent successfully.";
          form.reset();
        } else {
          result.style.display = "block";
          result.style.color = "red";
          result.innerText =
            "⚠️ Oops! Something went wrong. Please try again later.";
        }
      } catch (error) {
        result.style.display = "block";
        result.style.color = "red";
        result.innerText =
          "⚠️ Network error. Please check your connection and try again.";
      }
    });
  }

  // =========================
  // 3. Gallery Thumbnails
  // =========================
  const mainImage = document.querySelector(".gallery-main .main-image");
  const thumbs = document.querySelectorAll(".gallery-thumbs img");

  if (mainImage && thumbs.length > 0) {
    thumbs.forEach((thumb) => {
      thumb.addEventListener("click", function () {
        mainImage.src = this.src;
        mainImage.alt = this.alt;

        // optional visual feedback
        thumbs.forEach((t) => (t.style.opacity = "0.7"));
        this.style.opacity = "1";
      });
    });
  }

  // =========================
  // 4. Nav Toggle + Year
  // =========================
  document.querySelectorAll(".nav-toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!expanded));
      document.getElementById("nav-list").classList.toggle("open");
    });
  });

  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
