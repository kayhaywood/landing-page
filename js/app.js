/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const navBarList = document.getElementById('navbar__list');
const sections = document.querySelectorAll('section');

/**
 * End Global Variables
 */

// Build the navigation menu
sections.forEach(section => { // Loop through each section
  //retrieve section attributes
  const sectionId = section.id;
  const sectionDataNav = section.dataset.nav
  // Create <li> and <a> elements
  const navListItem = document.createElement('li');
  const navMenuLink = document.createElement('a');
  // Set attributes and content for <a>
  navMenuLink.textContent = sectionDataNav;
  navMenuLink.href = `#${sectionId}`;
  navMenuLink.className = 'menu__link';
  // Add click event listener for smooth scrolling
  navMenuLink.addEventListener('click', (event) => {
    event.preventDefault();
    section.scrollIntoView({ behavior: 'smooth' });
  });

  // Append <a> to <li>, then <li> to the navbar
  navListItem.appendChild(navMenuLink);
  navBarList.appendChild(navListItem);
});

// Helper function to toggle active states
const setActiveSection = () => {
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    const navMenuLink = document.querySelector(`a[href="#${section.id}"]`);
    // Check if section is in viewport
    if (rect.top >= -50 && rect.top <= 300) {
      // Add active class to section and highlight nav link
      section.classList.add('active');
      navMenuLink.classList.add('active_link');
    } else {
      // Remove active class from the section and remove highlight from nav link
      section.classList.remove('active');
      navMenuLink.classList.remove('active_link');
    }
  });
};

// Attach scroll event listener
document.addEventListener('scroll', setActiveSection);

// Let Nav hide when not scrolling
let navTimeout;
document.addEventListener('scroll', () => {
  navBarList.style.display = 'block'; // Make Navbar visible while scrolling
  clearTimeout(navTimeout); // Reset timer when scroll starts again
  navTimeout = setTimeout(() => {
    navBarList.style.display = 'none'; // Hide the Navbar after 2 seconds of inactivity
  }, 2000);
});