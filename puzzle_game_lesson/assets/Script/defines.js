/**
 * Created by chuhaoyuan on 2017/6/30.
 */
const defines = {};
defines.DirectionList = [ "UP", "DOWN", "LEFT", "RIGHT"];
defines.DirectionMap = {
  "UP": 1,
  "DOWN": 2,
  "LEFT": 3,
  "RIGHT": 4
};
defines.PuzzleLineValueList = ["IN","OUT","MID"];
defines.PuzzleLineValue = {
  IN: -1,   //进去的
  OUT: 1,   //出来的
  MID: 0    //平的
};
export default defines