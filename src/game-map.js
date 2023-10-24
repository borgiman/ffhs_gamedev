import * as Enums from './enums.js';
import assets from './assets.js';
import gameMapManager from './game-map-manager.js';
import GameObject from './game-object.js';

export default class GameMap extends GameObject {
    constructor() {
        super(Enums.position.left, Enums.position.top);

        this.zLayer = Enums.zLayer.environment;
        this.grassTile = assets.getAsset('grass_tile');
        this.dirtTile = assets.getAsset('dirt_tile');
    }

    draw(context, interpolationPercentage) {
        super.draw(context, interpolationPercentage);

        for (let x = 0; x < Enums.position.right; x += this.grassTile.width) {
            for (let y = 0; y < Enums.position.bottom; y += this.grassTile.height) {
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
