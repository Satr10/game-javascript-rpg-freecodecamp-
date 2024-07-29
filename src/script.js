let xp = 0;
let health = 100;
let gold = 5000;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const weapons = [
    {
        name: "Stick",
        power: 5
    },
    {
        name: "Dagger",
        power: 30
    },
    {
        name: "Claw Hammer",
        power: 50
    },
    {
        name: "Sword",
        power: 100
    }
]

const monsters = [
    {
        name: "Slime",
        level: 2,
        health: 15
    },
    {
        name: "Fanged Beast",
        level: 2,
        health: 60
    },
    {
        name: "Dragon",
        level: 2,
        health: 300
    },
]

const locations = [
    {
        name: "Alun-Alun",
        "button-text": ["Pergi ke toko", "Pergi ke goa", "Lawan Naga"],
        "button-function": [goStore, goCave, fightDragon],
        text: "Anda ada di Alun-Alun anda melihat sebuah plang bertuliskan \'Toko\'"
    },
    {
        name: "Toko",
        "button-text": ["Beli 10 Health (10 gold)", "Beli senjata (30 gold)", "Kembali ke Alun-Alun"],
        "button-function": [buyHealth, buyWeapon, goTown],
        text: "Anda masuk toko"
    },
    {
        name: "Goa",
        "button-text": ["Lawan slime", "Lawan monster bertaring", "Kembali ke Alun-Alun"],
        "button-function": [fightSlime, fightBeast, goTown],
        text: "Anda masuk toko"
    },
    {
        name: "Fight",
        "button-text": ["Serang", "Menghindar", "Kembali ke Alun-Alun"],
        "button-function": [attack, dodge, goTown],
        text: "Sedang bertarung dengan monster"
    },
    {
        name: "Kill monster",
        "button-text": ["Kembali ke Alun-alun", "Kembali ke Alun-alun", "Kembali ke Alun-Alun"],
        "button-function": [goTown, goTown, goTown],
        text: "Monsternya berteriak \"AARGGH\" saat dia mati. Kamu mendapatkan XP dan menemukan gold"
    },
    {
        name: "Kalah",
        "button-text": ["Replay?", "Replay?", "Replay?"],
        "button-function": [restart, restart, restart],
        text: "Kamu mati ☠️☠️☠️"
    },
]

updateText();

function update(location) {
    button1.innerText = location["button-text"][0];
    button2.innerText = location["button-text"][1];
    button3.innerText = location["button-text"][2];
    button1.onclick = location["button-function"][0];
    button2.onclick = location["button-function"][1];
    button3.onclick = location["button-function"][2];
    text.innerText = location.text;
    monsterStats.style.display = "none";
}

function goTown() {
    update(locations[0]);
}

function goStore() {
    update(locations[1]);
}
function goCave() {
  update(locations[2]);
}

function buyHealth() {
    if (gold >= 10) {
        gold -= 10;
        health += 10;
        updateText();
    }
    else {
        text.innerText = "Anda tidak memiliki uang untuk membeli health";
    }

}
function buyWeapon() {
    if (currentWeapon < weapons.length - 1) {
        if (gold >= 30) {
            gold -= 30;
            currentWeapon ++;
            let newWeapon = weapons[currentWeapon];
            text.innerText = "Anda membeli senjata baru " + newWeapon.name + ", dengan power"+ newWeapon.power +".";
            inventory.push(newWeapon.name);
            updateText();
            text.innerText += "\nDi penyimpanan kamu memiliki " + inventory;
        }
        else {
            text.innerText = "Anda tidak memiliki uang untuk membeli senjata";
        }
    }
    else {
        text.innerText = "Sudah Maksimal";
        button2.innerText = "Jual senjata untuk 15gold";
        button2.onclick = sellWeapon;
    }
}

function sellWeapon() {
    if (inventory.length > 1) {
        gold+=10
        goldText.innerText = gold;
        let currentWeapon = inventory.shift();
        text.innerText = "Kamu menjual" + currentWeapon;
        text.innerText += "\nDi penyimpanan kamu memiliki " + inventory;
    }
    else {
        text.innerText = "Jangan jual senjata satu satunya milik kamu!!!"
    }
}

function fightSlime() {
    fighting = 0;
    goFight();
}

function fightBeast() {
    fighting = 1;
    goFight();
}
function goFight() {
    update(locations[3]);
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = "flex";
    monsterNameText.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsterHealth;
}

function attack() {
    text.innerText = monsters[fighting].name + " menyerang.";
    text.innerText += "\nKamu menyerang dengan " + weapons[currentWeapon].name + ".";
    health -= monsters[fighting].level;
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
    updateText();
    monsterHealthText.innerText = monsterHealth
    if (health <= 0) {
        lose();
    } else if (monsterHealth <= 0) {
        defeatMonster();
    }
}

function defeatMonster() {
    gold += Math.floor(monsters[fighting].level * 6.7);
    xp += monsters[fighting].level;
    updateText();
    update(locations[4])
}

function lose() {

}

function dodge() {

}

function fightDragon() {
    fighting = 2;
    goFight();
}

function restart() {

}

function updateText() {
    xpText.innerHTML = xp;
    healthText.innerText = health;
    goldText.innerText = gold;
}

button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;