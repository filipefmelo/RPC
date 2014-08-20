var GameObject=function(a,b){this.__constructor=function(){this.label=a||null,this.wins=b||null},this.winsTo=function(a){return a===this?0:this.wins===a?1:-1},this.__constructor()},GameState=function(){this.gameObjects={},this.turnTimer=null,this.__constructor=function(){this.player1=new Player("Filipe"),this.player2=new Player("Computer"),this.gameObjects.paper=new GameObject("Paper"),this.gameObjects.scissors=new GameObject("Scissors",this.getGameObject("paper")),this.gameObjects.rock=new GameObject("Rock",this.getGameObject("scissors")),this.gameObjects.paper.wins=this.getGameObject("rock")},this.getWinner=function(a){var a=a||3,b=Math.ceil(a/2),c=this.player1.score,d=this.player2.score;return c+d===a?c>2?this.player1:this.player2:c===b?this.player1:d===b?this.player2:!1},this.makePlay=function(a){if(this.isPlayable){var b=this.gameObjects[a],c=this.player2.randomPlay(),d=b.winsTo(c);this.playerPlayed=!0,1===d?this.player1.score++:-1===d&&this.player2.score++,this.UI.updateScores(),this.startPlay()}else this.UI.message("You only have half a second after the timer reaches zero to make your play.")},this.getGameObject=function(a){return this.gameObjects[a]||null},this.resetGame=function(){this.player1.score=0,this.player2.score=0},this.chooseType=function(a){this.gameType=a||"PvsC",this.UI.showPhase(1)},this.startPlay=function(){if(console.log(this.getWinner(3)),this.getWinner(3))return this.UI.showPhase(2),void this.UI.showWinner(this.getWinner(3));var a=300,b=this;this.UI.updateTurnTimer(a),this.playerPlayed=!1,this.turnTimer=setInterval(function(){a||(clearTimeout(b.turnTimer),game.isPlayable=!0,setInterval(function(){game.isPlayable=!1,b.playerPlayed||b.player2.score++},500)),b.UI.updateTurnTimer(a--)},10)},this.config=function(){this.UI=new UI,this.UI.showPhase(0),this.UI.drawInterface(),this.startPlay()},this.__constructor()},Player=function(a){this.__constructor=function(){this.name=a||"Player",this.score=0},this.randomPlay=function(){var a=game.gameObjects,b=Object.keys(a);return a[b[b.length*Math.random()|0]]},this.__constructor()},UI=function(){this.phase=0,this.phases=[],this.phases[0]=document.getElementById("gameTypeChoice"),this.phases[1]=document.getElementById("gamePlay"),this.phases[2]=document.getElementById("gameResults"),this.showPhase=function(a){this.phase=a||0;for(var b=this.phases.length,c=null,d=0;b>d;d++)c=this.phases[d],c.style.display=d!==this.phase?"none":"block"},this.drawInterface=function(){var a=game.gameObjects,b=document.getElementById("playerOne").querySelector(".name"),c=document.getElementById("playerTwo").querySelector(".name"),d=document.getElementById("playerOne").querySelector(".commands");b.innerHTML=game.player1.name,c.innerHTML=game.player2.name;var e="";for(var f in a)a.hasOwnProperty(f)&&(e+='<a href="javascript:void(0);" onclick="game.makePlay(\''+f+"')\">"+a[f].label+"</a>");d.innerHTML=e},this.updateTurnTimer=function(a){var b=document.getElementById("turnTimer");b.innerHTML=a?a:"Now",a||setTimeout(function(){b.innerHTML=""},500)},this.updateScores=function(){var a=document.getElementById("playerOne").querySelector(".score"),b=document.getElementById("playerTwo").querySelector(".score");a.innerHTML=game.player1.score,b.innerHTML=game.player2.score},this.message=function(a){var b=document.getElementById("message");b.innerHTML=a,setTimeout(function(){b.innerHTML=""},5e3)},this.showWinner=function(a){document.getElementById("gameResults").innerHTML=a.name+" wins!"}};