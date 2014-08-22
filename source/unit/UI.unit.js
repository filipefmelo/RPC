describe("UI unit tests", function () {

    it("should show a pane and hide all others", function () {
        var ui = new UI();
        ui.showPhase(1);
        expect(ui.phases[0].style.display).toBe("none");
        expect(ui.phases[1].style.display).toBe("block");
        expect(ui.phases[2].style.display).toBe("none");
    });

    it("should draw the interface for PvsC", function () {
        var game = new GameState();
        var ui = game.UI;
        game.gameType = 'PvsC';
        ui.drawInterface(game);
        expect(document.getElementById("commands").innerHTML).not.toBeNull();
        expect(ui.player1.querySelector(".name").innerHTML).toBe(game.player1.name);
        expect(ui.player2.querySelector(".name").innerHTML).toBe(game.player2.name);
    });

    it("should draw the interface for CvsC", function () {
        var game = new GameState();
        var ui = game.UI;
        game.gameType = 'CvsC';
        ui.drawInterface(game);
        expect(ui.player1.querySelector(".name").innerHTML).toBe(game.player1.name);
        expect(ui.player2.querySelector(".name").innerHTML).toBe(game.player2.name);
    });

    it("should update scores", function () {
        var game = new GameState();
        var ui = game.UI;
        game.player1.score = "1";
        game.player2.score = "2";
        ui.updateScores(game);
        expect(ui.player1.querySelector(".score").innerHTML).toBe(game.player1.score);
        expect(ui.player2.querySelector(".score").innerHTML).toBe(game.player2.score);
    });
});