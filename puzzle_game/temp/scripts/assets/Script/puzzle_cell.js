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