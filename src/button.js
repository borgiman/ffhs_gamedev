import * as Enums from './enums.js';
import GameObject from './game-object.js';

export default class Button extends GameObject {
    constructor(text, x, y, action) {
        super(x, y);

        this.text = text;
        this.action = action;
        this.zLayer = Enums.zLayer.ui;
        this.spaceAround = 20;
        this.width = this.text.length * 22 + 2 * this.spaceAround;
        this.height = 26 + 2 * this.spaceAround;
        this.x = x - this.width / 2;
        this.y = y - this.height / 2;
    }

    draw(context, interpolationPercentage) {
        super.draw(context, interpolationPercentage);

        this.pulseDirection = (this.pulseStrength || 0) <= 0 || (this.pulseStrength || 0) >= 5
            ? (this.pulseDirection || -1) * -1
            : this.pulseDirection;
        this.pulseStrength = (this.pulseStrength || 0) + this.pulseDirection * 0.05;
        context.beginPath();
        context.rect(this.x, this.y, this.width, this.height);
        context.fillStyle = 'rgba(225,225,225,0.5)';
        context.fill();
        context.lineWidth = 2;
        context.strokeStyle = 'black';
        context.shadowColor = 'red';
        context.shadowBlur = this.pulseStrength;
        context.stroke();
        context.closePath();
        context.shadowBlur = 0;
        context.font = '40px monospace';
        context.fillStyle = 'black';
        context.fillText(this.text, this.x + this.spaceAround, this.y + 26 + this.spaceAround);
    }

    onMouseUp(context, mouseX, mouseY) {
        super.onMouseUp(context, mouseX, mouseY);

        const buttonPath = new Path2D();
        buttonPath.rect(this.x, this.y, this.width, this.height);

        if (context.isPointInPath(buttonPath, mouseX, mouseY)) {
            this.action();
            return true;
        }

        return false;
    }
}
