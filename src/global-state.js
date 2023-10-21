class GlobalState {
    constructor() {
        this.mousePosition = {
            x: -1,
            y: -1
        };
    }

    setMousePosition(x, y) {
        this.mousePosition.x = x;
        this.mousePosition.y = y;
    }

    getMousePosition() {
        return this.mousePosition;
    }
}

const globalState = new GlobalState();
export default globalState;
