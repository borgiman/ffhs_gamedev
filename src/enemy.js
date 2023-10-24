import * as Enums from './enums.js';
import assets from './assets.js';
import gameMapManager from './game-map-manager.js';
import MathHelper from './math-helper.js';
import GameObject from './game-object.js';

export default class Enemy extends GameObject {
    constructor(x, y) {
        super(x, y);

        this.zLayer = Enums.zLayer.entity;
        this.sprite = assets.getAsset('airplane');
        this.nextDirtTilePositionIndex = 1;
        this.nextDirtTilePosition = gameMapManager.getDirtTilePositions()[this.nextDirtTilePositionIndex];
        this.reachedFinishLine = false;
        this.health = 50;
    }

    update(context, delta) {
        super.update(context, delta);

        const deltaMovement = MathHelper.getDeltaMovementFromPointToPoint(0.15, this, this.nextDirtTilePosition, delta);
        this.x += deltaMovement.x;
        this.y += deltaMovement.y;

        const distanceToNextDirtTile = MathHelper.getDistanceBetweenPoints(this, this.nextDirtTilePosition);
        if (distanceToNextDirtTile < 3) {
            const dirtTilePositions = gameMapManager.getDirtTilePositions();
            if (dirtTilePositions.length > this.nextDirtTilePositionIndex + 1) {
                this.nextDirtTilePosition = dirtTilePositions[++this.nextDirtTilePositionIndex];
            } else {
                this.reachedFinishLine = true;
            }
        }
    }

    draw(context, interpolationPercentage) {
        super.draw(context, interpolationPercentage);

        const lookAtNextDirtPilePositionAngle = MathHelper.getAngleBetweenPoints(this, this.nextDirtTilePosition) - Math.PI / 2;
        const fixSpriteRotationRotation = -90 * Math.PI / 180;

        context.save();
        context.translate(this.x, this.y);
        context.rotate(lookAtNextDirtPilePositionAngle);
        context.rotate(fixSpriteRotationRotation);
        context.drawImage(this.sprite, -this.sprite.width / 2, -this.sprite.height / 2);
        context.restore();
    }

    damage(amount) {
        this.health -= amount;
        if (this.health <= 0) {
            this.phase.removeGameObject(this);
        }
    }
}
