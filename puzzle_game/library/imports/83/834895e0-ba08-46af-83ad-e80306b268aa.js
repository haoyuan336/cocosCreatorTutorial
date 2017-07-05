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