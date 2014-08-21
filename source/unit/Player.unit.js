describe("Player unit tests", function () {

    it("should create an instance of Player", function () {
        var player = new Player();
        expect(player.name).toBe("Player");
        expect(player.score).toBe(0);
    });

    it("should return a random item in game.gameObjects", function () {
        window.game = {};
        var player = new Player();

        game.gameObjects = {
                one: {
                    label: "object one"
                },
                two: {
                    label: "object two"
                }
            };

        function findInObject(stack, needle) {
            var found = false;
            for (var obj in stack) {
                if (stack.hasOwnProperty(obj)) {
                    if(stack[obj] === needle) {
                        found = true;
                    }
                }
            }
            return found;
        }

        var returnedObject = player.randomPlay();
        expect(findInObject(game.gameObjects, returnedObject)).toBeTruthy();
    });
});