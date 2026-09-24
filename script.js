// Hamburger menu
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const menu = document.getElementById("main-menu");

  if (hamburger && menu) {
    hamburger.addEventListener("click", () => {
      menu.classList.toggle("open");
    });
  }

  // Projects filter
  const filterSelect = document.getElementById("project-filter");
  const projectCards = document.querySelectorAll("#projects-grid .project-card");

  if (filterSelect && projectCards.length) {
    filterSelect.addEventListener("change", () => {
      const value = filterSelect.value;
      projectCards.forEach(card => {
        const tags = (card.dataset.tag || "").split(" ");
        if (value === "all" || tags.includes(value)) {
          card.style.display = "";
        } else {
          card.style.display = "none";
        }
      });
    });
  }

  // Gallery slider
  const slider = document.getElementById("gallery-slider");
  const slides = slider ? slider.querySelectorAll(".slide") : [];
  const dotsContainer = document.getElementById("gallery-dots");
  const dots = dotsContainer ? dotsContainer.querySelectorAll(".slider-dot") : [];
  let currentSlide = 0;

  function showSlide(index) {
    if (!slides.length) return;
    currentSlide = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === currentSlide);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentSlide);
    });
  }

  const prevBtn = document.querySelector("[data-gallery-prev]");
  const nextBtn = document.querySelector("[data-gallery-next]");

  if (prevBtn && nextBtn && slides.length) {
    prevBtn.addEventListener("click", () => showSlide(currentSlide - 1));
    nextBtn.addEventListener("click", () => showSlide(currentSlide + 1));
  }

  dots.forEach(dot => {
    dot.addEventListener("click", () => {
      const index = parseInt(dot.dataset.galleryDot, 10);
      showSlide(index);
    });
  });

  // Contact form success alert
  const contactForm = document.getElementById("contact-form");
  const contactSuccess = document.getElementById("contact-success");

  if (contactForm && contactSuccess) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (contactForm.checkValidity()) {
        contactSuccess.style.display = "block";
        contactSuccess.textContent = "Thank you! Your message was sent successfully.";
        contactForm.reset();
      }
    });
  }

  // Reflex game
  const gameArea = document.getElementById("game-area");
  const gameTarget = document.getElementById("game-target");
  const gameTimeEl = document.getElementById("game-time");
  const gameScoreEl = document.getElementById("game-score");
  const gameMessageEl = document.getElementById("game-message");
  const gameStartBtn = document.getElementById("game-start");
  const gameResetBtn = document.getElementById("game-reset");

  let gameTimer = null;
  let gameTime = 15;
  let gameScore = 0;
  const winScore = 10;

  function updateHud() {
    if (gameTimeEl) gameTimeEl.textContent = gameTime;
    if (gameScoreEl) gameScoreEl.textContent = gameScore;
  }

  function moveTarget() {
    if (!gameArea || !gameTarget) return;
    const areaRect = gameArea.getBoundingClientRect();
    const size = 40;
    const maxX = areaRect.width - size;
    const maxY = areaRect.height - size;
    const x = Math.random() * maxX;
    const y = Math.random() * maxY;
    gameTarget.style.left = `${x}px`;
    gameTarget.style.top = `${y}px`;
  }

  function endGame() {
    clearInterval(gameTimer);
    gameTimer = null;
    if (gameTarget) gameTarget.style.display = "none";

    if (gameMessageEl) {
      if (gameScore >= winScore) {
        gameMessageEl.textContent = `You win! Score: ${gameScore}`;
        gameMessageEl.style.color = "var(--success)";
      } else {
        gameMessageEl.textContent = `Try again! Score: ${gameScore}`;
        gameMessageEl.style.color = "var(--danger)";
      }
    }
  }

  function startGame() {
    if (!gameArea || !gameTarget) return;
    gameTime = 15;
    gameScore = 0;
    updateHud();
    gameMessageEl.textContent = "Go! Click the target!";
    gameMessageEl.style.color = "var(--text)";
    gameTarget.style.display = "block";
    moveTarget();

    clearInterval(gameTimer);
    gameTimer = setInterval(() => {
      gameTime--;
      updateHud();
      moveTarget();
      if (gameTime <= 0) {
        endGame();
      }
    }, 1000);
  }

  if (gameTarget) {
    gameTarget.addEventListener("click", () => {
      if (!gameTimer) return;
      gameScore++;
      updateHud();
      moveTarget();
    });
  }

  if (gameStartBtn) {
    gameStartBtn.addEventListener("click", startGame);
  }

  if (gameResetBtn) {
    gameResetBtn.addEventListener("click", () => {
      clearInterval(gameTimer);
      gameTimer = null;
      gameTime = 15;
      gameScore = 0;
      updateHud();
      if (gameTarget) gameTarget.style.display = "none";
      if (gameMessageEl) {
        gameMessageEl.textContent = "Click the green circle as many times as you can before time runs out!";
        gameMessageEl.style.color = "var(--text)";
      }
    });
  }
});
