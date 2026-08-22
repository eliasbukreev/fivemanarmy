// featured-work.js

// Import GSAP and ScrollTrigger plugin
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Choose which project images appear in the featured carousel and in what order.
const FEATURED_WORK_IMAGES = [1, 2, 3, 5];
const FEATURED_WORK_COUNT = FEATURED_WORK_IMAGES.length;

// Wait for DOM to fully load before executing
document.addEventListener("DOMContentLoaded", () => {
  // Check if current page is the homepage; exit if not
  const isHomePage = document.querySelector(".page.home-page");
  if (!isHomePage) return;

  // Register ScrollTrigger plugin with GSAP
  gsap.registerPlugin(ScrollTrigger);

  let scrollTriggerInstance = null; // Stores ScrollTrigger instance for cleanup

  // Initialize animations
  const initAnimations = () => {
    // Disable animations on small screens (width <= 1000px)
    if (window.innerWidth <= 1000) {
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill(); // Clean up existing ScrollTrigger
        scrollTriggerInstance = null;
      }
      return;
    }

    // Kill existing ScrollTrigger instance to prevent duplicates
    if (scrollTriggerInstance) {
      scrollTriggerInstance.kill();
    }

    // Create section indicators (e.g., "01", "02", ..., "04") and progress dots
    const indicatorContainer = document.querySelector(".featured-work-indicator");
    indicatorContainer.innerHTML = ""; // Clear existing content
    for (let section = 1; section <= FEATURED_WORK_COUNT; section++) {
      // Add section number
      const sectionNumber = document.createElement("p");
      sectionNumber.className = "mn";
      sectionNumber.textContent = `0${section}`;
      indicatorContainer.appendChild(sectionNumber);
      // Add 10 progress indicators per section
      for (let i = 0; i < 10; i++) {
        const indicator = document.createElement("div");
        indicator.className = "indicator";
        indicatorContainer.appendChild(indicator);
      }
    }

    // Set up featured titles container
    const featuredTitles = document.querySelector(".featured-titles");
    const moveDistance = window.innerWidth * 4; // Distance for title movement

    // Store card positions as fractions of the featured-images canvas.
    const featuredCardPosSmall = [
      { y: 0.39, x: 0.58 },
      { y: 0.6333333, x: 0.5347222 },
      { y: 0.3944444, x: 0.5770833 },
      { y: 0.5333333, x: 0.3951389 },
    ];
    const featuredCardPosLarge = [
      { y: 0.39, x: 0.58 },
      { y: 0.6333333, x: 0.5347222 },
      { y: 0.3944444, x: 0.5770833 },
      { y: 0.5333333, x: 0.3951389 },
    ];
    const featuredCardPos =
      window.innerWidth >= 1600 ? featuredCardPosLarge : featuredCardPosSmall;

    // Create image cards dynamically
    const imagesContainer = document.querySelector(".featured-images");
    imagesContainer.innerHTML = ""; // Clear existing content
    FEATURED_WORK_IMAGES.forEach((imageNumber, index) => {
      const featuredImgCard = document.createElement("div");
      featuredImgCard.className = `featured-img-card featured-img-card-${index + 1}`;
      const img = document.createElement("img");
      img.src = `/images/work-items/work-item-${imageNumber}.webp`;
      img.loading = "lazy";
      img.decoding = "async";
      img.alt = `featured work image ${imageNumber}`;
      featuredImgCard.appendChild(img);
      imagesContainer.appendChild(featuredImgCard);

      const position = featuredCardPos[index];
      gsap.set(featuredImgCard, {
        x: position.x * imagesContainer.offsetWidth - featuredImgCard.offsetWidth / 2,
        y: position.y * imagesContainer.offsetHeight - featuredImgCard.offsetHeight / 2,
      });
    });

    // Initialize image cards with hidden and scaled-down state
    const featuredImgCards = document.querySelectorAll(".featured-img-card");
    const easeInOut = gsap.parseEase("power2.inOut");
    featuredImgCards.forEach((featuredImgCard) => {
      gsap.set(featuredImgCard, {
        scale: 0.8,
        opacity: 0,
      });
    });

    // Create ScrollTrigger for animation
    scrollTriggerInstance = ScrollTrigger.create({
      trigger: ".featured-work", // Trigger element
      start: "top top", // Start when top of trigger hits top of viewport
      end: `+=${window.innerHeight * 5}px`, // Extend scroll distance
      pin: true, // Pin section during scroll
      scrub: 1, // Smoothly tie animations to scroll position
      onUpdate: (self) => {
        // Move titles horizontally based on scroll progress
        const xPosition = -moveDistance * self.progress;
        gsap.set(featuredTitles, {
          x: xPosition,
        });

        // Show one image at a time: enter, hold, then leave before the next.
        featuredImgCards.forEach((featuredImgCard, index) => {
          const cardStart = index / FEATURED_WORK_COUNT;
          const cardProgress = Math.max(
            0,
            Math.min(1, (self.progress - cardStart) * FEATURED_WORK_COUNT),
          );
          const enterEnd = 0.3;
          const exitStart =
            index === FEATURED_WORK_COUNT - 1 ? 1.1 : 0.7;
          let scale = 0.8;
          let opacity = 0;

          if (cardProgress > 0 && cardProgress < enterEnd) {
            const progress = easeInOut(cardProgress / enterEnd);
            scale = 0.8 + 0.2 * progress;
            opacity = progress;
          } else if (cardProgress >= enterEnd && cardProgress <= exitStart) {
            scale = 1;
            opacity = 1;
          } else if (cardProgress > exitStart) {
            const progress = easeInOut(
              (cardProgress - exitStart) / (1 - exitStart),
            );
            scale = 1 - 0.2 * progress;
            opacity = 1 - progress;
          }

          gsap.set(featuredImgCard, {
            scale: scale,
            opacity: opacity,
          });
        });

        // Update indicator opacity based on scroll progress
        const indicators = document.querySelectorAll(".indicator");
        const totalIndicators = indicators.length;
        const progressPerIndicator = 1 / totalIndicators;
        indicators.forEach((indicator, index) => {
          const indicatorStart = index * progressPerIndicator;
          const indicatorOpacity = self.progress > indicatorStart ? 1 : 0.2;
          gsap.to(indicator, {
            opacity: indicatorOpacity,
            duration: 0.3, // Smooth opacity transition
          });
        });
      },
    });
  };

  // Run animations on page load
  initAnimations();

  // Re-run animations on window resize to recalculate positions and trigger points
  window.addEventListener("resize", () => {
    initAnimations();
    ScrollTrigger.refresh();
  });
});
