import * as Enums from './enums.js';
import assets from './assets.js';

export default class Enemy {
    constructor(phase, x, y) {
        this.phase = phase;
        this.x = x;
        this.y = y;
        this.zLayer = Enums.zLayer.entity;
        this.sprite = assets.getAsset('airplane');
    }

    update(context, delta) {
    }

    draw(context, interpolationPercentage) {
        context.save();
        context.translate(this.x, this.y);
        context.drawImage(this.sprite, -this.sprite.width / 2, -this.sprite.height / 2);
        context.restore();
    }
}
