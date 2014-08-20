//game object
//contains all information about the game objects
var GameObject = function(label, wins) {
    //constructor
    this.__constructor = function(){
        this.label = label || null;
        this.wins = wins || null;
    };

    this.winsTo = function(gameObject){
        if(gameObject === this) {
            return 0;
        } else if(this.wins === gameObject){
            return 1;
        }
        return -1;
    };

    this.__constructor();
};