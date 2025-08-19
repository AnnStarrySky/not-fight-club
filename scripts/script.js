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
    changePlayerName();
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

/* playerName */

const nameInput = document.querySelector('.home__name-heroes-input');
const nameHero = document.querySelectorAll('.hero__name');

let playerName = JSON.parse(localStorage.getItem('playerName')) || '';
nameInput.value = playerName;

function updatePlayerName() {
    nameInput.value = '';
    localStorage.removeItem('playerName');
}

function changePlayerName() {
    playerName = nameInput.value.trim();
    if (playerName){
        localStorage.setItem('playerName', JSON.stringify(playerName));
    }
    nameHero.forEach(e => {
        e.textContent = '';
        e.textContent = playerName;
    })
}

nameInput.addEventListener('keypress', function(e) {
    if (e.keyCode === 13) {
        hiddenSections();
        showSection(currentIndex);
        activeNav(currentIndex);
        changePlayerName();
    }
});


/* heroes */

const balls = document.querySelector('.heroes__collection .balls__number');
const protection = document.querySelector('.heroes__collection .protection__number');

class Hero {
    constructor({
    name,
    health,
    balls,
    protection
    })
    {
    this.name = name;
    this.health = health;
    this.maxHealth = health; 
    this.balls = balls;
    this.protection = protection;
    this.avatar = heroIcon[name];
    }
}

const heroIcon = {
    pacman: 'img/pacman.jpeg',
    knight: 'img/knight.jpeg',
    gin: 'img/gin.jpeg',
    fairy: 'img/fairy.jpeg',
    bigfoot: 'img/bigfoot.jpeg',
    dragon: 'img/dragon.jpeg',
    spider: 'img/spider.jpeg',
    ghost: 'img/ghost.jpeg'
};

const Heroes = [
    new Hero({
    name: 'pacman',
    health: 100,
    maxHealth: 100, 
    balls: 2,
    protection: 2
    }),
    new Hero({
    name: 'knight',
    health: 140,
    maxHealth: 140, 
    balls: 2,
    protection: 3
    }),
    new Hero({
    name: 'gin',
    health: 120,
    maxhealth: 120,
    balls: 3,
    protection: 1
    }),
    new Hero({
    name: 'fairy',
    health: 100,
    maxhealth: 100,
    balls: 4,
    protection: 1
    }),
    new Hero({
    name: 'bigfoot',
    health: 180,
    maxhealth: 180,
    balls: 3,
    protection: 3
    }),
    new Hero({
    name: 'dragon',
    health: 200,
    maxhealth: 200,
    balls: 3,
    protection: 3
    }),
    new Hero({
    name: 'spider',
    health: 160,
    maxhealth: 160,
    balls: 3,
    protection: 2
    }),
    new Hero({
    name: 'ghost',
    health: 140,
    maxhealth: 140,
    balls: 4,
    protection: 0
    })
];

const heroesContainer = document.querySelector('.display__right');

function createHeroCard(hero) {
    const card = document.createElement('div');
    card.classList.add('heroes__card', 'heroes__collection');
    
    const image = document.createElement('img');
    image.classList.add('display__right-image');
    image.src = hero.avatar;
    image.alt = hero.name;
    
    const ballsInfo = document.createElement('p');
    ballsInfo.classList.add('heroes__descr', 'heroes__balls', 'chewy-regular');
    ballsInfo.innerHTML = `Balls: <span class="balls__number">${hero.balls}</span>`;
    
    const protectionInfo = document.createElement('p');
    protectionInfo.classList.add('heroes__descr', 'heroes__protection', 'chewy-regular');
    protectionInfo.innerHTML = `Protection: <span class="protection__number">${hero.protection}</span>`;
    
    card.appendChild(image);
    card.appendChild(ballsInfo);
    card.appendChild(protectionInfo);
    
    return card;
}

function createHeroes() {
    heroesContainer.innerHTML = '';
    Heroes.forEach(hero => {
        const card = createHeroCard(hero);
        heroesContainer.appendChild(card);
    });
}

createHeroes();

const allAvatars = document.querySelectorAll('.display__left');

function updateAllAvatars(container, hero) {
    const avatarPlayer = container.querySelector('.display__left-image');
    const ballsAvatar = container.querySelector('.balls__number');
    const protectionAvatar = container.querySelector('.protection__number');
    const healthNumber = container.querySelector('.indicator__number');
    
    avatarPlayer.src = hero.avatar;
    ballsAvatar.textContent = hero.balls;
    protectionAvatar.textContent = hero.protection;
    healthNumber.textContent = hero.health + '/' + hero.maxHealth;
}

function updateAllCards(hero) {
    allAvatars.forEach(container => {
        updateAllAvatars(container, hero);
    });
}

const cards = document.querySelectorAll('.display__right .heroes__card');

function activeCard() {
    cards.forEach(card => {
        card.classList.remove('active');
    });
    
    this.classList.add('active');
    const heroName = this.querySelector('img').alt;
    const activeHero = Heroes.find(hero => hero.name === heroName);
    
    if (activeHero) {
        updateAllCards(activeHero);
        let opponent = randomHero();
        updateOpponent(opponent);
    }
}

cards.forEach(card => {
    card.addEventListener('click', activeCard);
});

cards[0].classList.add('active');
updateAllCards(Heroes[0]);

/* opponent */

const opponentCard = document.querySelector('.fight-opponent');
const opponentBtn = document.querySelector('.btn-opponent');

function updateOpponent(hero) {
    const avatarPlayer = opponentCard.querySelector('.display__left-image');
    const ballsAvatar = opponentCard.querySelector('.balls__number');
    const protectionAvatar = opponentCard.querySelector('.protection__number');
    const healthNumber = opponentCard.querySelector('.indicator__number');
    
    avatarPlayer.src = hero.avatar;
    ballsAvatar.textContent = hero.balls;
    protectionAvatar.textContent = hero.protection;
    healthNumber.textContent = hero.health + '/' + hero.maxHealth;
}

function randomHero() {
    const randomIndex = Math.floor(Math.random() * Heroes.length);
    return Heroes[randomIndex];
}

cards[0].classList.add('active');
updateAllCards(Heroes[0]);
updateOpponent(randomHero()); 

opponentBtn.addEventListener('click', function() {
    updateOpponent(randomHero());
});
    


