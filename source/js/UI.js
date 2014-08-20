//UI controller
//creates and updates all UI components
var UI = function () {
    //controls which phase we show to the user
    // 0 - shows game type choice
    // 1 - shows the game board (game play)
    // 2 - shows the game results
    this.phase = 0;

    this.phases = [];
    this.phases[0] = document.getElementById("gameTypeChoice");
    this.phases[1] = document.getElementById("gamePlay");
    this.phases[2] = document.getElementById("gameResults");

    this.showPhase = function (phase) {
        this.phase = phase || 0;
        var numberPhases = this.phases.length,
            pane = null;
        for (var i = 0; i < numberPhases; i++) {
            pane = this.phases[i];
            if (i !== this.phase) {
                pane.style.display = 'none';
            } else {
                pane.style.display = 'block';
            }

        }
    };

    //draws a dynamic interface
    this.drawInterface = function () {
        var gObjects = game.gameObjects,
            playerOne = document.getElementById("playerOne").querySelector(".name"),
            playerTwo = document.getElementById("playerTwo").querySelector(".name"),
            commands = document.getElementById("playerOne").querySelector(".commands");

        playerOne.innerHTML = game.player1.name;
        playerTwo.innerHTML = game.player2.name;

        var links = "";
        for (var key in gObjects) {
            if (gObjects.hasOwnProperty(key)) {
                links += '<a href="javascript:void(0);" onclick="game.makePlay(\'' + key + '\')">' + gObjects[key].label + '</a>';
            }
        }
        commands.innerHTML = links;
    };

    //shows the time left for the next play
    this.updateTurnTimer = function (time) {
        var turnTimer = document.getElementById("turnTimer");
        turnTimer.innerHTML = time ? time : "Now";
        if (!time) {
            setTimeout(function () {
                turnTimer.innerHTML = "";
            }, 500);
        }
    };

    //updates score
    this.updateScores = function () {
        var playerOneScore = document.getElementById("playerOne").querySelector(".score"),
            playerTwoScore = document.getElementById("playerTwo").querySelector(".score");

        playerOneScore.innerHTML = game.player1.score;
        playerTwoScore.innerHTML = game.player2.score;
    };

    //message the user
    this.message = function (msg) {
        var message = document.getElementById("message");
        message.innerHTML = msg;
        setTimeout(function () {
            message.innerHTML = "";
        }, 5000);
    };

    this.showWinner = function (winner) {
        document.getElementById("gameResults").innerHTML = winner.name + " wins!";
    };
};