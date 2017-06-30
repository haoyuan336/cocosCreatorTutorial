/**
 * Created by chuhaoyuan on 2017/6/30.
 */
import defines from './defines'
const PuzzleDataController = function () {
  let that = {};

  const getRandomValue = function () {
    let random = Math.floor(Math.random() * defines.PuzzleLineValueList.length);
    return  defines.PuzzleLineValue[defines.PuzzleLineValueList[random]];
  };

  that.getGameData = function () {
    //得到一组，游戏数据


    let list = [];
    for (let i = 0 ; i < 2 ; i ++){
      for (let j = 0 ; j < 3 ; j ++){
        let cellData = {};
        list.push(cellData);


        // cellData[defines.DirectionMap.UP] = defines.PuzzleLineValue.OUT;  //先设置成都是出来的
        // cellData[defines.DirectionMap.DOWN] = defines.PuzzleLineValue.OUT;  //都是出来的
        // cellData[defines.DirectionMap.LEFT] = defines.PuzzleLineValue.OUT;
        // cellData[defines.DirectionMap.RIGHT] = defines.PuzzleLineValue.OUT;

        //开始生成 里面的部分 先生成右边
        //生成右边缘

        cellData[defines.DirectionMap.RIGHT] = getRandomValue();

        //生成下边缘
        cellData[defines.DirectionMap.DOWN] = getRandomValue();

        //然后根据数组长度 来计算左边缘以及上边缘

        if (list.length > 1){
          //计算左边缘
          //取出列表中的上一个块
          let nextPuzzle = list[list.length - 2];
          cellData[defines.DirectionMap.LEFT] = 0 - nextPuzzle[defines.DirectionMap.RIGHT];
        }
        if (list.length > 3){
         // 计算上边缘
          let nextPuzzle = list[list.length - 4];
          cellData[defines.DirectionMap.UP] = 0 - nextPuzzle[defines.DirectionMap.DOWN];
        }


        ///开始生成地图
        //首先先生成边缘的边
        //上边缘
        if ( i === 0){
          cellData[defines.DirectionMap.UP] = defines.PuzzleLineValue.MID;
        }
        //下边缘
        if (i === 1){
          cellData[defines.DirectionMap.DOWN] = defines.PuzzleLineValue.MID;
        }

        //左边缘
        if ( j === 0 ) {
          cellData[defines.DirectionMap.LEFT] = defines.PuzzleLineValue.MID;
        }
        //右边缘
        if ( j === 2 ){
          cellData[defines.DirectionMap.RIGHT] = defines.PuzzleLineValue.MID;
        }
      }

    }
    return list;
  };
  that.getIsSuccess = function (list) {
    for (let i = 0 ; i < 2 ; i ++){
      for (let j = 0 ; j < 3 ; j ++){
        //首先看一下，上下左右边缘是否都是mid
        let map = list[i * 3 + j];
        //上

        //列表是中左下角开始的，所以
        if ( i === 1){

          if (map[defines.DirectionMap.UP] !== defines.PuzzleLineValue.MID){
            //只要不等于中简直 就返回假
            cc.log("test 1" + map[defines.DirectionMap.UP]);
            return false
          }
        }
        //下
        if (i === 0){
          if (map[defines.DirectionMap.DOWN] !== defines.PuzzleLineValue.MID){
            return false;
          }
        }
        //左
        if (j === 0){
          if (map[defines.DirectionMap.LEFT] !== defines.PuzzleLineValue.MID){
            return false
          }
        }
        //右
        if (j === 2){
          if (map[defines.DirectionMap.RIGHT] !== defines.PuzzleLineValue.MID){
            return false
          }
        }
        //然后计算中间的 左右相加 等于0
        if(j < 2){
          let nextMap = list[i * 3 + j + 1];
          if (map[defines.DirectionMap.RIGHT] + nextMap[defines.DirectionMap.LEFT] !== 0){
            //只要左右相加 ，不等于0，
            return false
          }
        }
        //上下相加等于0
        if (i < 1){
          let nextMap = list[ (i + 1) * 3 + j];
          if (map[defines.DirectionMap.UP] + nextMap[defines.DirectionMap.DOWN] !== 0){
            return false;
          }
        }

      }
    }


    //所有情况都考虑到，最终得到真值，运行一下试试
    return true;

  };


  return that;
};
export default PuzzleDataController;