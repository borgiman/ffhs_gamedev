import node from "./node.js";
import * as Enums from './enums.js';
import MathHelper from "./math-helper.js";

class Pathfinder {

    constructor(){
        this.cols = Enums.grid.cols
        this.rows = Enums.grid.rows;
        this.width = Enums.grid.width;
        this.height = Enums.grid.height;
    }

    initGrid(){
        const grid = new Array(this.cols).fill(null).map(() => new Array(this.rows).fill(null));
        for (let col = 0; col < this.cols; col++) {
            for (let row = 0; row < this.rows; row++) {
                grid[col][row] = new node(col, row);
            }
        }
        this.grid = grid;
    }

    markTowersInGrid(towers){
        for (let col = 0; col < this.cols; col++) {
            for (let row = 0; row < this.rows; row++) {
                towers.forEach( t => {
                    let node = this.grid[col][row]
                    var nodeRect = {
                        left:   node.x,
                        top:    node.y,
                        right:  node.x + Enums.grid.width,
                        bottom: node.y + Enums.grid.height
                    };
                    var towerRect = {
                        left:   t.x - 60,
                        top:    t.y - 60,
                        right:  t.x + 120,
                        bottom: t.y + 120
                    };
                    if( MathHelper.hasIntersection(nodeRect, towerRect)) {
                        node.hasTower = true;
                        node.g = 50;
                    }
                });
            }
        }
    }

    setStartNode(){
        this.startNode = this.grid[0][Math.floor(Math.random() * this.rows)];
    }

    setEndNode(){
        this.endNode = this.grid[this.cols-1][Math.floor(Math.random() * this.rows)];
        this.endNode.x=this.cols*this.width;
    }

    getPath() {
        const openSet = [];
        const closedSet = [];

        openSet.push(this.startNode);

        while (openSet.length > 0) {
            let current = openSet[0];
            for (let i = 1; i < openSet.length; i++) {
                if (openSet[i].f < current.f || (openSet[i].f === current.f && openSet[i].h < current.h)) {
                    current = openSet[i];
                }
            }

            openSet.splice(openSet.indexOf(current), 1);
            closedSet.push(current);

            if (current === this.endNode) {
                // Path found
                const path = [];
                let temp = current;
                while (temp.parent) {
                    path.push(temp);
                    temp = temp.parent;
                }
                return path.reverse();
            }

            const neighbors = this.getNeighbors(this.grid, current);
            for (let neighbor of neighbors) {
                if (!closedSet.includes(neighbor) && !neighbor.hasTower) {
                    const tempG = current.g + 1;

                    if (!openSet.includes(neighbor) || tempG < neighbor.g) {
                        neighbor.g = tempG;
                        neighbor.h = this.heuristic(neighbor, this.endNode);
                        neighbor.f = neighbor.g + neighbor.h;
                        neighbor.parent = current;

                        if (!openSet.includes(neighbor)) {
                            openSet.push(neighbor);
                        }
                    }
                }
            }
        }

        // No path found
        return [];
    }

    getNeighbors(grid, node) {
        const neighbors = [];
        const {col,row} = node;
        const numCols = grid.length;
        const numRows = grid[0].length;

        if (col < numCols - 1) {
            neighbors.push(grid[col + 1][row]);
            if(row > 0 ) neighbors.push(grid[col + 1][row - 1]);
        }
        if (row < numRows - 1) {
            neighbors.push(grid[col][row + 1]);
            if (col < numCols - 1) neighbors.push(grid[col + 1][row + 1]);
        }
        if (col > 0) {
            neighbors.push(grid[col - 1][row]);
            if(row < numRows - 1) neighbors.push(grid[col - 1][row + 1]);
        }
        if (row > 0) {
            neighbors.push(grid[col][row-1]);
            if(col > 0) neighbors.push(grid[col - 1][row - 1]);
        }

        return neighbors;
    }

    heuristic(node, goal) {
        // Simple Manhattan distance heuristic
        return Math.abs(node.col - goal.col) + Math.abs(node.row - goal.row);
    }

}

const pathfinder = new Pathfinder();
export default  pathfinder;
