//player
//contains all information about the player
var Player = function(name) {
    //constructor
    this.__constructor = function(){
        this.name = name || "Player";
        this.score = 0;
    };

    //randomly plays
    this.randomPlay = function() {
        var obj = game.gameObjects,
            keys = Object.keys(obj);
        return obj[keys[ keys.length * Math.random() | 0]];
    }

    this.__constructor();
};