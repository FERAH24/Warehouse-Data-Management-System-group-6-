const sections = document.querySelectorAll("section")
const navLinks = document.querySelectorAll("nav a")

window.addEventListener("scroll", () => {
    let current = " ";
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute("id")
        }
    
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === "#" + current) {
            link.classList.add('active')
        }
    });
});

const hamburger = document.querySelector(".hamburger");
const navItems = document.querySelector(".nav-items");

// this is to activate the hamburger to display the nav menu when clicked
hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navItems.classList.toggle("active");


})

// this is to active the closing of the nav menu when any of the nav items or nav link is clicked