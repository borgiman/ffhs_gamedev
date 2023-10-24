import assets from './assets.js';
import * as Enums from './enums.js';
import GameObject from './game-object.js';

export default class Explosion extends GameObject {
    constructor(x, y) {
        super(x, y);

        this.sprite_small = assets.getAsset('explosion_small');
        this.sprite_big = assets.getAsset('explosion_big');
        this.sprite = this.sprite_small;
        this.zLayer = Enums.zLayer.effects;
        this.deathDate = new Date(Date.now() + 500);
    }

    update(context, delta) {
        super.update(context, delta);

        this.sprite = this.sprite === this.sprite_small ? this.sprite_big : this.sprite_small;

        if (new Date(Date.now()) > this.deathDate) {
            this.phase.removeGameObject(this);
        }
    }

    draw(context, interpolationPercentage) {
        super.draw(context, interpolationPercentage);

        context.drawImage(this.sprite, this.x - this.sprite.width / 2, this.y - this.sprite.height / 2);
    }
}
