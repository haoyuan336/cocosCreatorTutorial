/**
 * Created by chuhaoyuan on 2017/7/3.
 */
import defines from './defines'
const GameState = {
  Invailde: -1,
  Actioning: 1,
  WaitingInput: 2
};
const GameDataController = function() {
  let that = {};
  that.nullPosList = [];
  that.cellList = [];

  let _actionCount = 0;
  let _state = GameState.Invailde;
  const getRandomType = function () {
    let list = [];
    for (let i in defines.cellType){
      list.push(i);
    }
    let type = list[Math.floor(Math.random() * (list.length - 1))];
    return type;

  };
  that.getGameData =  function () {
    let gameData = [];

    for (let i = 0 ; i < defines.gameDataHeight; i ++){
      for (let j = 0 ; j < defines.gameDataWidth ; j ++){
        let data = {};
        data.type = getRandomType();
        gameData.push(data);
      }
    }

    return gameData
  };

  that.getOneCellData = function () {
    let data = {};
    data.type = getRandomType();
    return data;
  };
  that.addOneAction = function () {
    _actionCount ++;

    if (_actionCount !== 0){
      setState(GameState.Actioning);
    }
    console.log('action count = ' + _actionCount);
  };
  that.removeOneAction = function () {
    _actionCount --;
    if (_actionCount === 0){
      setState(GameState.WaitingInput);
    }
    console.log('action count = ' + _actionCount);

  };

  const setState = function (state) {
    switch (state){
      case GameState.Actioning:

        break;
      case GameState.WaitingInput:
        break;
    }
    _state = state
  };

  that.getIsCanInput = function () {
    if (_state === GameState.WaitingInput){
      return true;
    }
    return false;
  };

  that.checkCanSet = function (target,list) {

    ///只要上下左右连续三个是相同颜色的就ok
    cc.log("target type = " + target.getType());

    return true;
  };

  const getDirectionIndex = function (target,direction) {
    let index = null;
    cc.log("direction = " + JSON.stringify(direction));
    switch (direction){
      case "UP":
        if (target.indexRow < defines.gameDataHeight - 1){
          index = (target.indexRow + 1) * defines.gameDataWidth + target.indexLine;
        }
        break;
      case "DOWN":
        if (target.indexRow > 0){
          index = (target.indexRow - 1) * defines.gameDataWidth + target.indexLine;
        }
        break;
      case "LEFT":
        if (target.indexLine > 0 ){
          index = (target.indexRow * defines.gameDataWidth + target.indexLine - 1);
        }
        break;
      case "RIGHT":
        if (target.indexLine < defines.gameDataWidth - 1 ){
          index = (target.indexRow * defines.gameDataWidth + target.indexLine + 1);
        }
        break;
    }
    return index;
  };

  const DirectionList = ["UP","DOWN","LEFT","RIGHT"];


  const getTargetIndex = function (target) {
    let index = 0;
    cc.log("index row = " + target.indexRow);
    cc.log("index line = " + target.indexLine);
    index = (target.indexRow * defines.gameDataWidth + target.indexLine);
    return index;
  };
  const getDirectionCell = function (target,map, cellList) {
    let targetIndex = getTargetIndex(target);
    cc.log("target index = " + targetIndex);
    if (map[targetIndex] === true){
      cc.log("检查过了");

      return;
    }
    map[targetIndex] = true;
    let count = 0;
    for (let i in map){
      count ++;
    };
    cc.log("count = " + count);
    for (let i = 0 ; i < DirectionList.length ; i ++ ){
      let index = getDirectionIndex(target, DirectionList[i]);
      cc.log("index = " + index);
      if (index !== null){
        let cell = cellList[index];
        if (cell.getComponent("cell").getType() === target.getComponent("cell").getType()){
          getDirectionCell(cell,map,cellList);
        }else {
          cc.log("不等，跳出");
        }
      }

    }
  };
  that.getPopCellList = function (target, cellList) {
    let map = {};
    getDirectionCell(target.node,map, cellList);
    let count = 0;
    for (let i in map){
      count ++;
    }
    cc.log("count = " + JSON.stringify(map));

    if (count > 1){
      return map;
    }
    return {};
  };

  that.proceGetAllEnergy = function (map, cellList) {
    let count = 0;
    let energyCount = 0;
    for (let  i in map){
      let cell = cellList[i];
      energyCount += cell.getComponent("cell").getEnergy();

      count++
    }
    //一共消了几个豆   得到的能力有数量加成
    // count *= Math.floor(count / );
    energyCount *= count;
    cc.log("energy count = " + energyCount);
    return energyCount;
  };


  return that;
};
export default GameDataController;