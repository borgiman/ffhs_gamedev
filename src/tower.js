import Assets from './assets.js';
import Enums from './enums.js';
import State from './state.js';
import Bridge from './bridge.js';
import Rocket from './rocket.js';
import MathHelper from './math-helper.js';
import Enemy from './enemy.js';

export default class Tower {
    constructor(x, y) {
        this.sprite = Assets.getAsset('tower');
        this.zLayer = Enums.zLayer.entity;
        this.x = x;
        this.y = y;
        this.watchPath = new Path2D();
        this.watchPath.arc(this.x, this.y, 100, 0, 2 * Math.PI);
        this.timeLastRocketWasShot = new Date(Date.now());
        this.lastKnownEnemyPosition = { x, y };
    }

    update(delta) {
        const context = Bridge.getContext();
        const mousePosition = State.getMousePosition();

        let enemyInsideWatchPath = false;
        if (context.isPointInPath(this.watchPath, mousePosition.x, mousePosition.y)) {
            this.lastKnownEnemyPosition = { ...mousePosition };
            enemyInsideWatchPath = true;
        }

        const minTimeBetweenRockets = 2000;
        const shootRocket = enemyInsideWatchPath && this.timeLastRocketWasShot < new Date(Date.now() - minTimeBetweenRockets);
        if (shootRocket) {
            this.timeLastRocketWasShot = new Date(Date.now());
            const enemy = new Enemy(mousePosition.x, mousePosition.y);
            const rocket = new Rocket(this.x, this.y, enemy);
            State.addEntity(enemy);
            State.addEntity(rocket);
        }
    }

    draw(interpolationPercentage) {
        const context = Bridge.getContext();
        const lookAtEnemyAngle = MathHelper.getAngleBetweenPoints(this, this.lastKnownEnemyPosition) - Math.PI / 2;

        context.save();
        context.stroke(this.watchPath);
        context.translate(this.x, this.y);
        context.rotate(lookAtEnemyAngle);
        context.drawImage(this.sprite, -this.sprite.width / 2, -this.sprite.height / 2);
        context.restore();
    }
}
