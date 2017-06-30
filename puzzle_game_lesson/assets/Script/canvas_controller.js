cc.Class({
    extends: cc.Component,

    properties: {
        gameOverLayer: {
            type: cc.Prefab,
            default: null
        },
        gameLayer: {
            type: cc.Prefab,
            default: null
        }
    },

    
    onLoad: function () {

    },
    startButton: function () {
        cc.log('start button');
        let node = cc.instantiate(this.gameLayer);
        node.parent = this.node;
    },
    gameOver: function () {
        let node = cc.instantiate(this.gameOverLayer);
        node.parent = this.node;
    }


});
