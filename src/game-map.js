import * as Enums from './enums.js';
import assets from './assets.js';
import gameMapManager from './game-map-manager.js';

export default class GameMap {
    constructor(phase) {
        this.phase = phase;
        this.zLayer = Enums.zLayer.environment;
        this.grassTile = assets.getAsset('grass_tile');
        this.dirtTile = assets.getAsset('dirt_tile');
    }

    draw(context, interpolationPercentage) {
        for (let x = 0; x < gameMapManager.getWidth(); x += this.grassTile.width) {
            for (let y = 0; y < gameMapManager.getHeight(); y += this.grassTile.height) {
                context.drawImage(this.grassTile, x, y);
            }
        }

        const dirtTilePositions = gameMapManager.getDirtTilePositions();
        for (let i = 0; i < dirtTilePositions.length; i++) {
            context.save();
            context.translate(dirtTilePositions[i].x, dirtTilePositions[i].y);
            context.rotate(i * 27);
            context.drawImage(this.dirtTile, -this.dirtTile.width / 2, -this.dirtTile.height / 2)
            context.restore();
        }
    }
}
