/**
 * Created by chuhaoyuan on 2017/6/28.
 */
const defines = {};
defines.PuzzleLineType = {
  UP: 1,
  DOWN: -1,
  MIDDLE: 0
};
defines.PuzzleDirectionList = ["UP","DOWN","LEFT","RIGHT"];
defines.PuzzleDirectionMap = {
  UP: 1,
  DOWN: 2,
  LEFT: 3,
  RIGHT: 4
};
defines.PuzzleCellState = {
  "ONTOUCH": 1,
  "ONDRAGGING": 2,
  "ONMAP": 3
};
export default defines