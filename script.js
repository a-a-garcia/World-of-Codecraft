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

//shields can block incoming damage
shield_1 = {
    name : "Captain America's Sheild",
    block : 30
}
//damage: Math.floor(Math.random() * 30) did not work because it was not truly random. It only randomized once when the page started.

//Player turn variable to check to see who's turn it is
let player_turn = 1

//PLAYERS
//this.weapons[this.equipped_weapon].damage refers to the equipped weapon's damage.
let player_one = {
    name: function () {
            let name = document.getElementById(player1_name)
    },
    // } Carlos to fix,

    quote: "It's got big teeth and a mean streak a mile wide...!",
    health: 100,
    weapons: [weapon_1, weapon_2, weapon_4],
    shield : [shield_1],
    equipped_weapon: 0, /*its a number as it represents an index of the eventual weapons array its accessing*/
    blocking : false,
    attack: function(enemy = player_two) { //eventually, we'd want to pass player parameters to this function
        if (player_turn == 1) {
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
            
            player_turn = 2
            turn.innerText = player_turn;
        } else {
            //text to remind player it's not their turn.
            turn_warning.innerText = "*Sorry it's not your turn right now!*";
            //text removed after 3 seconds
            setTimeout(() => {
                turn_warning.innerText = "";
            }, 3000);
        }

        // if(typeof(this.weapons[this.equipped_weapon].damage) == 'string') { // looking at our equipped weapon's damage!
        //     enemy.health -= Math.ceil(Math.random() * Number(this.weapons[this.equipped_weapon].damage)) //if weapon.damage is a string(like it is for weapon 4, our randomize weapon, we want to set that string to be the maximum damage possible (for weapon 4 its 30.) INSTEAD of a defined damage like the other weapons.
        // } else {
        //     enemy.health -= this.weapons[this.equipped_weapon].damage; //accessing this player's equipped weapon, using the equipped weapon index in tandem with this players weapons array. Then we want that weapon's damage.
        // }
    },

    block : function() {
        if (player_turn == 1) {
            this.blocking = true
            console.log(player_one.blocking)
            player_turn = 2
            turn.innerText = player_turn;
        } else {
            //text to remind player it's not their turn.
            turn_warning.innerText = "*Sorry it's not your turn right now!*";
            //text removed after 3 seconds
            setTimeout(() => {
                turn_warning.innerText = "";
            }, 3000);
        }
    }
}

let player_two = {
    name: function(){
        let name = document.getElementById(player2_name)
    },
    // Carlos to fix,

    quote: "I broke off a piece of that Kit Kat!",
    health: 100,
    weapons: [weapon_3],
    equipped_weapon: 0,
    attack: function(enemy = player_one) {
        //Checks if player_one is blocking or not. If not blocking normal damage from weapon occurs.
        if (player_turn == 2) {
            if (player_one.blocking == false) {
                enemy.health -= this.weapons[this.equipped_weapon].damage
                player1_health.innerText = player_one.health
            } else { //if player_one is blocking, we subtract the shield block from the weapon damage
                enemy.health -= (this.weapons[this.equipped_weapon].damage - player_one.shield[0].block)
                console.log(player_one.health)
                player1_health.innerText = player_one.health
            }
            player1_health.innerText = player_one.health;
            player_turn = 1
            turn.innerText = player_turn;
        } else {
            //text to remind player it's not their turn.
            turn_warning.innerText = "*Sorry it's not your turn right now!*";
            //text removed after 3 seconds
            setTimeout(() => {
                turn_warning.innerText = "";
            }, 3000);
        }
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
            <li class="weapons_inventory">${player_one.weapons[i].name} <button class="equip_buttons" onclick="equip_weapon(0, ${i})">Equip</button></li>
        `;
    }
    //adding shields to the page
    player1_shields.innerText = player_one.shield[0].name

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
    //Show who's turn it is and pop up warning if it's not their turn
    turn.innerText = player_turn;

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

console.log(player_one.shield[0].block)
