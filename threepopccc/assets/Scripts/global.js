/**
 * Created by chuhaoyuan on 2017/7/3.
 */
import GameDataController from './GameDataController'
import EventListener from './common/'
import GameData from './data/game-data'
const global = {};
global.gameDataController = GameDataController();
global.eventListener = EventListener({});
global.gameData = GameData();
export default global;