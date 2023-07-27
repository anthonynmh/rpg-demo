let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let currentArmour = 0;
let monsterHealth;
let monsterAttack;
let inventory = [" "];

// player stats
const hpText = document.querySelector("#hpText");
const goldText = document.querySelector("#goldText");
const xpText = document.querySelector("#xpText");
const levelText = document.querySelector("#levelText");
const currentWeaponText = document.querySelector("#currentWeaponText");
const attackDamageText = document.querySelector("#attackDamageText");
const armourPowerText = document.querySelector("#armourPowerText");
const locationText = document.querySelector("#locationText");
const inventoryText = document.querySelector("#inventoryText");

// monster stats
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

// controls
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const button4 = document.querySelector("#button4");

// text
const text = document.querySelector("#text");

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
    name: "Rusty Sword",
    power: 50
  },
  {
    name: "Hunter's Sword",
    power: 100
  },
];

const locations = [
  {
    name: "Intersection",
    "button text": ["Go to Town Square", "Go to Monster Mines", "Go to Dragon's Den", "Go to Pier"],
    "button functions": [goToTownSquare, goToMonsterMines, goToDragonDen, goToPier],
    text: "Which road will you take at this intersection?"
  },
  {
    name: "Town Square",
    "button text": ["Go to Weapon Store", "Go to Armour Store", "Go to Infirmary", "Exit Town Square"],
    "button functions": [goToWeaponStore, goToArmourStore, goToInfirmary, goToIntersection],
    text: "You are in the town square. Are you in need of weapons, armour, or healthcare?"
  },
  {
    name: "Weapon Store",
    "button text": ["Buy weapon (30 gold)", "Sell weapon", "Exit store", " "],
    "button functions": [buyWeapon, sellWeapon, goToTownSquare, null],
    text: "You entered the weapon store."
  },
  {
    name: "Armour Store",
    "button text": ["Buy armour (25 gold)", "Sell armour", "Exit store", " "],
    "button functions": [buyArmour, sellArmour, goToTownSquare, null],
    text: "You entered the armour store."
  },
  {
    name: "Infirmary",
    "button text": ["Buy HP (20 gold)", "Exit store", " ", " "],
    "button functions": [buyHp, goToTownSquare, null, null],
    text: "You entered the Infirmary."
  },
  {
    name: "Monster Mines",
    "button text": ["Fight monsters", "Turn around", " ", " "],
    "button functions": [fightMonsters, goToIntersection, null, null],
    text: "You stand in front of Monster Mines. Monsters begin to swarm you."
  },
  {
    name: "Dragon's Den",
    "button text": ["Fight Dragon", "Turn around", " ", " "],
    "button functions": [fightDragon, goToIntersection, null, null],
    text: "You stand in front of the Dragon's Den. You feel bad aura from the inside."
  },
  {
    name: "Pier",
    "button text": ["Return to Intersection", " ", " ", " "],
    "button functions": [goToIntersection, null, null, null],
    text: "You are at the nicest pier you have ever seen."
  }
];

// initialize buttons
button1.onclick = goToTownSquare;
button2.onclick = goToMonsterMines;
button3.onclick = goToDragonDen;
button4.onclick = goToPier;

function update(location) {
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button4.innerText = location["button text"][3];

  locationText.innerText = location["name"];
  text.innerText = location["text"];

  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  button4.onclick = location["button functions"][3];
}

// goTo functions
function goToIntersection() {
  update(locations[0]);
} 

function goToTownSquare() {
  update(locations[1]);
}

function goToWeaponStore() {
  update(locations[2]);
}

function goToArmourStore() {
  update(locations[3]);
}

function goToInfirmary() {
  update(locations[4]);
}

function goToMonsterMines() {
  update(locations[5]);
}

function goToDragonDen() {
  update(locations[6]);
}

function goToPier() {
  update(locations[7]);
}

// store functions
function buyHp() {
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

function buyArmour() {

}

function sellArmour() {

}

// combat functions
function fightMonsters() {

}

function fightSlime() {
  monsterStats.style.display = "block";

  monsterAttack = 5;
  monsterHealth = 100;
  monsterNameText.innerText = "slimey";
  monsterHealthText.innerText = monsterHealth;

  update(locations[4]);
}

function fightBeast() {
  monsterStats.style.display = "block";

  monsterAttack = 15;
  monsterHealth = 150;
  monsterNameText.innerText = "beasty";
  monsterHealthText.innerText = monsterHealth;

  update(locations[5]);
}

function attack() {
  monsterHealth -= weapons[currentWeapon].power;
  text.innerText = "Attack! Dealt " + weapons[currentWeapon].power + " damage! It attacks you with " + monsterAttack + " damage.";
  monsterHealthText.innerText = monsterHealth;
  health -= monsterAttack;
  healthText.innerText = health;

  if (health <= 0) {
    monsterStats.style.display = "none";
    goInfirmary();
  } else if (monsterHealth <= 0) {
    monsterStats.style.display = "none";
    text.innerText = "You have defeated the enemy." + " You have earned 40 Gold.";
    gold += 40;
    goldText.innerText = gold;
    goCave();
  }
}

function block() {
  text.innerText = "You blocked the attack, mostly. " + "It attacks you, dealing " + (monsterAttack / 2) + "damage.";
  health -= monsterAttack / 2;
  healthText.innerText = health;
}

function fightDragon() {
  console.log("Fighting dragon.");
}

// other functions
function run() {
  goToTownSquare();
}

function reset() {
  health = 100;
  gold -= 10;
  goldText.innerText = gold;

  goToTownSquare();
}
