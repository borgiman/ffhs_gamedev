const zLayer = {
    environment: 0,
    defense: 1,
    entity: 2,
    missile: 3,
    effects: 4,
    ui: 5
};
const phaseType = {
    bootstrap: 0,
    planning: 1,
    playing: 2,
    gameOver: 3
};

const position = {
    left: 0,
    right: 800,
    top: 0,
    bottom: 600
};

const mode = {
    towerDefense: 0,
    pathfinder: 1
};

const grid ={
    cols: 50,
    rows: 50,
    width: 16,
    height: 12
}

export { zLayer, phaseType, position, mode, grid };
