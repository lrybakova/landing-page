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
let sections = document.querySelectorAll('section')

/**
 * End Global Variables
 * Begin Main Functions
 * 
 */

// build the nav

var view = {
    buildNav: function() {
        sections.forEach(function(section, position) {
            var navLi = document.createElement('li');
            var navUl = document.querySelector('ul');
            navLi.classList.add('menu__link', section.id);
            navLi.appendChild(this.createAnchore(section.id, section.dataset.nav));
            navUl.appendChild(navLi);

        }, this);

    },

    createAnchore: function(href, text) {
        var navAnchore = document.createElement('a');
        navAnchore.href = 'index.html#' + href;
        navAnchore.textContent = text;
        return navAnchore;
    },

    setUpEventListeners: function() {
        var navUl = document.querySelector('ul');
        navUl.addEventListener('click', function(event) {

            event.preventDefault();
            var elementClicked = event.target;
            if (elementClicked.tagName === 'A') {
                scroller.scrollIntoView(elementClicked.parentNode.classList[1]);
            }
        });
    }

}

view.buildNav();
view.createAnchore();
view.setUpEventListeners();



// Add class 'active' to dedicated nav item and section when section is scrolled near top of viewport



function changeLinkState() {
    let index = sections.length;
    let links = document.querySelectorAll('.menu__link');

    if (window.scrollY === 0) {
        links.forEach((link) => link.classList.remove('active')); // menu isn't highlighted when page is scrolled to top

    } else { // when user scrolls down we check each section and assign active class to the one on top and to corresponding nav element

        while (--index && window.scrollY + 50 < sections[index].offsetTop) {}

        links.forEach((link) => link.classList.remove('active'));
        links[index].classList.add('active');

        sections.forEach((section) => section.classList.remove('your-active-class'));
        sections[index].classList.add('your-active-class');
    }
}

changeLinkState();
window.addEventListener('scroll', changeLinkState);


// Scroll to anchor ID using scrollTO event

var scroller = {

    scrollIntoView: function(id) { //to be used inside the var object, because there we know which item was clicked and can pass it here for scroll

        document.getElementById(id).scrollIntoView({ behavior: "smooth" });
    }

}

/**
 * End Main Functions
 */