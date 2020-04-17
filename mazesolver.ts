var createPlanner = require('l1-path-finder');
var ndarray = require('ndarray');
var fs = require('fs'),
PNG = require('pngjs').PNG;

export function base64PictureToPngPicture(base64Picture: string) {
    return Buffer.from(base64Picture, 'base64');
}

export function planPath(startX: number, startY: number, goalX: number, goalY: number, maze: any) {
    // Create path planner
    var planner = createPlanner(maze);

    // Find path
    var path = [];
    var dist = planner.search(startX, startY, goalX, goalY, path);

    var pathInfo = {'path': path, 'dist': dist};

    return pathInfo;
}

export function pngPictureToArray(pngPicture: Buffer, threshold: number) {
    var png = PNG.sync.read(pngPicture);

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