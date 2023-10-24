import assets from './assets.js';
import * as Enums from './enums.js';
import Rocket from './rocket.js';
import MathHelper from './math-helper.js';
import Enemy from './enemy.js';
import GameObject from './game-object.js';

export default class Tower extends GameObject {
    constructor(x, y) {
        super(x, y);

        this.sprite = Tower.getSprite();
        this.zLayer = Enums.zLayer.defense;
        this.watchPathRadius = 150;
        this.minTimeBetweenRockets = 2000;
        this.timeLastRocketWasShot = new Date(Date.now() - this.minTimeBetweenRockets);
        this.lastKnownEnemyPosition = { x, y };
    }

    update(context, delta) {
        if (this.phase.phaseType !== Enums.phaseType.playing) {
            return;
        }

        const enemies = this.phase.getGameObjectsOfType(Enemy);
        const nearEnemy = enemies.find(x => MathHelper.getDistanceBetweenPoints(this, x) <= this.watchPathRadius);
        if (nearEnemy === undefined) {
            return;
        }

        this.lastKnownEnemyPosition = { x: nearEnemy.x, y: nearEnemy.y };

        if (this.timeLastRocketWasShot > new Date(Date.now() - this.minTimeBetweenRockets)) {
            return;
        }

        this.timeLastRocketWasShot = new Date(Date.now());
        const rocket = new Rocket(this.x, this.y, nearEnemy);
        this.phase.addGameObject(rocket);
    }

    draw(context, interpolationPercentage) {
        const lookAtEnemyAngle = MathHelper.getAngleBetweenPoints(this, this.lastKnownEnemyPosition) - Math.PI / 2;

        context.save();
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
