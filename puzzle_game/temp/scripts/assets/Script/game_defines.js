"use strict";
cc._RF.push(module, '93d75nzcUdD7qqmZQMAnH9C', 'game_defines');
// Script/game_defines.js

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Created by chuhaoyuan on 2017/6/28.
 */
var defines = {};
defines.PuzzleLineTypeList = ["UP", "DOWN", "MIDDLE"];
defines.PuzzleLineType = {
  UP: 1,
  DOWN: -1,
  MIDDLE: 0
};
defines.PuzzleDirectionList = ["UP", "DOWN", "LEFT", "RIGHT"];
defines.PuzzleDirectionMap = {
  UP: 1,
  DOWN: 2,
  LEFT: 3,
  RIGHT: 4
};
exports.default = defines;
module.exports = exports["default"];

cc._RF.pop();