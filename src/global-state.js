
class GlobalState {
    constructor() {
        this.level = 0;
        this.cash = 0;
        this.mode = null;
    }
}

const globalState = new GlobalState();
export default globalState;
