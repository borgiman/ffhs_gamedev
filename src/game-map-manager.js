import assets from './assets.js';
import MathHelper from './math-helper.js';
import * as Enums from './enums.js';

class GameMapManager {
    constructor() {
        const width = Enums.position.right;
        const height = Enums.position.bottom;
        this.dirtTile = assets.getAsset('dirt_tile');

        this.bezierPoints = [];
        this.bezierPoints.push({ x: 0, y: Math.floor(Math.random() * height) + 1 });
        const numberOfPositionsInBetween = 5;
        for (let i = 0; i < (numberOfPositionsInBetween % 2 === 0 ? numberOfPositionsInBetween + 1 : numberOfPositionsInBetween); i++) {
            this.bezierPoints.push({
                x: width / numberOfPositionsInBetween * i,
                y: Math.max(Math.random() * height - this.dirtTile.height + 1, 0)
            });
        }
        this.bezierPoints.push({ x: width, y: Math.floor(Math.random() * height) + 1 });

        this.dirtTilePositions = [];
        for (let positionIndex = 2; positionIndex < this.bezierPoints.length; positionIndex += 2) {
            const numberOfDirtPilesBetweenTwoPositions = 25;

            for (let dirtTileNumber = 0; dirtTileNumber <= numberOfDirtPilesBetweenTwoPositions; dirtTileNumber++) {
                const x = MathHelper.getPointAlongBezierCurve(
                    (1 / numberOfDirtPilesBetweenTwoPositions * dirtTileNumber),
                    this.bezierPoints[positionIndex - 2].x,
                    this.bezierPoints[positionIndex - 1].x,
                    this.bezierPoints[positionIndex].x);
                const y = MathHelper.getPointAlongBezierCurve(
                    (1 / numberOfDirtPilesBetweenTwoPositions * dirtTileNumber),
                    this.bezierPoints[positionIndex - 2].y,
                    this.bezierPoints[positionIndex - 1].y,
                    this.bezierPoints[positionIndex].y);
                this.dirtTilePositions.push({ x, y });
            }
        }
    }

    getDirtTilePositions() {
        return this.dirtTilePositions;
    }

    canPlacePlayerEntity(entityWidth, entityHeight, placementX, placementY) {
        return this.dirtTilePositions
            .find(dirtTilePosition => MathHelper.getDistanceBetweenPoints(
                { x: dirtTilePosition.x + this.dirtTile.width / 2, y: dirtTilePosition.y + this.dirtTile.height / 2 },
                { x: placementX + entityWidth / 2, y: placementY + entityHeight / 2 }
            ) <= (Math.max(this.dirtTile.width, this.dirtTile.height)))
            === undefined;
    }
}

const gameMapManager = new GameMapManager();
export default gameMapManager;
