cc.Class({
    extends: cc.Component,

    properties: {

        playerNode : {
            default: null,
            type: cc.Node
        },
        camera: {
            default: null,
            type: cc.Node
        }
    },

    // use this for initialization
    onLoad: function () {
        this.getComponent(cc.TiledMap);
    },
    update: function (dt) {
        this.playerNode.position = {
            x: this.playerNode.position.x + 1,
            y: this.playerNode.position.y
        };
        this.camera.position = {
            x: this.playerNode.position.x,
            y: this.playerNode.position.y - 500
        };
    }


});
