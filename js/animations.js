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


// Function to reveal what we offer cards smoothly on scroll with animations
function revealCardsOnScroll2() {
  const cards = document.querySelectorAll('.wow'); // Select all elements with the 'wow' class
  
  cards.forEach((card) => {
      const cardTop = card.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      // Check if the card is in view (with a small offset for smooth entry)
      if (cardTop < windowHeight - 100 && !card.classList.contains('animated')) {
          // Add the appropriate animation class based on the card's current class
          if (card.classList.contains('slideInDown')) {
              card.classList.add('wow-slideInDown');
          } else if (card.classList.contains('fadeInUp')) {
              card.classList.add('wow-fadeInUp');
          }
          
          // Mark the card as animated to prevent re-triggering
          card.classList.add('animated');
      }
  });
}

// Trigger the animation on scroll
window.addEventListener('scroll', revealCardsOnScroll2);

// Call the function initially to handle cards in view when the page is loaded
document.addEventListener('DOMContentLoaded', revealCardsOnScroll2);

//--------Animation handling for steps section--------------------------------
// Select all elements with the "wow" class
const animatedElements = document.querySelectorAll('.wow');

// Function to check if elements are in the viewport
function animateOnScroll() {
  animatedElements.forEach((element) => {
    const position = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    // Trigger animation when the element is in the viewport
    if (position < windowHeight - 100) {
      element.classList.add('show-card');  // Add the class to start animation
    }
  });
}

// Run the function on scroll only
window.addEventListener('scroll', animateOnScroll);


// function revealOnScroll() {
//   const cards = document.querySelectorAll('.step-card ');
  
//   cards.forEach((card) => {
//       const cardTop = card.getBoundingClientRect().top;
//       const windowHeight = window.innerHeight;
      
//       if (cardTop < windowHeight - 100) {
//           card.classList.add('show-card');
//       }
//   });
// }

// // Trigger the animation on scroll and page load
// window.addEventListener('scroll', revealOnScroll);
// revealOnScroll();
