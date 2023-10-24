class Bridge {
    constructor() {
        this.canvasElement = document.querySelector('canvas');
        this.canvasRect = this.canvasElement.getBoundingClientRect();
        this.fpsElement = document.getElementById('fps');
        this.context = this.canvasElement.getContext('2d');
    }

    registerEventListeners() {
        this.canvasElement.addEventListener('mouseup', async mouseEvent => {
            const mouseX = mouseEvent.clientX - this.canvasRect.left;
            const mouseY = mouseEvent.clientY - this.canvasRect.top;
            const game = await import('./game.js');
            game.default.onMouseUp(mouseX, mouseY);
        });
    }

    getCanvasElement() {
        return this.canvasElement;
    }

    getCanvasRect() {
        return this.canvasRect;
    }

    getFpsElement() {
        return this.fpsElement;
    }

    getContext() {
        return this.context;
    }
}

const bridge = new Bridge();
export default bridge;
