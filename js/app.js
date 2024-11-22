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
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
const navBarList = document.getElementById('navbar__list');
const sections = document.querySelectorAll('section');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
/**
 * Checks if a section is in the viewport
 * @param {HTMLElement} section 
 * @returns {boolean}
 */
const isInViewport = (section) => {
    const rect = section.getBoundingClientRect();
    // Adjust the range for better detection
    return rect.top >= -150 && rect.top <= 150;
};

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/
/**
 * Builds the navigation dynamically based on the sections
 */
const buildNavigation = () => {
    sections.forEach((section) => {
        const navBarItem = document.createElement('li');
        navBarItem.innerHTML = `<a href="#${section.id}" class="menu__link">${section.dataset.nav}</a>`;
        navBarList.appendChild(navBarItem);
    });
};

/**
 * Highlights the active section and its corresponding navigation link
 */
const setActiveSection = () => {
    sections.forEach((section) => {
        const navLink = document.querySelector(`a[href="#${section.id}"]`);
        if (isInViewport(section)) {
            section.classList.add('active'); // Highlight the active section
            navLink.classList.add('active_link'); // Highlight the nav link
        } else {
            section.classList.remove('active'); // Remove highlight from inactive sections
            navLink.classList.remove('active_link'); // Remove highlight from inactive links
        }
    });
};

/**
 * Scrolls to the section when clicking on the nav link
 * @param {Event} event 
 */
const scrollToSection = (event) => {
    event.preventDefault();
    const targetSectionId = event.target.getAttribute('href').slice(1);
    const targetSection = document.getElementById(targetSectionId);
    targetSection.scrollIntoView({ behavior: 'smooth' });
};

/**
 * End Main Functions
 * Begin Events
 * 
*/

// build the nav
buildNavigation();

// Scroll to section on link click
navBarList.addEventListener('click', (event) => {
    if (event.target.nodeName === 'A') {
        scrollToSection(event);
    }
});

// Set sections as active
document.addEventListener('scroll', setActiveSection);

