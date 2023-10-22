import * as Enums from './enums.js';
import assets from './assets.js';
import bridge from './bridge.js';
import MathHelper from './math-helper.js';

export default class GameMap {
    constructor(phase) {
        this.phase = phase;
        this.zLayer = Enums.zLayer.environment;
        this.grassTile = assets.getAsset('grass_tile');
        this.dirtTile = assets.getAsset('dirt_tile');
        this.width = bridge.getCanvasRect().width;
        this.height = bridge.getCanvasRect().height;

        this.positions = [];
        this.positions.push({ x: 0, y: Math.floor(Math.random() * this.height) + 1 });
        const numberOfPositionsInBetween = 5;
        for (let i = 0; i < (numberOfPositionsInBetween % 2 === 0 ? numberOfPositionsInBetween + 1 : numberOfPositionsInBetween); i++) {
            this.positions.push({
                x: this.width / numberOfPositionsInBetween * i,
                y: Math.max(Math.random() * this.height - this.dirtTile.height + 1, 0)
            });
        }
        this.positions.push({ x: this.width, y: Math.floor(Math.random() * this.height) + 1 });
    }

    draw(context, interpolationPercentage) {
        for (let x = 0; x < this.width; x += this.grassTile.width) {
            for (let y = 0; y < this.height; y += this.grassTile.height) {
                context.drawImage(this.grassTile, x, y);
            }
        }

        for (let positionIndex = 2; positionIndex < this.positions.length; positionIndex += 2) {
            const numberOfDirtPilesBetweenTwoPositions = 25;

            for (let dirtTileNumber = 0; dirtTileNumber <= numberOfDirtPilesBetweenTwoPositions; dirtTileNumber++) {
                const x = MathHelper.getPointAlongBezierCurve(
                    (1 / numberOfDirtPilesBetweenTwoPositions * dirtTileNumber),
                    this.positions[positionIndex - 2].x,
                    this.positions[positionIndex - 1].x,
                    this.positions[positionIndex].x);
                const y = MathHelper.getPointAlongBezierCurve(
                    (1 / numberOfDirtPilesBetweenTwoPositions * dirtTileNumber),
                    this.positions[positionIndex - 2].y,
                    this.positions[positionIndex - 1].y,
                    this.positions[positionIndex].y);
                context.save();
                context.translate(x, y);
                context.rotate(positionIndex * 30 + dirtTileNumber * 30);
                context.drawImage(this.dirtTile, -this.dirtTile.width / 2, -this.dirtTile.height / 2)
                context.restore();
            }
        }
    }
}
