/**
 * Created by chuhaoyuan on 2017/6/28.
 */
import defines from './game_defines'
const PuzzleController = function () {
  let that = {};


  const createOneCellData = function () {
    let map = {};
    for (let i = 0 ; i < defines.PuzzleDirectionList.length ; i ++){
      map[defines.PuzzleDirectionList[i]] = defines.PuzzleLineType.MIDDLE;
    }
    return map;
  };

  that.getPuzzleMap = function () {
    let list = [];
    for (let i = 0 ; i < 6 ; i ++){
      list.push(createOneCellData());
    }
    return list;
  };

  return that;
};
export default PuzzleController;
