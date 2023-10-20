import Assets from './assets.js';
import Enums from './enums.js';
import MathHelper from './math-helper.js';
import State from './state.js';
import Explosion from './explosion.js';
import Bridge from './bridge.js';

export default class Rocket {
    constructor(x, y, targetEnemy) {
        this.sprite = Assets.getAsset('rocket');
        this.zLayer = Enums.zLayer.missile;
        this.x = x;
        this.y = y;
        this.targetEnemy = targetEnemy;
    }

    update(delta) {
        const speed = 0.15;
        const xDiff = this.x - this.targetEnemy.x;
        const yDiff = this.y - this.targetEnemy.y;
        const xDiffAbsolute = Math.abs(xDiff);
        const yDiffAbsolute = Math.abs(yDiff);
        const xFactor = xDiffAbsolute > yDiffAbsolute ? 1 : xDiffAbsolute / yDiffAbsolute;
        const yFactor = xDiffAbsolute > yDiffAbsolute ? yDiffAbsolute / xDiffAbsolute : 1;
        const deltaX = xFactor * speed * delta;
        const deltaY = yFactor * speed * delta;
        this.x = xDiff > 0 ? this.x - deltaX : this.x + deltaX;
        this.y = yDiff > 0 ? this.y - deltaY : this.y + deltaY;

        const distanceToEnemy = MathHelper.getDistanceBetweenPoints(this, this.targetEnemy);
        if (distanceToEnemy < 3) {
            State.removeEntity(this);
            State.addEntity(new Explosion(this.x, this.y));
        }
    }

    draw(interpolationPercentage) {
        const context = Bridge.getContext();
        const lookAtEnemyAngle = MathHelper.getAngleBetweenPoints(this, this.targetEnemy) - Math.PI / 2;

        context.save();
        context.translate(this.x, this.y);
        context.rotate(lookAtEnemyAngle);
        context.drawImage(this.sprite, -this.sprite.width / 2, -this.sprite.height / 2);
        context.restore();
    }
}
