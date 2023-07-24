let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let monsterAttack;
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
    name: "stick",
    power: 5
  },
  {
    name: "dagger",
    power: 30
  },
  {
    name: "claw hammer",
    power: 50
  },
  {
    name: "sword",
    power: 100
  },
];

const locations = [
  {
    name: "town square",
    "button text": ["Go to store", "Go to cave", "Fight dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: "You are in the town square. You see a sign that says \"store\"."
  },
  {
    name: "store",
    "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
    "button functions": [buyHealth, buyWeapon, goToTownSquare],
    text: "You entered the store."
  },
  {
    name: "cave",
    "button text": ["Fight slime", "Fight fanged beast", "Run"],
    "button functions": [fightSlime, fightBeast, goToTownSquare],
    text: "You entered the cave. Monsters surround you."
  },
  {
    name: "infirmary",
    "button text": ["Pay for healthcare (10 gold)", " ", " "],
    "button functions": [reset, null, null],
    text: "You fainted during the intense fight. Try again next time."
  },
  {
    name: "slime hole",
    "button text": ["Attack", "Block", "Run"],
    "button functions": [attack, block, run],
    text: "You engage the slime."
  },
  {
    name: "Beast arena",
    "button text": ["Attack", "Block", "Run"],
    "button functions": [attack, block, run],
    text: "You engage the beast."
  }
];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];

  text.innerText = location["text"];

  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
}

function goToTownSquare() {
  update(locations[0]);
}

function goStore() {
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
}

function goInfirmary() {
  update(locations[3]);
}

function fightSlime() {
  monsterStats.remove("display");

  monsterAttack = 5;
  monsterHealth = 100;
  monsterNameText.innerText = "slimey";
  monsterHealthText.innerText = monsterHealth;

  update(locations[4]);
}

function fightBeast() {
  monsterAttack = 20;
  monsterHealth = 200;
  monsterNameText.innerText = "beasty";
  monsterHealthText.innerText = monsterHealth;

  update(locations[5]);
}

function buyHealth() {
  if (gold >= 10) {
    health += 10;
    gold -= 10;
    healthText.innerText = health;
    goldText.innerText = gold;
    text.innerText = "You feel rejuvenated! +10 health!"
  } else {
    text.innerText = "Not enough gold for health!";
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      goldText.innerText = gold;
      currentWeapon++;

      let newWeapon = weapons[currentWeapon].name;
      inventory.push(newWeapon);

      text.innerText = "You now have a " + newWeapon + ". " +
        "In your inventory you have: " + inventory;
    } else {
      text.innerText = "Not enough gold for new weapons!";
    }
  } else {
    text.innerText = "You already have the most powerful weapon.";
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
  }
}

function attack() {
  if (health <= 0) {
    goInfirmary();
  } 

  monsterHealth -= weapons[currentWeapon].power;
  text.innerText = "Attack! Dealt " + weapons[currentWeapon].power + " damage! It attacks you with " + monsterAttack + "damage.";
  monsterHealthText.innerText = monsterHealth;
  health -= monsterAttack;
  healthText.innerText = health;

  if (monsterHealth <= 0) {
    text.innerText = "You have defeated the enemy." + " You have earned 20 Gold.";
    gold += 20;
    goldText.innerText = gold;
    goCave();
  }
}

function block() {
  text.innerText = "You blocked the attack, mostly. " + "It attacks you, dealing " + (monsterAttack / 2) + "damage.";
  health -= monsterAttack / 2;
  healthText.innerText = health;
}

function run() {
  goToTownSquare();
}

function fightDragon() {
  console.log("Fighting dragon.");
}

function reset() {
  health = 100;
  gold = 50;
  currentWeapon = 0;

  goToTownSquare();
}
