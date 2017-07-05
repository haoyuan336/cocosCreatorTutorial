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





    return true;
  };

  return that;
};
export default GameDataController;