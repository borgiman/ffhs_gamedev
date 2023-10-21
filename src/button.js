import * as Enums from './enums.js';

export default class Button {
    constructor(text, x, y) {
        this.text = text;
        this.zLayer = Enums.zLayer.ui;
        this.spaceAround = 20;
        this.width = this.text.length * 22 + 2 * this.spaceAround;
        this.height = 26 + 2 * this.spaceAround;
        this.x = x - this.width / 2;
        this.y = y - this.height / 2;
    }

    draw(context, interpolationPercentage) {
        context.beginPath();
        context.rect(this.x, this.y, this.width, this.height);
        context.fillStyle = 'rgba(225,225,225,0.5)';
        context.fill();
        context.lineWidth = 2;
        context.strokeStyle = 'black';
        context.stroke();
        context.closePath();
        context.font = '40px monospace';
        context.fillStyle = 'black';
        context.fillText(this.text, this.x + this.spaceAround, this.y + 26 + this.spaceAround);
    }
}
