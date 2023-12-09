import * as Enums from './enums.js';
export default class node {
    constructor(col, row, hasTower) {
        this.col = col;
        this.row = row;
        this.hasTower = hasTower;
        this.g = 0; // Cost from start node
        this.h = 0; // Heuristic (estimated cost to goal)
        this.f = 0; // Total cost (g + h)
        this.parent = null;
        this.x = col * Enums.grid.width;
        this.y = row * Enums.grid.height;
    }

}