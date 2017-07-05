require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"game_defines":[function(require,module,exports){
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
},{}],"game_layer":[function(require,module,exports){
"use strict";
cc._RF.push(module, '83489XgughGr4Ot6AMGsmiq', 'game_layer');
// Script/game_layer.js

'use strict';

var _puzzle_controller = require('./puzzle_controller');

var _puzzle_controller2 = _interopRequireDefault(_puzzle_controller);

var _game_defines = require('./game_defines');

var _game_defines2 = _interopRequireDefault(_game_defines);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

cc.Class({
    extends: cc.Component,

    properties: {
        cell_bg: {
            type: cc.Prefab,
            default: null
        },
        puzzleCell: {
            type: cc.Prefab,
            default: null
        },
        touchCellList: {
            type: cc.Node,
            default: []
        }
    },

    // use this for initialization
    onLoad: function onLoad() {

        this.purCellList = [];
        for (var i = 0; i < 2; i++) {
            for (var j = 0; j < 3; j++) {
                var node = cc.instantiate(this.cell_bg);
                node.parent = this.node;
                node.active = false;
                node.position = {
                    x: (3 - 1) * -0.5 * 260 + j * 260,
                    y: 180 + 260 * i
                };
                this.purCellList.push(node);
            }
        }

        //初始化一个地图
        this.puzzleController = (0, _puzzle_controller2.default)();
        var mapData = this.puzzleController.getPuzzleMap();
        console.log('map data = ' + JSON.stringify(mapData));

        //初始化碎片节点
        this.cellList = [];
        var index = 0;
        for (var _i in mapData) {
            var _node = cc.instantiate(this.puzzleCell);
            _node.parent = this.node;
            _node.getComponent("puzzle_cell").init(mapData[_i], this, index);
            this.cellList.push(_node);
            index++;
        }
        this.referCellUI();
    },

    referCellUI: function referCellUI() {
        var index = 0;
        for (var i = 0; i < this.cellList.length; i++) {
            var cell = this.cellList[i];
            if (cell.getComponent('puzzle_cell').getIsOnTouchMap()) {
                // console.log('is on map');
                cell.active = true;
                if (index < 3) {
                    cell.position = this.touchCellList[index].position;
                } else {
                    cell.active = false;
                }
                index++;
            }
        }
    },
    puzzleCellTouchEnd: function puzzleCellTouchEnd(target) {
        // x
        //得到最近的点
        var minDis = 10000;
        var purPos = undefined;
        for (var i = 0; i < this.purCellList.length; i++) {
            var purCell = this.purCellList[i];
            var pos = purCell.position;
            var touchEndPos = target.node.position;
            var distance = cc.pDistance(pos, touchEndPos);
            if (distance < minDis) {
                minDis = distance;
                purPos = pos;
            }
        }
        //再次检测碰撞
        var nodeMinDis = 10000;
        for (var _i2 = 0; _i2 < this.cellList.length; _i2++) {
            var node = this.cellList[_i2];
            if (node.getComponent('puzzle_cell').getIsOnMap()) {
                var dis = cc.pDistance(purPos, node.position);
                if (dis < nodeMinDis) {
                    nodeMinDis = dis;
                }
            }
        }
        if (minDis < 140 && nodeMinDis > 140) {
            target.node.position = purPos;
            target.setOnMap();
        } else {
            target.setOnTouchMap();
        }
        this.referCellUI();
        // cc.log("mndis = " + minDis);
    },
    puzzleCellTouchBegan: function puzzleCellTouchBegan(target) {

        for (var i in this.cellList) {
            this.cellList[i].zIndex = 10;
        }
        target.node.zIndex = 100;
        this.referCellUI();
    }
});

cc._RF.pop();
},{"./game_defines":"game_defines","./puzzle_controller":"puzzle_controller"}],"layout_controller":[function(require,module,exports){
"use strict";
cc._RF.push(module, '293aaR9vSxJOLjEEFwyK8l1', 'layout_controller');
// Script/layout_controller.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {

        game_layer: {
            type: cc.Prefab,
            default: null
        },
        ready_layer: {
            type: cc.Node,
            default: null
        }
    },

    // use this for initialization
    onLoad: function onLoad() {},
    startButton: function startButton() {
        cc.log("游戏开始按钮");
        this.node.removeChild(this.ready_layer);
        var node = cc.instantiate(this.game_layer);
        node.parent = this.node;
    }

});

