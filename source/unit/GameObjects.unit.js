describe("GameObjects unit tests", function () {

    it("should create an instance of GameObject", function () {
        var gameObject = new GameObject();
        expect(gameObject.label).toBeNull();
        expect(gameObject.wins).toBeNull();
    });

    it("should verify a TIE between our gameObject and the adversary", function () {
        var gameObject = new GameObject();
        var gameObjectAdversary = gameObject;

        expect(gameObject.winsTo(gameObjectAdversary)).toBe(0);
    });

    it("should verify a WIN between our gameObject and the adversary", function () {
        var gameObject = new GameObject();
        var gameObjectAdversary = new GameObject();

        gameObject.wins = gameObjectAdversary;

        expect(gameObject.winsTo(gameObjectAdversary)).toBe(1);
    });

    it("should verify a LOOSE between our gameObject and the adversary", function () {
        var gameObject = new GameObject();
        var gameObjectAdversary = new GameObject();

        gameObjectAdversary.wins = gameObject;

        expect(gameObject.winsTo(gameObjectAdversary)).toBe(-1);
    });
});