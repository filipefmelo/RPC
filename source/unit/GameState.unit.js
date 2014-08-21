describe("GameState unit tests", function () {

    it("should create an instance of GameState", function () {
        var gameState = new GameState();
        expect(gameState.player1.label).toBe((new Player("Player")).label);
        expect(gameState.player2.label).toBe((new Player("Computer")).label);
        expect(gameState.gameObjects.paper.label).toBe((new GameObject("Paper")).label);
        expect(gameState.gameObjects.scissors.label).toBe((new GameObject("Scissors")).label);
        expect(gameState.gameObjects.rock.label).toBe((new GameObject("Rock")).label);
    });

    it("should get player1 as winner", function () {
        var gameState = new GameState();
        gameState.player1.score = 2;
        gameState.player2.score = 1;
        expect(gameState.getWinner(3).name).toBe(gameState.player1.name);
    });

    it("should get player1 as looser", function () {
        var gameState = new GameState();
        gameState.player1.score = 1;
        gameState.player2.score = 2;
        expect(gameState.getWinner(3).name).toBe(gameState.player2.name);
    });

    it("should get false as game is not finished", function () {
        var gameState = new GameState();
        gameState.player1.score = 1;
        gameState.player2.score = 1;
        expect(gameState.getWinner(3).name).toBeFalsy();
    });

    it("should not execute makePlay as game is in a unplayble state", function () {
        var gameState = new GameState();
        gameState.playable = false;
        expect(gameState.makePlay('paper')).toBeFalsy();
    });

    xit("should test makePlay extensively", function () {
        var gameState = new GameState();
        gameState.playable = true;
        expect(gameState.makePlay('paper')).toBeFalsy();
    });

    it("should get a gameObject", function () {
        var gameState = new GameState();
        expect(gameState.getGameObject('paper').label).toBe("Paper");
    });

    xit("should config", function () {
        var gameState = new GameState();
        gameState.config();
        spyOn(document, 'getElementById').andCallFake(function () {

        });
        spyOn(gameState.UI, 'showPhase').andCallFake(function () {
            
        });
        spyOn(gameState.UI, 'drawInterface').andCallFake(function () {

        });
        expect(gameState.UI).not.toBeNull();
        expect(gameState.UI.showPhase).toHaveBeenCalledWith(0);
        expect(gameState.UI.drawInterface).toHaveBeenCalled();
    })

    it("should restart game", function () {
        var gameState = new GameState();
        gameState.UI = new UI();
        spyOn(gameState.UI, 'showPhase');
        gameState.playable = false;
        gameState.restart();
        expect(gameState.playable).toBeTruthy();
        expect(gameState.UI.showPhase).toHaveBeenCalled();
    });
});