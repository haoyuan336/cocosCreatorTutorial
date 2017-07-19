import global from './../../global'
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
        global.eventListener.on("button_click", (direction) => {
            cc.log(" button click" + direction);
            let pos = this.playerNode.position;
            switch (direction){
                case "up":
                    pos.y += 100;
                    break;
                case "down":

                    pos.y -= 100;
                    break;
                case "left":
                    pos.x -= 100;
                    break;
                case "right":
                    pos.x += 100;
                    break;
                default:
                    break
            }
            this.playerNode.position = pos;
        })
    },
    update: function (dt) {
        this.camera.position = {
            x: this.playerNode.position.x,
            y: this.playerNode.position.y - 500
        };

    }


});
