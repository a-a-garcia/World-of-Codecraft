import { player_one, player_two } from "./Players.js";

//Player turn variable to check to see who's turn it is
let player_turn = 1

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
