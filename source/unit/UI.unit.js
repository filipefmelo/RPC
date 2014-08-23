var ui = null,
    game = null;
describe("UI unit tests", function () {

    beforeEach(function () {
        ui = new UI();
        game =new GameState();
    });

    it("should show a pane and hide all others", function () {
        ui.showPhase(1);
        expect(ui.phases[0].style.display).toBe("none");
        expect(ui.phases[1].style.display).toBe("block");
        expect(ui.phases[2].style.display).toBe("none");
    });

    it("should draw the interface for PvsC", function () {
        game.gameType = 'PvsC';
        ui.drawInterface();
        expect(document.getElementById("commands").innerHTML).not.toBeNull();
        expect(ui.player1.querySelector(".name").innerHTML).toBe(game.player1.name);
        expect(ui.player2.querySelector(".name").innerHTML).toBe(game.player2.name);
    });

    it("should draw the interface for CvsC", function () {
        game.gameType = 'CvsC';
        ui.drawInterface(game);
        expect(ui.player1.querySelector(".name").innerHTML).toBe(game.player1.name);
        expect(ui.player2.querySelector(".name").innerHTML).toBe(game.player2.name);
    });

    it("should update scores", function () {
        game.player1.score = "1";
        game.player2.score = "2";
        ui.updateScores(game);
        expect(ui.player1.querySelector(".score").innerHTML).toBe(game.player1.score);
        expect(ui.player2.querySelector(".score").innerHTML).toBe(game.player2.score);
    });
});