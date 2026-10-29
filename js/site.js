
/*
========================================
JUANITA RICHARDS WEBSITE
SITE ANIMATIONS
========================================

Features:
1. Smooth scroll-in animations
2. Animated publication entries
3. Animated research demonstrations
4. Support for dynamically added videos
5. Respects reduced-motion preferences
*/


(function () {

  "use strict";


  // =====================================
  // 1. ACCESSIBILITY SETTINGS
  // =====================================

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  const supportsObserver =
    "IntersectionObserver" in window;


  // =====================================
  // 2. SET UP SCROLL ANIMATION OBSERVER
  // =====================================

  let observer = null;

  if (!reducedMotion.matches && supportsObserver) {

    observer = new IntersectionObserver(

      function (entries, currentObserver) {

        entries.forEach(function (entry) {

          if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            // Stop observing after animation.
            currentObserver.unobserve(entry.target);

          }

        });

      },

      {
        threshold: 0.08,
        rootMargin: "0px 0px -30px 0px"
      }

    );

  }


  // =====================================
  // 3. REGISTER ELEMENTS FOR ANIMATION
  // =====================================

  function initializeAnimations() {

    const elements = document.querySelectorAll(
      ".reveal, " +
      ".research-demo, " +
      ".paper-entry, " +
      ".paper, " +
      ".project"
    );

    elements.forEach(function (element) {

      // Prevent registering elements twice.
      if (element.dataset.revealInitialized === "true") {
        return;
      }

      element.dataset.revealInitialized = "true";

      // No animation when reduced motion is enabled.
      if (reducedMotion.matches || !observer) {

        element.classList.add("visible");

        return;

      }

      // Apply the reveal class.
      element.classList.add("reveal");

      // Start observing.
      observer.observe(element);

    });

  }


  // =====================================
  // 4. INITIALIZE ON PAGE LOAD
  // =====================================

  if (document.readyState === "loading") {

    document.addEventListener(
      "DOMContentLoaded",
      initializeAnimations
    );

  } else {

    initializeAnimations();

  }


  // =====================================
  // 5. HANDLE DYNAMIC RESEARCH VIDEOS
  // =====================================

  document.addEventListener(
    "researchDemosRendered",

    function () {

      initializeAnimations();

    }
  );


  // =====================================
  // 6. HANDLE BROWSER BACK/FORWARD
  // =====================================

  window.addEventListener("pageshow", function () {

    initializeAnimations();

  });


  // =====================================
  // 7. HANDLE REDUCED MOTION CHANGES
  // =====================================

  reducedMotion.addEventListener("change", function (event) {

    const elements = document.querySelectorAll(
      ".reveal"
    );

    if (event.matches) {

      elements.forEach(function (element) {

        element.classList.add("visible");

        if (observer) {
          observer.unobserve(element);
        }

      });

    } else {

      elements.forEach(function (element) {

        element.dataset.revealInitialized = "false";

      });

      initializeAnimations();

    }

  });

})();