cc._RF.pop();
},{}],"puzzle_cell":[function(require,module,exports){
"use strict";
cc._RF.push(module, '6a696dMCktKKYiVFWCAfWQG', 'puzzle_cell');
// Script/puzzle_cell.js

'use strict';

var _game_defines = require('./game_defines');

var _game_defines2 = _interopRequireDefault(_game_defines);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PUZZELSTATE = {
    Dragging: 1,
    OnTouchMap: 2,
    OnMap: 3
};

cc.Class({
    extends: cc.Component,

    properties: {
        bgSptiteFrame: {
            type: cc.SpriteFrame,
            default: null
        },
        cellUp: {
            type: cc.Prefab,
            default: null
        },
        label: {
            type: cc.Label,
            default: null
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.node.getComponent(cc.Sprite).spriteFrame = this.bgSptiteFrame;
        this.isDragging = false;
        this.state = PUZZELSTATE.OnTouchMap;
        var self = this;
        var touchStart = function touchStart(event) {
            console.log('touch start =' + JSON.stringify(event.getLocation()));
            self.isDragging = true;
            self.setState(PUZZELSTATE.Dragging);
            self.parentScript.puzzleCellTouchBegan(self);
        };
        var touchMove = function touchMove(event) {
            console.log('touch move =' + JSON.stringify(event.getLocation()));
            if (self.isDragging === true) {
                // self.node.position = self.node.convertTouchToNodeSpace(event.getLocation());
                var touchPos = self.node.parent.convertTouchToNodeSpace(event);
                console.log('touch pos = ' + JSON.stringify(touchPos));
                self.node.position = touchPos;
            }
        };
        var touchEnd = function touchEnd(event) {
            console.log('touch end =' + JSON.stringify(event.getLocation()));

            self.isDragging = false;
            self.parentScript.puzzleCellTouchEnd(self);
        };

        this.node.on(cc.Node.EventType.TOUCH_START, touchStart, this.node);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, touchMove, this.node);
        this.node.on(cc.Node.EventType.TOUCH_END, touchEnd, this.node);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, touchEnd, this.node);
    },

    init: function init(spec, parentScript, index) {
        this.index = index;
        this.label.string = index + '';
        this.parentScript = parentScript;
        console.log('spec' + JSON.stringify(spec));

        // 根据参数创建方向


        for (var i in spec) {
            this.initLine(i, spec[i]);
        }
    },
    cellUpPosList: function cellUpPosList(index) {
        var list = [cc.v2(0, 156), cc.v2(0, -156), cc.v2(-156, 0), cc.v2(156, 0)];
        return list[index];
    },
    angleMap: function angleMap(index) {
        var list = [180, 0, 90, -90];
        return list[index];
    },

    initLine: function initLine(direction, value) {
        //方向 跟值传过来

        console.log('direction = ' + direction);
        console.log('value = ' + value);
        if (direction === undefined) {
            return;
        }
        if (value === undefined) {
            return;
        }
        if (value === _game_defines2.default.PuzzleLineType.DOWN) {
            return;
        }
        //
        if (value === _game_defines2.default.PuzzleLineType.UP) {
            // let node = cc.Node();
            // node.addComponent(cc.Sprite).spriteFrame = this.cellUp;
            // node.parent = this.node;
            //
            var node = cc.instantiate(this.cellUp);
            node.parent = this.node;
            // node.position = this.cellUpPosList(direction);
            // node.rotation = this.angleMap(direction);
        }
        console.log('this。index ' + this.index);
    },
    setOnMap: function setOnMap() {
        this.setState(PUZZELSTATE.OnMap);
    },
    setOnTouchMap: function setOnTouchMap() {
        this.setState(PUZZELSTATE.OnTouchMap);
    },
    setState: function setState(state) {
        this.state = state;
    },
    getIsOnMap: function getIsOnMap() {
        if (this.state === PUZZELSTATE.OnMap) {
            return true;
        }
        return false;
    },
    getIsOnTouchMap: function getIsOnTouchMap() {
        if (this.state === PUZZELSTATE.OnTouchMap) {
            return true;
        }
        return false;
    }
});

cc._RF.pop();
},{"./game_defines":"game_defines"}],"puzzle_controller":[function(require,module,exports){
"use strict";
cc._RF.push(module, '93dba5ObaZLWrBDTYFe99Bd', 'puzzle_controller');
// Script/puzzle_controller.js

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _game_defines = require('./game_defines');

var _game_defines2 = _interopRequireDefault(_game_defines);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PuzzleController = function PuzzleController() {
  var that = {};

  var getRandomValue = function getRandomValue() {
    return _game_defines2.default.PuzzleLineType[_game_defines2.default.PuzzleLineTypeList[Math.floor(Math.random() * _game_defines2.default.PuzzleLineTypeList.length)]];
  };

  that.getPuzzleMap = function () {
    var list = [];
    for (var i = 0; i < 2; i++) {
      for (var j = 0; j < 3; j++) {
        var map = {};
        list.push(map);
        map[_game_defines2.default.PuzzleDirectionMap.RIGHT] = getRandomValue();
        map[_game_defines2.default.PuzzleDirectionMap.DOWN] = getRandomValue();
        if (list.length > 1) {
          var beforMap = undefined;
          if (i === 0) {
            beforMap = list[list.length - 2];
          }
          if (i === 1) {
            beforMap = list[list.length - 4];
          }
          map[_game_defines2.default.PuzzleDirectionMap.UP] = 0 - beforMap[_game_defines2.default.PuzzleDirectionMap.DOWN];
          map[_game_defines2.default.PuzzleDirectionMap.LEFT] = 0 - beforMap[_game_defines2.default.PuzzleDirectionMap.RIGHT];
        }

        if (i === 0) {
          map[_game_defines2.default.PuzzleDirectionMap.UP] = _game_defines2.default.PuzzleLineType.MIDDLE;
        }
        if (i === 1) {
          map[_game_defines2.default.PuzzleDirectionMap.DOWN] = _game_defines2.default.PuzzleLineType.MIDDLE;
        }
        if (j === 0) {
          map[_game_defines2.default.PuzzleDirectionMap.LEFT] = _game_defines2.default.PuzzleLineType.MIDDLE;
        }
        if (j === 2) {
          map[_game_defines2.default.PuzzleDirectionMap.RIGHT] = _game_defines2.default.PuzzleLineType.MIDDLE;
        }

        console.log('map = ' + JSON.stringify(map));
        console.log('index =' + i + ',' + j);
      }
    }

    return list;
  };

  return that;
}; /**
    * Created by chuhaoyuan on 2017/6/28.
    */
exports.default = PuzzleController;
module.exports = exports['default'];

cc._RF.pop();
},{"./game_defines":"game_defines"}]},{},["game_defines","game_layer","layout_controller","puzzle_cell","puzzle_controller"])

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvZ2FtZV9kZWZpbmVzLmpzIiwiYXNzZXRzL1NjcmlwdC9nYW1lX2xheWVyLmpzIiwiYXNzZXRzL1NjcmlwdC9sYXlvdXRfY29udHJvbGxlci5qcyIsImFzc2V0cy9TY3JpcHQvcHV6emxlX2NlbGwuanMiLCJhc3NldHMvU2NyaXB0L3B1enpsZV9jb250cm9sbGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0U7QUFDQTtBQUNBO0FBSHVCO0FBS3pCO0FBQ0E7QUFDRTtBQUNBO0FBQ0E7QUFDQTtBQUoyQjtBQU1kOzs7Ozs7Ozs7OztBQ2pCZjs7OztBQUNBOzs7Ozs7QUFDQTtBQUNJOztBQUVBO0FBQ0k7QUFDSTtBQUNBO0FBRks7QUFJVDtBQUNJO0FBQ0E7QUFGUTtBQUlaO0FBQ0k7QUFDQTtBQUZXO0FBVFA7O0FBZVo7QUFDQTs7QUFFSTtBQUNBO0FBQ0k7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNJO0FBQ0E7QUFGWTtBQUloQjtBQUNIO0FBQ0o7O0FBR0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0g7QUFDRDtBQUNIOztBQUVEO0FBQ0k7QUFDRDtBQUNJO0FBQ0E7QUFDSTtBQUNBO0FBQ0M7QUFDSTtBQUNIO0FBQ0c7QUFDSDtBQUNGO0FBRUg7QUFDSjtBQUNIO0FBQ0Q7QUFDRTtBQUNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNJO0FBQ0E7QUFDSDtBQUNKO0FBQ0Q7QUFDQTtBQUNBO0FBQ0k7QUFDQTtBQUNJO0FBQ0E7QUFDSTtBQUNIO0FBQ0o7QUFDSjtBQUNEO0FBQ0k7QUFDQTtBQUNIO0FBQ0c7QUFFSDtBQUNEO0FBQ0E7QUFFSDtBQUNEOztBQUVJO0FBQ0k7QUFDSDtBQUNEO0FBQ0E7QUFFSDtBQXBISTs7Ozs7Ozs7OztBQ0ZUO0FBQ0k7O0FBRUE7O0FBRUk7QUFDSTtBQUNBO0FBRlE7QUFJWjtBQUNJO0FBQ0E7QUFGUztBQU5MOztBQVlaO0FBQ0E7QUFHQTtBQUNJO0FBQ0E7QUFDQTtBQUNBO0FBQ0g7O0FBeEJJOzs7Ozs7Ozs7O0FDQVQ7Ozs7OztBQUNBO0FBQ0k7QUFDQTtBQUNBO0FBSGdCOztBQU1wQjtBQUNJOztBQUVBO0FBQ0k7QUFDSTtBQUNBO0FBRlc7QUFJZjtBQUNJO0FBQ0E7QUFGSTtBQUlSO0FBQ0k7QUFDQTtBQUZHO0FBVEM7O0FBZVo7QUFDQTtBQUNJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSTtBQUNBO0FBQ0E7QUFDQTtBQUVIO0FBQ0Q7QUFDSTtBQUNBO0FBQ0k7QUFDQTtBQUNBO0FBQ0E7QUFDSDtBQUNKO0FBQ0Q7QUFDSTs7QUFFQTtBQUNBO0FBR0g7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDSDs7QUFFRDtBQUNJO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7QUFHQTtBQUNJO0FBRUg7QUFHSjtBQUNEO0FBQ0k7QUFPRDtBQUNGO0FBQ0Q7QUFDSTtBQUNBO0FBQ0g7O0FBRUQ7QUFDSTs7QUFFQTtBQUNBO0FBQ0E7QUFDSTtBQUNIO0FBQ0Q7QUFDSTtBQUNIO0FBQ0Q7QUFDSTtBQUNIO0FBQ0Q7QUFDQTtBQUNJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSDtBQUNEO0FBR0g7QUFDRDtBQUNJO0FBQ0g7QUFDRDtBQUNJO0FBQ0g7QUFDRDtBQUNJO0FBQ0g7QUFDRDtBQUNJO0FBQ0k7QUFDSDtBQUNEO0FBQ0g7QUFDRDtBQUNJO0FBQ0k7QUFDSDtBQUNEO0FBQ0g7QUF2SUk7Ozs7Ozs7Ozs7Ozs7O0FDSlQ7Ozs7OztBQUNBO0FBQ0U7O0FBR0E7QUFDRTtBQUNEOztBQUVEO0FBQ0U7QUFDQTtBQUNFO0FBQ0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNFO0FBQ0E7QUFDRTtBQUNEO0FBQ0Q7QUFDRTtBQUNEO0FBQ0Q7QUFDQTtBQUNEOztBQUdEO0FBQ0U7QUFDRDtBQUNEO0FBQ0U7QUFDRDtBQUNEO0FBQ0U7QUFDRDtBQUNEO0FBQ0U7QUFDRDs7QUFFRDtBQUNBO0FBR0Q7QUFDRjs7QUFFRDtBQUNEOztBQUVEO0FBQ0Q7OztBQUNjIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IGNodWhhb3l1YW4gb24gMjAxNy82LzI4LlxuICovXG5jb25zdCBkZWZpbmVzID0ge307XG5kZWZpbmVzLlB1enpsZUxpbmVUeXBlTGlzdCA9IFtcIlVQXCIsXCJET1dOXCIsXCJNSURETEVcIl07XG5kZWZpbmVzLlB1enpsZUxpbmVUeXBlID0ge1xuICBVUDogMSxcbiAgRE9XTjogLTEsXG4gIE1JRERMRTogMFxufTtcbmRlZmluZXMuUHV6emxlRGlyZWN0aW9uTGlzdCA9IFtcIlVQXCIsXCJET1dOXCIsXCJMRUZUXCIsXCJSSUdIVFwiXTtcbmRlZmluZXMuUHV6emxlRGlyZWN0aW9uTWFwID0ge1xuICBVUDogMSxcbiAgRE9XTjogMixcbiAgTEVGVDogMyxcbiAgUklHSFQ6IDRcbn07XG5leHBvcnQgZGVmYXVsdCBkZWZpbmVzIiwiaW1wb3J0IFB1enpsZUNvbnRyb2xsZXIgZnJvbSAnLi9wdXp6bGVfY29udHJvbGxlcidcbmltcG9ydCBkZWZpbmVzIGZyb20gJy4vZ2FtZV9kZWZpbmVzJ1xuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgY2VsbF9iZzoge1xuICAgICAgICAgICAgdHlwZTogY2MuUHJlZmFiLFxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbFxuICAgICAgICB9LFxuICAgICAgICBwdXp6bGVDZWxsOiB7XG4gICAgICAgICAgICB0eXBlOiBjYy5QcmVmYWIsXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsXG4gICAgICAgIH0sXG4gICAgICAgIHRvdWNoQ2VsbExpc3Q6IHtcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGUsXG4gICAgICAgICAgICBkZWZhdWx0OiBbXVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIHRoaXMucHVyQ2VsbExpc3QgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDAgOyBpIDwgMiA7IGkgKyspe1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDAgOyBqIDwgMyA7IGogKyspe1xuICAgICAgICAgICAgICAgIGxldCBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5jZWxsX2JnKTtcbiAgICAgICAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMubm9kZTtcbiAgICAgICAgICAgICAgICBub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIG5vZGUucG9zaXRpb24gPSB7XG4gICAgICAgICAgICAgICAgICAgIHg6ICgzIC0gMSkgKiAtIDAuNSAqIDI2MCArIGogKiAyNjAsXG4gICAgICAgICAgICAgICAgICAgIHk6IDE4MCArICAyNjAgKiBpXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB0aGlzLnB1ckNlbGxMaXN0LnB1c2gobm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8v5Yid5aeL5YyW5LiA5Liq5Zyw5Zu+XG4gICAgICAgIHRoaXMucHV6emxlQ29udHJvbGxlciA9IFB1enpsZUNvbnRyb2xsZXIoKTtcbiAgICAgICAgbGV0IG1hcERhdGEgPSB0aGlzLnB1enpsZUNvbnRyb2xsZXIuZ2V0UHV6emxlTWFwKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdtYXAgZGF0YSA9ICcgKyBKU09OLnN0cmluZ2lmeShtYXBEYXRhKSk7XG5cbiAgICAgICAgLy/liJ3lp4vljJbnoo7niYfoioLngrlcbiAgICAgICAgdGhpcy5jZWxsTGlzdCA9IFtdO1xuICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICBmb3IgKGxldCBpIGluIG1hcERhdGEpe1xuICAgICAgICAgICAgbGV0IG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnB1enpsZUNlbGwpO1xuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLm5vZGU7XG4gICAgICAgICAgICBub2RlLmdldENvbXBvbmVudChcInB1enpsZV9jZWxsXCIpLmluaXQobWFwRGF0YVtpXSx0aGlzLGluZGV4KTtcbiAgICAgICAgICAgIHRoaXMuY2VsbExpc3QucHVzaChub2RlKTtcbiAgICAgICAgICAgIGluZGV4ICsrO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVmZXJDZWxsVUkoKTtcbiAgICB9XG4gICAgLFxuICAgIHJlZmVyQ2VsbFVJIDogZnVuY3Rpb24gKCkge1xuICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgIGZvciAobGV0IGkgPSAwIDsgaSA8IHRoaXMuY2VsbExpc3QubGVuZ3RoIDsgaSArKyl7XG4gICAgICAgICAgIGxldCBjZWxsID0gdGhpcy5jZWxsTGlzdFtpXTtcbiAgICAgICAgICAgaWYgKGNlbGwuZ2V0Q29tcG9uZW50KCdwdXp6bGVfY2VsbCcpLmdldElzT25Ub3VjaE1hcCgpKXtcbiAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdpcyBvbiBtYXAnKTtcbiAgICAgICAgICAgICAgIGNlbGwuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPCAzKXtcbiAgICAgICAgICAgICAgICAgICAgY2VsbC5wb3NpdGlvbiA9IHRoaXMudG91Y2hDZWxsTGlzdFtpbmRleF0ucG9zaXRpb247XG4gICAgICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjZWxsLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgIGluZGV4ICsrO1xuXG4gICAgICAgICAgIH1cbiAgICAgICB9XG4gICAgfSxcbiAgICBwdXp6bGVDZWxsVG91Y2hFbmQ6IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgIC8vIHhcbiAgICAgICAgLy/lvpfliLDmnIDov5HnmoTngrlcbiAgICAgICAgbGV0IG1pbkRpcyA9IDEwMDAwO1xuICAgICAgICBsZXQgcHVyUG9zID0gdW5kZWZpbmVkO1xuICAgICAgICBmb3IgKGxldCBpID0gMCA7IGkgPCB0aGlzLnB1ckNlbGxMaXN0Lmxlbmd0aCA7IGkgKyspe1xuICAgICAgICAgICAgbGV0IHB1ckNlbGwgPSB0aGlzLnB1ckNlbGxMaXN0W2ldO1xuICAgICAgICAgICAgbGV0IHBvcyA9IHB1ckNlbGwucG9zaXRpb247XG4gICAgICAgICAgICBsZXQgdG91Y2hFbmRQb3MgPSB0YXJnZXQubm9kZS5wb3NpdGlvbjtcbiAgICAgICAgICAgIGxldCBkaXN0YW5jZSA9IGNjLnBEaXN0YW5jZShwb3MsdG91Y2hFbmRQb3MpO1xuICAgICAgICAgICAgaWYgKGRpc3RhbmNlIDwgbWluRGlzKXtcbiAgICAgICAgICAgICAgICBtaW5EaXMgPSBkaXN0YW5jZTtcbiAgICAgICAgICAgICAgICBwdXJQb3MgPSBwb3M7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy/lho3mrKHmo4DmtYvnorDmkp5cbiAgICAgICAgbGV0IG5vZGVNaW5EaXMgPSAxMDAwMDtcbiAgICAgICAgZm9yICAobGV0IGkgPSAwIDsgaSA8IHRoaXMuY2VsbExpc3QubGVuZ3RoIDsgaSArKyl7XG4gICAgICAgICAgICBsZXQgbm9kZSA9IHRoaXMuY2VsbExpc3RbaV07XG4gICAgICAgICAgICBpZiAobm9kZS5nZXRDb21wb25lbnQoJ3B1enpsZV9jZWxsJykuZ2V0SXNPbk1hcCgpKXtcbiAgICAgICAgICAgICAgICBsZXQgZGlzID0gY2MucERpc3RhbmNlKHB1clBvcywgbm9kZS5wb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgaWYgKGRpcyA8IG5vZGVNaW5EaXMpe1xuICAgICAgICAgICAgICAgICAgICBub2RlTWluRGlzID0gZGlzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAobWluRGlzIDwgMTQwICYmIG5vZGVNaW5EaXMgPiAxNDApe1xuICAgICAgICAgICAgdGFyZ2V0Lm5vZGUucG9zaXRpb24gPSBwdXJQb3M7XG4gICAgICAgICAgICB0YXJnZXQuc2V0T25NYXAoKTtcbiAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgdGFyZ2V0LnNldE9uVG91Y2hNYXAoKTtcblxuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVmZXJDZWxsVUkoKTtcbiAgICAgICAgLy8gY2MubG9nKFwibW5kaXMgPSBcIiArIG1pbkRpcyk7XG5cbiAgICB9LFxuICAgIHB1enpsZUNlbGxUb3VjaEJlZ2FuOiBmdW5jdGlvbiAodGFyZ2V0KSB7XG5cbiAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLmNlbGxMaXN0KXtcbiAgICAgICAgICAgIHRoaXMuY2VsbExpc3RbaV0uekluZGV4ID0gMTA7XG4gICAgICAgIH1cbiAgICAgICAgdGFyZ2V0Lm5vZGUuekluZGV4ID0gMTAwO1xuICAgICAgICB0aGlzLnJlZmVyQ2VsbFVJKCk7XG5cbiAgICB9XG59KTtcbiIsImNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG5cbiAgICAgICAgZ2FtZV9sYXllcjoge1xuICAgICAgICAgICAgdHlwZTogY2MuUHJlZmFiLFxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbFxuICAgICAgICB9LFxuICAgICAgICByZWFkeV9sYXllcjoge1xuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGxcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcblxuICAgIH0sXG4gICAgc3RhcnRCdXR0b246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2MubG9nKFwi5ri45oiP5byA5aeL5oyJ6ZKuXCIpO1xuICAgICAgICB0aGlzLm5vZGUucmVtb3ZlQ2hpbGQodGhpcy5yZWFkeV9sYXllcik7XG4gICAgICAgIGxldCBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5nYW1lX2xheWVyKTtcbiAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLm5vZGU7XG4gICAgfVxuXG5cbn0pO1xuIiwiaW1wb3J0IGRlZmluZXMgZnJvbSAnLi9nYW1lX2RlZmluZXMnXG5jb25zdCBQVVpaRUxTVEFURSA9IHtcbiAgICBEcmFnZ2luZzogMSxcbiAgICBPblRvdWNoTWFwOiAyLFxuICAgIE9uTWFwOiAzXG59O1xuXG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBiZ1NwdGl0ZUZyYW1lOiB7XG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVGcmFtZSxcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGxcbiAgICAgICAgfSxcbiAgICAgICAgY2VsbFVwOiB7XG4gICAgICAgICAgICB0eXBlOiBjYy5QcmVmYWIsXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsXG4gICAgICAgIH0sXG4gICAgICAgIGxhYmVsOiB7XG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbCxcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGxcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gdGhpcy5iZ1NwdGl0ZUZyYW1lO1xuICAgICAgICB0aGlzLmlzRHJhZ2dpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IFBVWlpFTFNUQVRFLk9uVG91Y2hNYXA7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgY29uc3QgdG91Y2hTdGFydCA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3RvdWNoIHN0YXJ0ID0nICsgSlNPTi5zdHJpbmdpZnkoZXZlbnQuZ2V0TG9jYXRpb24oKSkpO1xuICAgICAgICAgICAgc2VsZi5pc0RyYWdnaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIHNlbGYuc2V0U3RhdGUoUFVaWkVMU1RBVEUuRHJhZ2dpbmcpO1xuICAgICAgICAgICAgc2VsZi5wYXJlbnRTY3JpcHQucHV6emxlQ2VsbFRvdWNoQmVnYW4oc2VsZik7XG5cbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgIHRvdWNoTW92ZSA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3RvdWNoIG1vdmUgPScgKyBKU09OLnN0cmluZ2lmeShldmVudC5nZXRMb2NhdGlvbigpKSk7XG4gICAgICAgICAgICBpZiAoc2VsZi5pc0RyYWdnaW5nID09PSB0cnVlKXtcbiAgICAgICAgICAgICAgICAvLyBzZWxmLm5vZGUucG9zaXRpb24gPSBzZWxmLm5vZGUuY29udmVydFRvdWNoVG9Ob2RlU3BhY2UoZXZlbnQuZ2V0TG9jYXRpb24oKSk7XG4gICAgICAgICAgICAgICAgbGV0IHRvdWNoUG9zID0gc2VsZi5ub2RlLnBhcmVudC5jb252ZXJ0VG91Y2hUb05vZGVTcGFjZShldmVudCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3RvdWNoIHBvcyA9ICcgKyBKU09OLnN0cmluZ2lmeSh0b3VjaFBvcykpO1xuICAgICAgICAgICAgICAgIHNlbGYubm9kZS5wb3NpdGlvbiA9IHRvdWNoUG9zO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBjb25zdCB0b3VjaEVuZCA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3RvdWNoIGVuZCA9JyArIEpTT04uc3RyaW5naWZ5KGV2ZW50LmdldExvY2F0aW9uKCkpKTtcblxuICAgICAgICAgICAgc2VsZi5pc0RyYWdnaW5nID0gZmFsc2U7XG4gICAgICAgICAgICBzZWxmLnBhcmVudFNjcmlwdC5wdXp6bGVDZWxsVG91Y2hFbmQoc2VsZik7XG5cblxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9TVEFSVCx0b3VjaFN0YXJ0LHRoaXMubm9kZSk7XG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9NT1ZFLHRvdWNoTW92ZSx0aGlzLm5vZGUpO1xuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELHRvdWNoRW5kLHRoaXMubm9kZSk7XG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9DQU5DRUwsdG91Y2hFbmQsdGhpcy5ub2RlKTtcbiAgICB9XG4gICAgLFxuICAgIGluaXQ6IGZ1bmN0aW9uIChzcGVjLCBwYXJlbnRTY3JpcHQsaW5kZXgpIHtcbiAgICAgICAgdGhpcy5pbmRleCA9IGluZGV4O1xuICAgICAgICB0aGlzLmxhYmVsLnN0cmluZyA9IGluZGV4ICsgJyc7XG4gICAgICAgIHRoaXMucGFyZW50U2NyaXB0ID0gcGFyZW50U2NyaXB0O1xuICAgICAgICBjb25zb2xlLmxvZygnc3BlYycgKyBKU09OLnN0cmluZ2lmeShzcGVjKSk7XG5cbiAgICAgICAgLy8g5qC55o2u5Y+C5pWw5Yib5bu65pa55ZCRXG5cblxuICAgICAgICBmb3IgKGxldCBpIGluIHNwZWMpe1xuICAgICAgICAgICAgdGhpcy5pbml0TGluZShpICxzcGVjW2ldKTtcblxuICAgICAgICB9XG5cblxuICAgIH0sXG4gICAgY2VsbFVwUG9zTGlzdDpmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgbGV0IGxpc3QgPSBbXG4gICAgICAgICAgICAgICAgY2MudjIoMCwxNTYpLFxuICAgICAgICAgICAgICAgIGNjLnYyKDAsLTE1NiksXG4gICAgICAgICAgICAgICAgY2MudjIoLTE1NiwwKSxcbiAgICAgICAgICAgICAgICBjYy52MigxNTYsMClcblxuICAgICAgICAgIF07XG4gICAgICAgcmV0dXJuIGxpc3RbaW5kZXhdO1xuICAgIH0gLFxuICAgIGFuZ2xlTWFwOiBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgbGV0IGxpc3QgPSBbMTgwLCAwLCA5MCwgLTkwXTtcbiAgICAgICAgcmV0dXJuIGxpc3RbaW5kZXhdO1xuICAgIH1cbiAgICAsXG4gICAgaW5pdExpbmU6IGZ1bmN0aW9uIChkaXJlY3Rpb24sIHZhbHVlKSB7XG4gICAgICAgIC8v5pa55ZCRIOi3n+WAvOS8oOi/h+adpVxuXG4gICAgICAgIGNvbnNvbGUubG9nKCdkaXJlY3Rpb24gPSAnICsgZGlyZWN0aW9uKTtcbiAgICAgICAgY29uc29sZS5sb2coJ3ZhbHVlID0gJyArIHZhbHVlKTtcbiAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gZGVmaW5lcy5QdXp6bGVMaW5lVHlwZS5ET1dOKXtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIC8vXG4gICAgICAgIGlmICh2YWx1ZSA9PT0gZGVmaW5lcy5QdXp6bGVMaW5lVHlwZS5VUCl7XG4gICAgICAgICAgICAvLyBsZXQgbm9kZSA9IGNjLk5vZGUoKTtcbiAgICAgICAgICAgIC8vIG5vZGUuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLmNlbGxVcDtcbiAgICAgICAgICAgIC8vIG5vZGUucGFyZW50ID0gdGhpcy5ub2RlO1xuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIGxldCBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5jZWxsVXApO1xuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLm5vZGU7XG4gICAgICAgICAgICAvLyBub2RlLnBvc2l0aW9uID0gdGhpcy5jZWxsVXBQb3NMaXN0KGRpcmVjdGlvbik7XG4gICAgICAgICAgICAvLyBub2RlLnJvdGF0aW9uID0gdGhpcy5hbmdsZU1hcChkaXJlY3Rpb24pO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKCd0aGlz44CCaW5kZXggJyArIHRoaXMuaW5kZXgpO1xuXG5cbiAgICB9LFxuICAgIHNldE9uTWFwOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoUFVaWkVMU1RBVEUuT25NYXApO1xuICAgIH0sXG4gICAgc2V0T25Ub3VjaE1hcDogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKFBVWlpFTFNUQVRFLk9uVG91Y2hNYXApO1xuICAgIH0sXG4gICAgc2V0U3RhdGU6IGZ1bmN0aW9uIChzdGF0ZSkge1xuICAgICAgICB0aGlzLnN0YXRlID0gc3RhdGU7XG4gICAgfSxcbiAgICBnZXRJc09uTWFwIDogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZSA9PT0gUFVaWkVMU1RBVEUuT25NYXApe1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG4gICAgZ2V0SXNPblRvdWNoTWFwOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlID09PSBQVVpaRUxTVEFURS5PblRvdWNoTWFwKXtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59KTtcbiIsIi8qKlxuICogQ3JlYXRlZCBieSBjaHVoYW95dWFuIG9uIDIwMTcvNi8yOC5cbiAqL1xuaW1wb3J0IGRlZmluZXMgZnJvbSAnLi9nYW1lX2RlZmluZXMnXG5jb25zdCBQdXp6bGVDb250cm9sbGVyID0gZnVuY3Rpb24gKCkge1xuICBsZXQgdGhhdCA9IHt9O1xuXG5cbiAgY29uc3QgZ2V0UmFuZG9tVmFsdWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGRlZmluZXMuUHV6emxlTGluZVR5cGVbZGVmaW5lcy5QdXp6bGVMaW5lVHlwZUxpc3RbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGRlZmluZXMuUHV6emxlTGluZVR5cGVMaXN0Lmxlbmd0aCkpXV07XG4gIH07XG5cbiAgdGhhdC5nZXRQdXp6bGVNYXAgPSBmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGxpc3QgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMCA7IGkgPCAyIDsgaSArKyl7XG4gICAgICBmb3IgKGxldCBqID0gMCA7IGogPCAzIDsgaiArKyl7XG4gICAgICAgIGxldCBtYXAgPSB7fTtcbiAgICAgICAgbGlzdC5wdXNoKG1hcCk7XG4gICAgICAgIG1hcFtkZWZpbmVzLlB1enpsZURpcmVjdGlvbk1hcC5SSUdIVF0gPSBnZXRSYW5kb21WYWx1ZSgpO1xuICAgICAgICBtYXBbZGVmaW5lcy5QdXp6bGVEaXJlY3Rpb25NYXAuRE9XTl0gPSBnZXRSYW5kb21WYWx1ZSgpO1xuICAgICAgICBpZiAobGlzdC5sZW5ndGggPiAxKXtcbiAgICAgICAgICBsZXQgYmVmb3JNYXAgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgaWYgKCBpID09PSAwICl7XG4gICAgICAgICAgICBiZWZvck1hcCA9IGxpc3RbbGlzdC5sZW5ndGggLSAyXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCBpID09PSAxKXtcbiAgICAgICAgICAgIGJlZm9yTWFwID0gbGlzdFtsaXN0Lmxlbmd0aCAtIDRdO1xuICAgICAgICAgIH1cbiAgICAgICAgICBtYXBbZGVmaW5lcy5QdXp6bGVEaXJlY3Rpb25NYXAuVVBdID0gMCAtIGJlZm9yTWFwW2RlZmluZXMuUHV6emxlRGlyZWN0aW9uTWFwLkRPV05dO1xuICAgICAgICAgIG1hcFtkZWZpbmVzLlB1enpsZURpcmVjdGlvbk1hcC5MRUZUXSA9IDAgLSBiZWZvck1hcFtkZWZpbmVzLlB1enpsZURpcmVjdGlvbk1hcC5SSUdIVF07XG4gICAgICAgIH1cblxuXG4gICAgICAgIGlmIChpID09PSAwKXtcbiAgICAgICAgICBtYXBbZGVmaW5lcy5QdXp6bGVEaXJlY3Rpb25NYXAuVVBdID0gZGVmaW5lcy5QdXp6bGVMaW5lVHlwZS5NSURETEU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGkgPT09IDEpe1xuICAgICAgICAgIG1hcFtkZWZpbmVzLlB1enpsZURpcmVjdGlvbk1hcC5ET1dOXSA9IGRlZmluZXMuUHV6emxlTGluZVR5cGUuTUlERExFO1xuICAgICAgICB9XG4gICAgICAgIGlmIChqID09PSAwKXtcbiAgICAgICAgICBtYXBbZGVmaW5lcy5QdXp6bGVEaXJlY3Rpb25NYXAuTEVGVF0gPSBkZWZpbmVzLlB1enpsZUxpbmVUeXBlLk1JRERMRTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaiA9PT0gMil7XG4gICAgICAgICAgbWFwW2RlZmluZXMuUHV6emxlRGlyZWN0aW9uTWFwLlJJR0hUXSA9IGRlZmluZXMuUHV6emxlTGluZVR5cGUuTUlERExFO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc29sZS5sb2coJ21hcCA9ICcrIEpTT04uc3RyaW5naWZ5KG1hcCkpO1xuICAgICAgICBjb25zb2xlLmxvZygnaW5kZXggPScgKyBpICsgJywnICsgaik7XG5cblxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBsaXN0O1xuICB9O1xuXG4gIHJldHVybiB0aGF0O1xufTtcbmV4cG9ydCBkZWZhdWx0IFB1enpsZUNvbnRyb2xsZXI7XG4iXSwic291cmNlUm9vdCI6IiJ9