import assets from './assets.js';
import * as Enums from './enums.js';
import MathHelper from './math-helper.js';
import Explosion from './explosion.js';
import GameObject from './game-object.js';

export default class Rocket extends GameObject {
    constructor(x, y, targetEnemy) {
        super(x, y);

        this.targetEnemy = targetEnemy;
        this.sprite = assets.getAsset('rocket');
        this.zLayer = Enums.zLayer.missile;
        this.damage = 25;
    }

    update(context, delta) {
        let deltaMovement = MathHelper.getDeltaMovementFromPointToPoint(0.25, this, this.targetEnemy, delta);
        this.x += deltaMovement.x;
        this.y += deltaMovement.y;

        const distanceToEnemy = MathHelper.getDistanceBetweenPoints(this, this.targetEnemy);
        if (distanceToEnemy < 3) {
            const explosion = new Explosion(this.x, this.y);
            this.phase.removeGameObject(this);
            this.phase.addGameObject(explosion);
            this.targetEnemy.damage(this.damage);
        }
    }

    draw(context, interpolationPercentage) {
        const lookAtEnemyAngle = MathHelper.getAngleBetweenPoints(this, this.targetEnemy) - Math.PI / 2;

        context.save();
        context.translate(this.x, this.y);
        context.rotate(lookAtEnemyAngle);
        context.drawImage(this.sprite, -this.sprite.width / 2, -this.sprite.height / 2);
        context.restore();
    }
}
