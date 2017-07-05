'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _game_defines = require('./game_defines');

var _game_defines2 = _interopRequireDefault(_game_defines);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PuzzleController = function PuzzleController() {
  var that = {};

  var getRandomValue = function getRandomValue() {
    return _game_defines2.default.PuzzleLineType[_game_defines2.default.PuzzleLineTypeList[Math.floor(Math.random() * _game_defines2.default.PuzzleLineTypeList.length)]];
  };

  that.getPuzzleMap = function () {
    var list = [];
    for (var i = 0; i < 2; i++) {
      for (var j = 0; j < 3; j++) {
        var map = {};
        list.push(map);
        map[_game_defines2.default.PuzzleDirectionMap.RIGHT] = getRandomValue();
        map[_game_defines2.default.PuzzleDirectionMap.DOWN] = getRandomValue();
        if (list.length > 1) {
          var beforMap = undefined;
          if (i === 0) {
            beforMap = list[list.length - 2];
          }
          if (i === 1) {
            beforMap = list[list.length - 4];
          }
          map[_game_defines2.default.PuzzleDirectionMap.UP] = 0 - beforMap[_game_defines2.default.PuzzleDirectionMap.DOWN];
          map[_game_defines2.default.PuzzleDirectionMap.LEFT] = 0 - beforMap[_game_defines2.default.PuzzleDirectionMap.RIGHT];
        }

        if (i === 0) {
          map[_game_defines2.default.PuzzleDirectionMap.UP] = _game_defines2.default.PuzzleLineType.MIDDLE;
        }
        if (i === 1) {
          map[_game_defines2.default.PuzzleDirectionMap.DOWN] = _game_defines2.default.PuzzleLineType.MIDDLE;
        }
        if (j === 0) {
          map[_game_defines2.default.PuzzleDirectionMap.LEFT] = _game_defines2.default.PuzzleLineType.MIDDLE;
        }
        if (j === 2) {
          map[_game_defines2.default.PuzzleDirectionMap.RIGHT] = _game_defines2.default.PuzzleLineType.MIDDLE;
        }

        console.log('map = ' + JSON.stringify(map));
        console.log('index =' + i + ',' + j);
      }
    }

    return list;
  };

  return that;
}; /**
    * Created by chuhaoyuan on 2017/6/28.
    */
exports.default = PuzzleController;
module.exports = exports['default'];