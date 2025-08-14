"use strict"

const menuSection = document.querySelectorAll('.section__item');
const menuNavigation = document.querySelectorAll('.nav__item');

const homeSection = document.querySelector('.section__home');
const heroesSection = document.querySelector('.section__heroes');
const fightSection = document.querySelector('.section__fight');

const btnChange = document.querySelector('.home__btn');
const btnNext = document.querySelector('.heroes__btn');


btnChange.addEventListener('click', (e) => {
    e.preventDefault();
    updateHidden();
    heroesSection.style.display = 'flex';
})

btnNext.addEventListener('click', (e) => {
    e.preventDefault();
    updateHidden();
    fightSection.style.display = 'flex';
})

function updateHidden(){
    menuSection.forEach(e => e.style.display = 'none');
}


function activeNavigation(n){
}


