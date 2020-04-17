import { planPath, pngPictureToArray, base64PictureToPngPicture, solveMaze } from '../mazesolver';
import { expect } from 'chai';
import 'mocha'
import { fstat } from 'fs';

var ndarray = require('ndarray');
var fs = require('fs');

describe('base64PictureToPngPicture function', () => {
  it('should convert base64 image to buffer', function() {
      var desiredBuff = fs.readFileSync('test/maze.png');

      var base64picture = desiredBuff.toString('base64');

      var buff = base64PictureToPngPicture(base64picture);

      expect(buff).eql(desiredBuff);
  });
});

describe('planPath function', () => {
  it('should calculate a correct path', function() {
      var maze = ndarray([
          0, 1, 0, 0, 0, 0, 0,
          0, 1, 0, 1, 0, 0, 0,
          0, 1, 0, 1, 1, 1, 0,
          0, 1, 0, 1, 0, 0, 0,
          0, 1, 0, 1, 0, 0, 0,
          0, 1, 0, 1, 0, 0, 0,
          0, 1, 0, 1, 0, 1, 1,
          0, 0, 0, 1, 0, 0, 0,
        ], [8, 7])

      var pathInfo = planPath(0, 0, 7, 6, maze);
      expect(pathInfo.path).eql([ 0, 0, 7, 0, 7, 2, 0, 2, 0, 4, 1, 4, 1, 6, 3, 6, 5, 6, 5, 4, 7, 4, 7, 6 ]);
      expect(pathInfo.dist).eql(31);
  });
});

describe('pngPictureToArray function', () => {
  it('should convert a buffer to an array', function() {
      var data = fs.readFileSync('test/maze.png');
      
      var maze = pngPictureToArray(data, 123);

      var desiredMaze = ndarray([
          0, 1, 0, 0, 0, 0, 0,
          0, 1, 0, 1, 0, 0, 0,
          0, 1, 0, 1, 1, 1, 0,
          0, 1, 0, 1, 0, 0, 0,
          0, 1, 0, 1, 0, 0, 0,
          0, 1, 0, 1, 0, 0, 0,
          0, 1, 0, 1, 0, 1, 1,
          0, 0, 0, 1, 0, 0, 0,
        ], [8, 7])

      expect(desiredMaze).eql(maze);
  });
});

describe('solveMaze function', () => {
  it('should solve a maze', function() {
      var event = {
        'threshold': 123,
        'picture': 'iVBORw0KGgoAAAANSUhEUgAAAAgAAAAHCAIAAAC6O5sJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAxSURBVBhXY/z//z8D8QCoGreO6urqqqoqKAcJQHUwMqJrZYLSSACoCEhCJdBtYmAAANWZFNu+DbQ1AAAAAElFTkSuQmCC',
        'content-type': 'image/png',
        'start': {
          'x': 0,
          'y': 0
        },
        'goal': {
          'x': 7,
          'y': 6
        }
      }

      var pathInfo = solveMaze(event);

      var result = JSON.stringify(pathInfo);

      var desiredResult = '{"path":[0,0,7,0,7,2,0,2,0,4,1,4,1,6,3,6,5,6,5,4,7,4,7,6],"dist":31}'

      expect(result).eql(desiredResult);
  });
});