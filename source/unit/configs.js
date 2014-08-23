/**
 * Function.bind Polyfill for ECMAScript 5 Support
 * Kangax's bind with Broofa's arg optimization.
 * http://www.broofa.com/Tools/JSLitmus/tests/PrototypeBind.html
 */
if (typeof Function.prototype.bind !== "function") {
    Function.prototype.bind = function() {
        var slice = Array.prototype.slice;
        return function(context) {
            var fn = this,
                args = slice.call(arguments, 1);
            if (args.length) {
                return function() {
                    return arguments.length
                        ? fn.apply(context, args.concat(slice.call(arguments)))
                        : fn.apply(context, args);
                };
            }
            return function() {
                return arguments.length
                    ? fn.apply(context, arguments)
                    : fn.call(context);
            };
        };
    };
}


//fixtures
var body = document.body;
body.innerHTML += '<div id="gameTypeChoice"><img src="img/logo.png"><h3>Choose the type of game</h3><a href="javascript:void(0);" onclick="game.chooseType(\'PvsC\');" title="Player versus Computer"><img src="img/PvsC.png" border="0"></a><a href="javascript:void(0);" onclick="game.chooseType(\'CvsC\');" title="Computer versus Computer"><img src="img/CvsC.png" border="0"></a></div><!--<GAME>PLAY</GAME>--><div id="gamePlay"><h1>Hustle!</h1><div class="playArena"><div id="playerOne" class="players"><div class="name"></div><div class="score"></div><div class="play-choice"><img src="img/noplay.png"></div></div><div id="playerTwo" class="players"><div class="name"></div><div class="score"></div><div class="play-choice"><img src="img/noplay.png"></div></div></div><div id="commands"></div><div id="message"></div></div><!--<GAME>RESULTS</GAME>--><div id="gameResults"><div class="message"></div><a href="javascript:void(0);" onclick="game.restart();">Restart game</a></div>';
