/**
 * Created by chuhaoyuan on 2017/7/3.
 */
import GameDataController from './GameDataController'
import EventListener from './EventListener'
const global = {};
global.gameDataController = GameDataController();
global.eventListener = EventListener({});
export default global;