import * as Enums from './enums.js';
import assets from './assets.js';
import gameMapManager from './game-map-manager.js';
import MathHelper from './math-helper.js';

export default class Enemy {
    constructor(phase, x, y) {
        this.phase = phase;
        this.x = x;
        this.y = y;
        this.zLayer = Enums.zLayer.entity;
        this.sprite = assets.getAsset('airplane');
        this.nextDirtTilePositionIndex = 1;
        this.nextDirtTilePosition = gameMapManager.getDirtTilePositions()[this.nextDirtTilePositionIndex];
        this.reachedFinishLine = false;
    }

    update(context, delta) {
        let deltaMovement = MathHelper.getDeltaMovementFromPointToPoint(0.15, this, this.nextDirtTilePosition, delta);
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
        const lookAtNextDirtPilePositionAngle = MathHelper.getAngleBetweenPoints(this, this.nextDirtTilePosition) - Math.PI / 2;
        const fixSpriteRotationRotation = -90 * Math.PI / 180;

        context.save();
        context.translate(this.x, this.y);
        context.rotate(lookAtNextDirtPilePositionAngle);
        context.rotate(fixSpriteRotationRotation);
        context.drawImage(this.sprite, -this.sprite.width / 2, -this.sprite.height / 2);
        context.restore();
    }
}
