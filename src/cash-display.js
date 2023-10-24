import GameObject from './game-object.js';
import * as Enums from './enums.js';
import assets from './assets.js';
import globalState from './global-state.js';

export default class CashDisplay extends GameObject {
    constructor() {
        super(Enums.position.right, Enums.position.top);

        this.sprite = assets.getAsset('cash');
        this.zLayer = Enums.zLayer.ui;
    }

    draw(context, interpolationPercentage) {
        super.draw(context, interpolationPercentage);

        context.save();
        context.translate(this.x, this.y);
        context.drawImage(this.sprite, -this.sprite.width - 100, 10);
        context.font = '40px monospace';
        context.fillStyle = 'black';
        context.fillText(globalState.cash, -this.sprite.width - 40, 50);
        context.restore();
    }
}
