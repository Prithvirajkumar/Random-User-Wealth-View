const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

getRandomUser();

// fetch random user and add money 
async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();
    const user = data.results[0];
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    };
    addData(newUser);
}

// double money function 
function doubleMoney() {
    data = data.map(user => {
        return { ...user, money: user.money * 2 };
    });
    updateDOM();
}

// show mill function 
function showMillionaires() {
    data = data.filter(user => user.money > 1000000);
    updateDOM();
}

// sort by richest 
function sortByRichest() {
    data = data.sort((a,b) => b.money - a.money);
    updateDOM();
}

//  calculate wealth 
function calculateWealth() {
    const wealth = data.reduce((acc, user) => (acc += user.money), 0 );
    const wealthElement = document.createElement('div');
    wealthElement.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
    main.appendChild(wealthElement);
}

// add data function 
function addData(obj) {
    data.push(obj);
    updateDOM();
}

// update DOM function 
function updateDOM(providedData = data) {
    // clear the main div 
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';
    providedData.forEach(person => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${person.name}</strong> ${formatMoney(person.money)}`;
        main.appendChild(element);
    });
}

// format number as money 
function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Event Listeners 
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);