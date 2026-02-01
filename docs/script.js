/**
 * Wedding Website - Scroll Animations & Interactions
 */

(function () {
  'use strict';

  // Navigation visibility on scroll
  const nav = document.getElementById('nav');
  const hero = document.getElementById('hero');
  let lastScrollY = 0;

  function handleNavVisibility() {
    const heroBottom = hero.offsetHeight;
    const currentScrollY = window.scrollY;

    if (currentScrollY > heroBottom - 100) {
      nav.classList.add('visible');
    } else {
      nav.classList.remove('visible');
    }

    lastScrollY = currentScrollY;
  }

  // Parallax effect on hero image
  const heroImage = document.querySelector('.hero-image');

  function handleParallax() {
    if (window.scrollY < window.innerHeight) {
      const offset = window.scrollY * 0.3;
      heroImage.style.transform = `scale(1.1) translateY(${offset}px)`;
    }
  }

  // Intersection Observer for reveal animations
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  revealElements.forEach((el) => {
    revealObserver.observe(el);
  });

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const navHeight = nav.offsetHeight;
        const targetPosition =
          targetElement.getBoundingClientRect().top + window.scrollY - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });
      }
    });
  });

  // Scroll event handling with throttle
  let ticking = false;

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleNavVisibility();
        handleParallax();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // Initial call
  handleNavVisibility();
})();
