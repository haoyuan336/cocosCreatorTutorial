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
        },
        mapNode: {
            default: null,
            type: cc.Node
        }
    },

    // use this for initialization
    onLoad: function () {
        // this.getComponent(cc.TiledMap);
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
        });
    },
    start: function () {
        cc.log("start");
        this.tiledMap = this.mapNode.getComponent(cc.TiledMap);
        let startPoint = this.tiledMap.getObjectGroup("players").getObject("startPos").getProperties();
        let endPoint = this.tiledMap.getObjectGroup("players").getObject("endPos").getProperties();
        this.startPos = cc.p(startPoint.x, startPoint.y);
        this.endPos = cc.p(endPoint.x,endPoint.y);
        cc.log("startPos = " + JSON.stringify(this.startPos));
        cc.log("end Pos = " + JSON.stringify(this.endPos));
        this.playerNode.position = {
            x: this.startPos.x,
            y: this.playerNode.position.y
        };
        // this.convertTheCurrentPos(this.startPos);

    },
    convertTheCurrentPos: function (pos) {
        let currentPos = {
            x: pos.x,
            y: this.mapNode.height - pos.y
        }
        return currentPos;
    },
    update: function (dt) {
        this.camera.position = {
            x: this.playerNode.position.x,
            y: this.playerNode.position.y - 500
        };

    }


});
