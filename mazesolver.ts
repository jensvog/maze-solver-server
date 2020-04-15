var createPlanner = require('l1-path-finder');

function planPath(startX: number, startY: number, goalX: number, goalY: number, maze: any) {
    //Create path planner
    var planner = createPlanner(maze);

    //Find path
    var path = [];
    planner.search(startX, startY, goalX, goalY, path);

    return path;
}