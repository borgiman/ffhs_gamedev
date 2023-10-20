import State from './state.js';
import Assets from './assets.js';
import Enums from './enums.js';
import Bridge from './bridge.js';

export default class Explosion {
    constructor(x, y) {
        this.sprite_small = Assets.getAsset('explosion_small');
        this.sprite_big = Assets.getAsset('explosion_big');
        this.sprite = this.sprite_small;
        this.zLayer = Enums.zLayer.effects;
        this.x = x;
        this.y = y;
        this.deathDate = new Date(Date.now() + 500);
    }

    update(delta) {
        this.sprite = this.sprite === this.sprite_small ? this.sprite_big : this.sprite_small;

        if (new Date(Date.now()) > this.deathDate) {
            State.removeEntity(this);
        }
    }

    draw(interpolationPercentage) {
        const context = Bridge.getContext();
        context.drawImage(this.sprite, this.x - this.sprite.width / 2, this.y - this.sprite.height / 2);
    }
}
