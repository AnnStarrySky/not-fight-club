"use strict"

const menuSection = document.querySelectorAll('.section__item');
const menuNavigation = document.querySelectorAll('.nav__item');

const btnDone = document.querySelector('.home__btn');
const btnNext = document.querySelector('.heroes__btn');

let currentIndex = 0;

function activeNav(index) {
    menuNavigation.forEach((nav, i) => {
        nav.classList.toggle('active', i === index);
    });
}

function hiddenSections() {
    menuSection.forEach(section => {
        section.style.display = 'none';
    });
}

function showSection(index) {
    hiddenSections();
    menuSection[index].style.display = 'flex';
    activeNav(index);
    currentIndex = index;
}

btnDone.addEventListener('click', (e) => {
    e.preventDefault();
    hiddenSections();
    showSection(currentIndex + 1);
    activeNav(currentIndex);
})

btnNext.addEventListener('click', (e) => {
    e.preventDefault();
    hiddenSections();
    showSection(currentIndex + 1);
    activeNav(currentIndex);
})

menuNavigation.forEach((nav, index) => {
    nav.addEventListener('click', (e) => {
        e.preventDefault();
        showSection(index);
    });
});