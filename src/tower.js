import assets from './assets.js';
import * as Enums from './enums.js';
import globalState from './global-state.js';
import Rocket from './rocket.js';
import MathHelper from './math-helper.js';
import Enemy from './enemy.js';

export default class Tower {
    constructor(phase, x, y) {
        this.phase = phase;
        this.x = x;
        this.y = y;
        this.sprite = Tower.getSprite();
        this.zLayer = Enums.zLayer.entity;
        this.watchPath = new Path2D();
        this.watchPath.arc(this.x, this.y, 150, 0, 2 * Math.PI);
        this.timeLastRocketWasShot = new Date(Date.now());
        this.lastKnownEnemyPosition = { x, y };
    }

    update(context, delta) {
        const mousePosition = globalState.getMousePosition();

        let enemyInsideWatchPath = false;
        if (context.isPointInPath(this.watchPath, mousePosition.x, mousePosition.y)) {
            this.lastKnownEnemyPosition = { ...mousePosition };
            enemyInsideWatchPath = true;
        }

        const minTimeBetweenRockets = 2000;
        const shootRocket = enemyInsideWatchPath && this.timeLastRocketWasShot < new Date(Date.now() - minTimeBetweenRockets);
        if (shootRocket) {
            this.timeLastRocketWasShot = new Date(Date.now());
            const enemy = new Enemy(this.phase, mousePosition.x, mousePosition.y);
            const rocket = new Rocket(this.phase, this.x, this.y, enemy);
            this.phase.addGameObject(enemy);
            this.phase.addGameObject(rocket);
        }
    }

    draw(context, interpolationPercentage) {
        const lookAtEnemyAngle = MathHelper.getAngleBetweenPoints(this, this.lastKnownEnemyPosition) - Math.PI / 2;

        context.save();
        context.stroke(this.watchPath);
        context.translate(this.x, this.y);
        context.rotate(lookAtEnemyAngle);
        context.drawImage(this.sprite, -this.sprite.width / 2, -this.sprite.height / 2);
        context.restore();
    }

    static getSprite() {
        return assets.getAsset('tower');
    }

    static getWidth() {
        return this.getSprite().width;
    }

    static getHeight() {
        return this.getSprite().height;
    }
}
