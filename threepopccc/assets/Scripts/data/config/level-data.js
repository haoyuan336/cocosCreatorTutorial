/**
 * Created by chuhaoyuan on 2017/7/23.
 */

const MonsterList =  [
  ["monster_1","monster_2","monster_3","monster_4"],
  ["monster_1","monster_2","monster_3","monster_4"],
  ["monster_1","monster_2","monster_3","monster_4"],
  ["monster_1","monster_2","monster_3","monster_4"],
];
const LevelData = {
  Level1: {
    monsterList: MonsterList[0],
    map: "./tiledmap/map_1.tmx"
  },
  Level2: {
    monsterList: MonsterList[1],
    map: "./tiledmap/map_2.tmx"
  },
  Level3: {
    monsterList: MonsterList[2],
    map: "./tiledmap/map_3.tmx"
  },
  Level4: {
    monsterList: MonsterList[3],
    map: "./tiledmap/map_4.tmx"
  }
};
export default LevelData;