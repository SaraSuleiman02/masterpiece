// Function to reveal cards smoothly on scroll
function revealCardsOnScroll() {
  const cards = document.querySelectorAll('.priv-card');
  
  cards.forEach((card) => {
      const cardTop = card.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (cardTop < windowHeight - 100) {
          card.classList.add('show-card');
      }
  });
}

// Trigger the animation on scroll and page load
window.addEventListener('scroll', revealCardsOnScroll);
revealCardsOnScroll();