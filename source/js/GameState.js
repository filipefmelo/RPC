var GameState = function () {
    this.gameObjects = {};
    this.playable = true;

    //constructor
    this.__constructor = function () {
        //add both players
        this.player1 = new Player("Player");
        this.player2 = new Player("Computer");

        //create linked list
        //this allows to add an infinite amount of gameObjects
        //a single object wins over another one but loses to all others
        this.gameObjects.paper = new GameObject("Paper");
        this.gameObjects.scissors = new GameObject("Scissors", this.getGameObject("paper"));
        this.gameObjects.rock = new GameObject("Rock", this.getGameObject("scissors"));
        this.gameObjects.paper.wins = this.getGameObject("rock");

        //create the UI
        this.UI = new UI();
    };

    //check which player wins
    this.getWinner = function (bestOf) {
        var bestOf = bestOf || 3, //should be an odd number
            breakingScore = Math.ceil(bestOf / 2),
            score1 = this.player1.score,
            score2 = this.player2.score;
        if (score1 === breakingScore) { //player 1 wins by breaking score
            return this.player1;
        } else if (score2 === breakingScore) { //player 2 wins by breaking score
            return this.player2;
        }
        return false; //game not over
    };

    //make a play
    this.makePlay = function (index) {
        if (!this.playable) return false;

        if (this.gameType === 'PvsC') {
            var player1Play = this.gameObjects[index];
        } else {
            var player1Play = this.player1.randomPlay();
        }
        var player2Play = this.player2.randomPlay(),
            playResult = player1Play.winsTo(player2Play);

        if (playResult === 1) {
            this.player1.score++;
        } else if (playResult === -1) {
            this.player2.score++;
        }

        this.UI.updateScores(this);
        this.UI.updateCurrentPlay(player1Play, player2Play);

        var winner = this.getWinner(5);
        if (winner) {
            this.playable = false;
            setTimeout((function () { //give the user time to see the score before ending games
                clearTimeout(this.computerPlayTimer);
                this.UI.showPhase(2);
                this.UI.showWinner(winner);
            }).bind(this), 2000);
        }
    };

    //game object access method
    this.getGameObject = function (index) {
        return this.gameObjects[index] || null;
    };

    //resets the game
    this.restart = function () {
        this.playable = true;
        this.UI.showPhase(0);
    };

    //start computer vs computer game
    this.computerPlay = function () {
        this.player1.name = "Computer 1";
        this.player2.name = "Computer 2";
        this.UI.drawInterface();
        this.computerPlayTimer = setInterval(this.makePlay.bind(this), 2000);
    };

    //chose the game type
    //type is a string and can be:
    //PvsC: player versus computer
    //CvsC: computer versus computer
    this.chooseType = function (type) {
        this.gameType = type || "PvsC";
        this.UI.showPhase(1);
        this.player1.score = 0;
        this.player2.score = 0;
        this.player1.name = "Player";
        this.player2.name = "Computer";
        this.UI.reset();
        if (this.gameType === 'CvsC') this.computerPlay();
    };


    this.config = function () {
        //start game type choice
        this.UI.showPhase(0);
        //draw UI
        this.UI.drawInterface(this);
    };

    this.__constructor();
};