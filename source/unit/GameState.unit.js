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

    xit("should make a play for the player", function () {
        //TODO: make unit tests for makePlay
    });

    xit("should make a play for the computer", function () {
        //TODO: make unit tests for makePlay
    });

    it("should get a gameObject", function () {
        var gameState = new GameState();
        expect(gameState.getGameObject('paper').label).toBe("Paper");
    });

    it("should restart game", function () {
        var gameState = new GameState();
        spyOn(gameState.UI, 'showPhase');
        gameState.playable = false;
        gameState.restart();
        expect(gameState.playable).toBeTruthy();
        expect(gameState.UI.showPhase).toHaveBeenCalled();
    });

    it("should make computer play", function () {
        var gameState = new GameState();
        spyOn(gameState.UI, 'drawInterface');
        spyOn(gameState, 'makePlay').andCallFake(function () {});
        spyOn(gameState.makePlay, 'bind').andCallFake(function () {});
        spyOn(window, "setInterval").andCallFake(function () {});
        gameState.computerPlay();
        expect(gameState.player1.name).toBe("Computer 1");
        expect(gameState.player2.name).toBe("Computer 2");
        expect(window.setInterval).toHaveBeenCalled();
    });

    it("should choose type with CvsC", function () {
        var gameState = new GameState();
        spyOn(gameState.UI, 'showPhase');
        spyOn(gameState.UI, 'reset');
        spyOn(gameState, 'computerPlay').andCallFake(function () {});
        gameState.chooseType('CvsC');

        expect(gameState.UI.showPhase).toHaveBeenCalledWith(1);
        expect(gameState.player1.score).toBe(0);
        expect(gameState.player2.score).toBe(0);
        expect(gameState.player1.name).toBe("Player");
        expect(gameState.player2.name).toBe("Computer");
        expect(gameState.computerPlay).toHaveBeenCalled();
    });

    it("should choose type with PvsC", function () {
        var gameState = new GameState();
        spyOn(gameState.UI, 'showPhase');
        spyOn(gameState.UI, 'reset').andCallFake(function () {});
        gameState.chooseType('PvsC');

        expect(gameState.UI.showPhase).toHaveBeenCalledWith(1);
        expect(gameState.player1.score).toBe(0);
        expect(gameState.player2.score).toBe(0);
        expect(gameState.player1.name).toBe("Player");
        expect(gameState.player2.name).toBe("Computer");
    });

    it("should config", function () {
        var gameState = new GameState();
        spyOn(gameState.UI, 'showPhase');
        spyOn(gameState.UI, 'drawInterface');
        gameState.config();
        expect(gameState.UI).not.toBeNull();
        expect(gameState.UI.showPhase).toHaveBeenCalledWith(0);
        expect(gameState.UI.drawInterface).toHaveBeenCalled();
    });
});