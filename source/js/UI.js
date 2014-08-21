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

    this.player1 = document.getElementById("playerOne");
    this.player2 = document.getElementById("playerTwo");

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
            playerOne = this.player1.querySelector(".name"),
            playerTwo = this.player2.querySelector(".name"),
            commands = document.getElementById("commands");

        playerOne.innerHTML = game.player1.name;
        playerTwo.innerHTML = game.player2.name;

        var links = "";
        if (game.gameType === 'PvsC') {
            for (var key in gObjects) {
                if (gObjects.hasOwnProperty(key)) {
                    links += '<a href="javascript:void(0);" onclick="game.makePlay(\'' + key + '\')"><img src="img/' + key + '.png"></a>';
                }
            }
        }
        commands.innerHTML = links;
    };

    //updates score
    this.updateScores = function () {
        var playerOneScore = this.player1.querySelector(".score"),
            playerTwoScore = this.player2.querySelector(".score");

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
        document.getElementById("gameResults").querySelector(".message").innerHTML = winner.name + " wins!";
    };

    //update and show current plays
    this.updateCurrentPlay = function (play1, play2) {
        this.player1.querySelector(".play-choice").innerHTML = '<img src="img/' + play1.label.toLowerCase() + '.png">';
        this.player2.querySelector(".play-choice").innerHTML = '<img src="img/' + play2.label.toLowerCase() + '.png">';
    };

    //resets the UI
    this.reset = function () {
        this.player1.querySelector(".play-choice").innerHTML = '<img src="img/noplay.png">';
        this.player2.querySelector(".play-choice").innerHTML = '<img src="img/noplay.png">';
        this.updateScores();
        this.drawInterface();
    };
};