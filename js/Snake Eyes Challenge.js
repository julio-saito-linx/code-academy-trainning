var Player = function (name) {
    var self = {};
    self.name = name;
    var score = 0;

    self.addToScore = function (val) {
        score += val;
    };

    self.getScore = function () {
        return score;
    };

    return self;
};

function rollSingleDice() {
    return Math.floor(Math.random() * 6 + 1);
}

//Make the rollDice function roll dice, 
//check for doubles, and return the 
//total score achieved by all rolls
function rollDice(player) {
    var total, dice1, dice2, double_dice;

    dice1 = rollSingleDice();
    dice2 = rollSingleDice();
    total = dice1 + dice2;

    player.addToScore(total);

    console.log(player.name + ": Die 1: " + dice1 + " Die 2: " + dice2 + " Score: " + player.getScore());
    double_dice = (dice1 === dice2);

    if (dice1 === 1 && dice2 === 1) {
        console.log("Snake Eyes!");
        return true;
    }
    else if (double_dice) {
        console.log("Congratulations Double Thrown!");
    }

    return false;
}

/*
 *
 * MAIN
 *
 * */

function diceGame(players_par) {
    var players = players_par,
        snakeEyeFired = false,
        turn_count = 1,
        i = 0,
        highScore = 0,
        winners = [];

    for (; ; i++) {
        var player_indice = i % players.length;
        var player = players[player_indice];
        if (player_indice === 0) {
            console.log(player.name);
            console.log("\nTurn " + turn_count);
            turn_count += 1;
        }

        if (!snakeEyeFired) {
            snakeEyeFired = rollDice(player);
        }
        else {
            rollDice(player)
        }

        if (snakeEyeFired && player_indice === players.length-1) {
            break
        }
    }


    for (i = 0; i < players.length; i++) {
        var player = players[i];
        if (player.getScore() > highScore) {
            highScore = player.getScore();
        }
    }

    console.log("\n----------\n");
    for (i = 0; i < players.length; i++) {
        var player = players[i];
        if (player.getScore() == highScore) {
            console.log(player.name + " scored " + player.getScore() + " (win)");
            winners.push(player);
        }
        else {
            console.log(player.name + " scored " + player.getScore() + " (lost)");
        }
    }

    if(winners.length > 1){
        diceGame(winners);
    }
}

// 4 players
var players_start = [];
for (i = 0; i < 4; i++) {
    //var name = prompt('Name:');
    players_start.push(Player("Player_" + (i + 1)));
}

diceGame(players_start);

