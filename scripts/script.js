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
    this.attackArea = [];
    this.protectArea = [];
    }

    randomAttackArea(max) {
    const area = ['hat', 'head', 'body', 'hands', 'legs']; 
    const attackArea = []; 

    while (attackArea.length < max) { 
    const randomIndex = Math.floor(Math.random() * area.length); 
    const selectedArea = area[randomIndex];

    if (!attackArea.includes(selectedArea)) {
        attackArea.push(selectedArea); 
        }
    }

    this.attackArea = attackArea; 
    }

    randomProtectArea(max) {
    const area = ['hat', 'head', 'body', 'hands', 'legs']; 
    const protectArea = []; 

    while (protectArea.length < max) { 
    const randomIndex = Math.floor(Math.random() * area.length); 
    const selectedArea = area[randomIndex];

    if (!protectArea.includes(selectedArea)) {
        protectArea.push(selectedArea); 
        }
    }

    this.protectArea = protectArea; 
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

        attackLimit.textContent = activeHero.balls;
        protectLimit.textContent = activeHero.protection;

        resetCheckbox(attackCheckboxes);
        resetCheckbox(protectCheckboxes);
        
        updateAllCards(activeHero);
        
        if (!currentOpponent) {
            currentOpponent = randomHero();
            updateOpponent(currentOpponent);
        }

        limitCheckboxes(attackCheckboxes, activeHero.balls);
        limitCheckboxes(protectCheckboxes, activeHero.protection);
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
    currentOpponent = randomHero();
    updateOpponent(currentOpponent);
});

/* checkbox */

const attackLimit = document.querySelector('.checkbox__attack .balls__number');
const protectLimit = document.querySelector('.checkbox__protection .protection__number');

const attackCheckboxes = document.querySelectorAll('.attack input');
const protectCheckboxes = document.querySelectorAll('.protection input');

function limitCheckboxes(checkboxes, max) {
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const parent = checkbox.closest('.attack, .protection');
            const checkedCheckboxes = parent.querySelectorAll('input:checked').length;
            if (checkedCheckboxes >= max) {
                checkboxes.forEach(cb => {
                    if (!cb.checked) {
                        cb.disabled = true;
                    }
                }); 
            } else {
                checkboxes.forEach(cb => {
                    if (cb.disabled) {
                        cb.disabled = false;
                    }
                }); 
            } 
        }); 
    }); 
} 

function resetCheckbox(checkboxes) {
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
        checkbox.disabled = false;
    });
}

limitCheckboxes(attackCheckboxes, Heroes[0].balls);
limitCheckboxes(protectCheckboxes, Heroes[0].protection);
attackLimit.textContent = Heroes[0].balls;
protectLimit.textContent = Heroes[0].protection;


/* fight */

let currentOpponent = null;

function playerAttack() {
    const checkedAttack = document.querySelectorAll('.attack input:checked');
    return Array.from(checkedAttack).map(checkbox => checkbox.value.toLowerCase());
}

function playerProtect() {
    const checkedProtect = document.querySelectorAll('.protection input:checked');
    return Array.from(checkedProtect).map(checkbox => checkbox.value.toLowerCase());
}

function calculateDamage(attacker, defender, attackArea, protectArea) {
    const damage = 20; 
    let totalDamage = 0;

    attackArea.forEach(area => {
        if (!protectArea.includes(area)) {
            totalDamage += damage;
        }
    });

    defender.health = Math.max(defender.health - totalDamage, 0);
}

function startFight() {
    const clearElements = document.querySelectorAll('.attack__info, .protect__info, .damage__info-player, .damage__info-opponent');
    clearElements.forEach(element => element.textContent = '');

    const activeCard = document.querySelector('.heroes__card.active');
    const playerHero = Heroes.find(hero => hero.name === activeCard.querySelector('img').alt);
    const opponentHero = currentOpponent;

    const playerAttackAreas = playerAttack();
    const playerProtectAreas = playerProtect();

    opponentHero.randomAttackArea(opponentHero.balls);
    opponentHero.randomProtectArea(opponentHero.protection);

    const playerHealthBefore = playerHero.health;
    const opponentHealthBefore = opponentHero.health;

    calculateDamage(playerHero, opponentHero, playerAttackAreas, opponentHero.protectArea);
    calculateDamage(opponentHero, playerHero, opponentHero.attackArea, playerProtectAreas);

    fightEnd(playerHero, opponentHero);

    updateFightHistory(
        playerHero,
        opponentHero,
        opponentHero.attackArea,
        opponentHero.protectArea,
        playerHealthBefore,
        opponentHealthBefore
    );

    updateAllCards(playerHero);
    updateOpponent(opponentHero);
}


function updateFightHistory(
    playerHero,
    opponentHero,
    opponentAttackAreas,
    opponentProtectAreas,
    playerHealthBefore,
    opponentHealthBefore
) {
    document.querySelector('.attack__info').textContent = opponentAttackAreas.join(', ') || 'none';
    document.querySelector('.protect__info').textContent = opponentProtectAreas.join(', ') || 'none';
    
    const playerDamage = opponentHealthBefore - opponentHero.health;
    const opponentDamage = playerHealthBefore - playerHero.health;
    
    document.querySelector('.damage__info-player').textContent = Math.max(playerDamage, 0);
    document.querySelector('.damage__info-opponent').textContent = Math.max(opponentDamage, 0);

    
}

const fightBtn = document.querySelector('.fight__btn');
fightBtn.addEventListener('click', () => {
    startFight();
    stopOther();
});

function stopOther(){
    opponentBtn.disabled = true;
    menuNavigation.forEach(nav => nav.style.pointerEvents = 'none');
}

function activeOther(){
    menuNavigation.forEach(nav => nav.style.pointerEvents = 'auto');
    opponentBtn.disabled = false;
}

menuNavigation.forEach(item => {
    item.addEventListener('click', e => {
        if (navBlock) e.preventDefault();
    });
});

/* wins/loses */

function fightEnd(player, opponent) {
    if (player.health <= 0 || opponent.health <= 0) {
        const resultElement = document.querySelector('.fight__result');
        const resultText = resultElement.querySelector('.result__text');

        if (player.health <= 0 && opponent.health <= 0) {
            resultText.textContent = 'Draw!';
        } else if (player.health <= 0) {
            resultText.textContent = 'You lose!';
        } else {
            resultText.textContent = 'You win!';
        }

        resultElement.classList.remove('hidden');
        document.querySelector('.fight__btn').disabled = true;

        return true;
    }
    return false;
}

function resetHeroes() {

    const activeCard = document.querySelector('.heroes__card.active');
    const playerHero = Heroes.find(hero => hero.name === activeCard.querySelector('img').alt);
    const opponentHero = currentOpponent;

    Heroes.forEach(hero => {
        hero.health = hero.maxHealth;
    });

    currentOpponent.health = currentOpponent.maxHealth;

    document.querySelectorAll('.attack__info, .protect__info, .damage__info-player, .damage__info-opponent')
        .forEach(el => el.textContent = '');

    resetCheckbox(attackCheckboxes);
    resetCheckbox(protectCheckboxes);

    updateAllCards(playerHero);
    updateOpponent(opponentHero);
}

const btnFightEnd = document.querySelector('.result__done');

btnFightEnd.addEventListener('click', () => {
    document.querySelector('.fight__result').classList.add('hidden');
    document.querySelector('.fight__btn').disabled = false;
    resetHeroes();
    activeOther();
});