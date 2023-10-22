export default class Phase {
    constructor(game, phaseType) {
        this.game = game;
        this.phaseType = phaseType;
        this.reset();
    }

    update(context, delta) {
        this.gameObjects
            .filter(x => x.update)
            .forEach(x => x.update(context, delta));
    }

    draw(context, interpolationPercentage) {
        this.gameObjects
            .filter(x => x.draw)
            .sort((x1, x2) => x1.zLayer - x2.zLayer)
            .forEach(x => x.draw(context, interpolationPercentage));
    }

    onMouseUp(context, mouseX, mouseY) {
        const handled = this.gameObjects
            .filter(x => x.onMouseUp)
            .sort((x1, x2) => x2.zLayer - x1.zLayer)
            .find(x => x.onMouseUp(context, mouseX, mouseY) === true)
            !== undefined;
        return handled;
    }

    getGameObjects() {
        return this.gameObjects;
    }

    addGameObject(gameObject) {
        this.gameObjects.push(gameObject);
    }

    removeGameObject(gameObject) {
        this.gameObjects.splice(this.gameObjects.indexOf(gameObject), 1);
    }

    getNextPhaseType() {
    }

    transitionToNextPhase() {
        this.game.transitionToNextPhase();
    }

    transitionFrom(oldPhase) {
        this.reset();
    }

    reset() {
        this.gameObjects = [];
    }
}
