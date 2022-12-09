const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionaireBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

// Fetch

async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();

    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    }
    return newUser;
}

// Add New User

async function addNewUser() {
    const newUser = await getRandomUser();
    data.push(newUser);

    updateDOM();
}

// update DOM

function updateDOM() {
    main.innerHTML = '<h1><strong>Person</strong> Wealth</h1>'
    data.forEach((newUser) => {
        main.innerHTML += `<h3><strong>${newUser.name}</strong> ${formatMoney(newUser.money)}</h3>`
    });
}

// Format Money

function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Double Money

function doubleMoney() {
    data = data.map((user) => {
        return {
            ...user,
            money: user.money * 2
        }
    })
    updateDOM();
}

// Sort User By Money

function sortByRichest() {
    data.sort((a, b) => b.money - a.money);
    updateDOM();
}

// Show all the millionaire

function showMillionaire() {
    data = data.filter(user => user.money >= 1000000);
    updateDOM();
}

// calculate Total Wealth

function calculateWealth() {
    const wealth = data.reduce((acc, user) => (acc + user.money), 0);

    main.innerHTML += `<h3 style="background: #fff"><strong>Total :</strong> ${formatMoney(wealth)}</h3>`;
}

// Event Listeners

addUserBtn.addEventListener('click', addNewUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionaireBtn.addEventListener('click', showMillionaire);
calculateWealthBtn.addEventListener('click', calculateWealth);
