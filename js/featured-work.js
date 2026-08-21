// featured-work.js

// Import GSAP and ScrollTrigger plugin
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECT_COUNT } from "./project-config.js";

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

    // Create section indicators (e.g., "01", "02", ..., "05") and progress dots
    const indicatorContainer = document.querySelector(".featured-work-indicator");
    indicatorContainer.innerHTML = ""; // Clear existing content
    for (let section = 1; section <= PROJECT_COUNT; section++) {
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

    // Store card positions as fractions of the featured-images canvas.
    // The ratios preserve the existing layouts at 1440x900 and 2560x1440,
    // while allowing the cards to follow the canvas at other resolutions.
    const featuredCardPosSmall = [
      { y: 0.0555556, x: 0.3472222 },
      { y: 0.8333333, x: 0.0347222 },
      { y: 0.6944444, x: 0.6770833 },
      { y: 0.8333333, x: 0.2951389 },
    ];
    const featuredCardPosLarge = [
      { y: 0.2777778, x: 0.9765625 },
      { y: 0.6944444, x: 0.5859375 },
      { y: 0.0833333, x: 0.8691406 },
      { y: 0.4166667, x: 0.6738281 },
    ];
    // Select position set based on screen width
    const featuredCardPos =
      window.innerWidth >= 1600 ? featuredCardPosLarge : featuredCardPosSmall;

    // Set up featured titles container
    const featuredTitles = document.querySelector(".featured-titles");
    const moveDistance = window.innerWidth * 4; // Distance for title movement

    // Create image cards dynamically
    const imagesContainer = document.querySelector(".featured-images");
    imagesContainer.innerHTML = ""; // Clear existing content
    for (let i = 1; i <= PROJECT_COUNT; i++) {
      const featuredImgCard = document.createElement("div");
      featuredImgCard.className = `featured-img-card featured-img-card-${i}`;
      const img = document.createElement("img");
      img.src = `/images/work-items/work-item-${i}.webp`;
      img.loading = "lazy";
      img.decoding = "async";
      img.alt = `featured work image ${i}`;
      featuredImgCard.appendChild(img);
      // Convert the relative position to the current canvas dimensions.
      const position = featuredCardPos[i - 1];
      gsap.set(featuredImgCard, {
        x: position.x * imagesContainer.offsetWidth,
        y: position.y * imagesContainer.offsetHeight,
      });
      imagesContainer.appendChild(featuredImgCard);
    }

    // Initialize image cards with hidden and scaled-down state
    const featuredImgCards = document.querySelectorAll(".featured-img-card");
    featuredImgCards.forEach((featuredImgCard) => {
      gsap.set(featuredImgCard, {
        z: -1500, // Push back in 3D space
        scale: 0, // Scale down to invisible
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

        // Animate image cards (z-position and scale) with stagger
        featuredImgCards.forEach((featuredImgCard, index) => {
          const staggerOffset = index * 0.075; // Delay per card
          const scaledProgress = (self.progress - staggerOffset) * 2; // Adjust progress
          const individualProgress = Math.max(0, Math.min(1, scaledProgress)); // Clamp to [0,1]
          const newZ = -1500 + (1500 + 1500) * individualProgress; // Move from -1500 to 1500
          const scaleProgress = Math.min(1, individualProgress * 10); // Faster scale change
          const scale = Math.max(0, Math.min(1, scaleProgress)); // Clamp scale to [0,1]
          gsap.set(featuredImgCard, {
            z: newZ,
            scale: scale,
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
