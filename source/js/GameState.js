//game state
var GameState = function() {
    this.gameObjects = {};
    this.turnTimer = null;

    //constructor
    this.__constructor = function() {
        //add both players
        this.player1 = new Player("Filipe");
        this.player2 = new Player("Computer");

        //create linked list
        //this allows to add an infinite amount of gameObjects
        //a single object wins over another one but loses to all others
        this.gameObjects.paper = new GameObject("Paper");
        this.gameObjects.scissors = new GameObject("Scissors",  this.getGameObject("paper"));
        this.gameObjects.rock = new GameObject("Rock", this.getGameObject("scissors"));
        this.gameObjects.paper.wins = this.getGameObject("rock");
    };

    //check which player wins
    this.getWinner = function(bestOf) {
        var bestOf = bestOf || 3, //should be an odd number
            breakingScore = Math.ceil(bestOf/2),
            score1 = this.player1.score,
            score2 = this.player2.score;
        if(score1 + score2 === bestOf) { //we reached the end of plays
            return score1 > 2 ? this.player1 : this.player2;
        } else if(score1 === breakingScore){ //player 1 wins by breaking score
            return this.player1;
        } else if(score2 === breakingScore){ //player 2 wins by breaking score
            return this.player2;
        }
        return false; //game not over
    };

    //make a play
    this.makePlay = function(index) {
        if(this.isPlayable) {
            var player1Play = this.gameObjects[index],
                player2Play = this.player2.randomPlay(),
                playResult = player1Play.winsTo(player2Play);
            this.playerPlayed = true;
            if(playResult === 1) {
                this.player1.score++;
            } else if(playResult === -1){
                this.player2.score++;
            }

            this.UI.updateScores();
            this.startPlay();
        } else {
            this.UI.message("You only have half a second after the timer reaches zero to make your play.");
        }
    };

    //game object access method
    this.getGameObject = function(index) {
        return this.gameObjects[index] || null;
    };

    //resets the game
    this.resetGame = function() {
        this.player1.score = 0;
        this.player2.score = 0;
    };


    //chose the game type
    //type is a string and can be:
    //PvsC: player versus computer
    //CvsC: computer versus computer
    this.chooseType = function(type) {
        this.gameType = type || "PvsC";
        this.UI.showPhase(1);
    };

    this.startPlay = function() {
        console.log(this.getWinner(3));
        if(this.getWinner(3)) {
            this.UI.showPhase(2);
            this.UI.showWinner(this.getWinner(3));
            return;
        }
        var turnTime = 300,
            that = this;
        this.UI.updateTurnTimer(turnTime);
        this.playerPlayed = false;
        this.turnTimer = setInterval(function(){
            if(!turnTime) {
                clearTimeout(that.turnTimer);
                game.isPlayable = true;
                setInterval(function() {
                    game.isPlayable = false;
                    if(!that.playerPlayed) {
                        that.player2.score++;
                    }
                }, 500);
            }
            that.UI.updateTurnTimer(turnTime--);
        }, 10);
    };

    this.config = function(){
        //create the UI controller
        this.UI = new UI();

        /*console.log(this.player1.randomPlay());
         var paper, rock, scissors;
         paper = this.getGameObject("paper");
         rock = this.getGameObject("rock");
         scissors = this.getGameObject("scissors");

         console.log(rock.winsTo(scissors)); //true
         console.log(rock.winsTo(paper)); //false
         console.log(paper.winsTo(scissors)); //false
         console.log(paper.winsTo(rock)); //true
         console.log(scissors.winsTo(rock)); //false
         console.log(scissors.winsTo(paper)); //true*/
        this.UI.showPhase(0);
        this.UI.drawInterface();
        this.startPlay();
    };

    this.__constructor();
};