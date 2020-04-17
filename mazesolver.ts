var createPlanner = require('l1-path-finder');

export function planPath(startX: number, startY: number, goalX: number, goalY: number, maze: any) {
    // Create path planner
    var planner = createPlanner(maze);

    // Find path
    var path = [];
    var dist = planner.search(startX, startY, goalX, goalY, path);

    var pathInfo = {'path': path, 'dist': dist};

    return pathInfo;
}