//WEAPONS
weapon_1 = {
    name: `Sword of swoards`,
    damage: 10,
}

weapon_2 = {
    name:  "Aws of menacing",
    damage: 23,
}

weapon_3 = {
    name: 'Kit Kat Bar',
    damage: 50,
}

weapon_4 = { 
    name: 'Mace of Math.Random',
    damage: '30'
}
//damage: Math.floor(Math.random() * 30) did not work because it was not truly random. It only randomized once when the page started.


//PLAYERS
//this.weapons[this.equipped_weapon].damage refers to the equipped weapon's damage.
let player_one = {
    name: "Tim",
    quote: "It's got big teeth and a mean streak a mile wide...!",
    health: 100,
    weapons: [weapon_1, weapon_2, weapon_4],
    equipped_weapon: 0, /*its a number as it represents an index of the eventual weapons array its accessing*/
    attack: function(enemy = player_two) { //eventually, we'd want to pass player parameters to this function
        if(typeof(this.weapons[this.equipped_weapon].damage) == 'string') { // looking at our equipped weapon's damage!
            enemy.health -= Math.ceil(Math.random() * Number(this.weapons[this.equipped_weapon].damage)) //if weapon.damage is a string(like it is for weapon 4, our randomize weapon, we want to set that string to be the maximum damage possible (for weapon 4 its 30.) INSTEAD of a defined damage like the other weapons.
        } else { 
            enemy.health -= this.weapons[this.equipped_weapon].damage; //accessing this player's equipped weapon, using the equipped weapon index in tandem with this players weapons array. Then we want that weapon's damage.
        }
        if (enemy.health <= 0) { //once enemy's health reaches 0, we don't want to set it to 0 so it doesn't go negative.
            enemy.health = 0
            kitBoard.style.display = 'none';
            youDied.style.display = 'inline';
        }
        player2_health.innerText = player_two.health;
    }
}

let player_two = {
    name: "Kit",
    quote: "I broke off a piece of that Kit Kat!",
    health: 100,
    weapons: [weapon_3],
    equipped_weapon: 0,
    attack: function(enemy, weapon) {
        return enemy.health -= weapon.damage
    }
}

let players = [player_one, player_two]

//GAME FUNCTIONS
//#1 - SET GAME BOARD - GAME START
function set_game_board() {
    //player one start
    //display player one name
    player1_name.innerText = player_one.name;
    //display player one health
    player1_health.innerText = player_one.health;
    //display player one currently equipped weapon
    player1_equipped.innerText = player_one.weapons[0].name;
    //using a for loop to traverse player one's weapons array and display each weapon they have as HTML
    for (let i = 0; i < player_one.weapons.length; i++) {
        player1_weapons.innerHTML += `
            <li onclick="equip_weapon(0, ${i})">${player_one.weapons[i].name}</li>
        `; 
    }


    //player two start
    //setting their name
    player2_name.innerText = player_two.name;
    //display player two health
    player2_health.innerText = player_two.health;
    //using a for loop to traverse player two's weapons array and display each weapon they have as HTML
    for (let i = 0; i < player_two.weapons.length; i++) {
        player2_weapons.innerHTML += `
            <li onclick="equip_weapon(${player_two}, ${i})">${player_two.weapons[i].name}</li>
        `;
    }
    
}

//#2 - PICK UP A WEAPON
function get_weapon(weapon, player) {
    player.weapons.push(weapon);
}

//#3 - EQUIP A WEAPON - need to go over this again..... players[player_index]??????????
/*refer to the loops above. When the weapon is clicked on the page, equip_weapon is called which takes in a whole player and a weapon index,
both of which are given to us, for each weapon in the array, by the for loop. It then changes the equipped weapon in the player object to whatever
iteration of the loop its on.*/
function equip_weapon(player_index, weapon_index) {
    players[player_index].equipped_weapon = weapon_index;
    player1_equipped.innerText = player_one.weapons[weapon_index].name
    // console.log(players[player_index].equipped_weapon) //logs to the console the index of the weapons array
}
// equip_weapon takes in a player index, and a weapon index.
// when weapon is clicked, it access the players array (line 40), access the index of the player, their equipped weapon, and sets it to the weapon index of that iteration of the loop


set_game_board();

