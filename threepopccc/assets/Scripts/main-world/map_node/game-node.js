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
        },
        grounds: {
            default: null,
            type: cc.TiledLayer
        },
        walls: {
            default: null,
            type: cc.TiledLayer
        },
        foods: {
            default: null,
            type: cc.TiledLayer
        }
    },

    // use this for initialization
    onLoad: function () {
        // this.getComponent(cc.TiledMap);
        global.eventListener.on("button_click", (direction) => {
            let newTiled = cc.p(this.playerTiled.x, this.playerTiled.y);
            switch (direction){
                case "up":
                    newTiled.y -= 1;
                    break;
                case "down":
                    newTiled.y += 1;

                    break;
                case "left":
                    newTiled.x -= 1;
                    break;
                case "right":
                    newTiled.x += 1;
                    break;
                default:
                    break
            }
            this.moveToTiledMapPos(newTiled);
        });
    },
    moveToTiledMapPos: function (newTiled) {

        if (newTiled.x < 0 || newTiled.x > this.tiledMap.getTileSize().width){
            return;
        }
        if (newTiled.y < 0 || newTiled.y > this.tiledMap.getTileSize().height){
            return;
        }



        if (this.checkWall(newTiled)){
            return
        }
        if (this.catchFood(newTiled)){
        }
        let pos = this.grounds.getPositionAt(newTiled.x, newTiled.y);
        let worldPos = this.grounds.node.convertToWorldSpace(pos);
        let gameNodePos = this.node.convertToNodeSpace(worldPos);
        this.playerNode.position = {
            x: gameNodePos.x + 32,
            y: gameNodePos.y + 32
        };
        this.playerTiled = newTiled;
    },

    catchFood: function (newTiled) {
        if (this.foods.getTileGIDAt(newTiled.x, newTiled.y)){
            this.foods.removeTileAt(newTiled.x, newTiled.y);
            return true;
        }
    },
    checkWall: function (newTiled) {
      if (this.walls.getTileGIDAt(newTiled.x, newTiled.y)){
          return true;
      }
    },

    start: function () {
        cc.log("start");

        this.tiledMap = this.mapNode.getComponent(cc.TiledMap);
        let startPos = this.tiledMap.getObjectGroup("players").getObject("startPos").getProperties();
        let startPoint = this.getTiledPoint(cc.p(startPos.x,startPos.y));
        this.moveToTiledMapPos(startPoint);


    },
    
    getTiledPoint: function (position) {
        let tiledSize = this.mapNode.getComponent(cc.TiledMap).getTileSize();
        cc.log("tiled size = " + JSON.stringify(tiledSize));
        let x = Math.floor(position.x / tiledSize.width);
        let y = Math.floor(position.y / tiledSize.height);
        let tilePos = cc.p(x,y);
        cc.log("tiled pos = " + JSON.stringify(tilePos));
        return tilePos
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
