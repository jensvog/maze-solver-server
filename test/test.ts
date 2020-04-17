import { planPath } from '../mazesolver';
import { expect } from 'chai';
import 'mocha'

var ndarray = require('ndarray');

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