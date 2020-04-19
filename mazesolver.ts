var createPlanner = require('l1-path-finder');
var ndarray = require('ndarray');

var PNG = require('pngjs').PNG;

export function base64PictureToPicture(base64Picture: string) {
    return Buffer.from(base64Picture, 'base64');
}

export function planPath(startX: number, startY: number, goalX: number, goalY: number, maze: any) {
    if (startX < 0 || startX >= maze.shape[0] ||
        startY < 0 || startY >= maze.shape[1]) {
            throw { status: 400, message: 'start point outside of picture'}
    }
    if (goalX < 0 || goalX >= maze.shape[0] ||
        goalY < 0 || goalY >= maze.shape[1]) {
            throw { status: 400, message: 'goal point outside of picture'}
    }

    // Create path planner
    var planner = createPlanner(maze);

    // Find path
    var path = [];
    var dist = planner.search(startX, startY, goalX, goalY, path);

    if (!path.length) {
        throw { status: 400, message: 'no path found'}
    }

    var pathInfo = {'path': path, 'dist': dist};

    return pathInfo;
}

export function pngPictureToArray(pngPicture: Buffer, threshold: number) {
    try {
        var png = PNG.sync.read(pngPicture);
    } catch(err) {
        throw { status: 415, message: 'picture is not a png picture'};
    }

    var picArray = ndarray(new Array(png.width * png.height), [png.width, png.height])

    for (var y = 0; y < png.height; y++) {
        for (var x = 0; x < png.width; x++) {  
            var idx = png.width * 4 * y + x * 4;
            if (png.data[idx] < threshold &&
                png.data[idx+1] < threshold &&
                png.data[idx+2] < threshold) {
                picArray.set(x, y, 1)
            } else {
                picArray.set(x, y, 0)
            }
        }
    }

    return picArray;
}

export function solveMaze(event: any) {
    if (event.threshold === undefined) {
        event.threshold = 123;
    }
    if (event.threshold < 0 || event.threshold > 255) {
        throw { status: 400, message: 'threshold out of bounce. Must be between 0 and 255' };
    }
    var picture = base64PictureToPicture(event.data);
    if (event.datatype == 'png') {
        var picArray = pngPictureToArray(picture, event.threshold);
    } else {
        throw { status: 415, message: 'datatype not supported. Supported formats: png'}
    }
    var pathInfo = planPath(event.start.x, event.start.y, event.goal.x, event.goal.y, picArray);
    return pathInfo;
}