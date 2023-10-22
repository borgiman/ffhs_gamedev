import assets from './assets.js';
import * as Enums from './enums.js';
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
        this.watchPathRadius = 150;
        this.watchPath = new Path2D();
        this.watchPath.arc(this.x, this.y, this.watchPathRadius, 0, 2 * Math.PI);
        this.timeLastRocketWasShot = new Date(Date.now());
        this.lastKnownEnemyPosition = { x, y };
    }

    update(context, delta) {
        const minTimeBetweenRockets = 2000;
        if (this.timeLastRocketWasShot > new Date(Date.now() - minTimeBetweenRockets)) {
            return;
        }

        const nearEnemy = this.phase.getGameObjects().find(
            x => x instanceof Enemy &&
            MathHelper.getDistanceBetweenPoints(this, nearEnemy) <= this.watchPathRadius);

        if (nearEnemy === undefined) {
            return;
        }

        this.lastKnownEnemyPosition = { x: nearEnemy.x, y: nearEnemy.y };
        this.timeLastRocketWasShot = new Date(Date.now());
        const rocket = new Rocket(this.phase, this.x, this.y, nearEnemy);
        this.phase.addGameObject(nearEnemy);
        this.phase.addGameObject(rocket);
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
