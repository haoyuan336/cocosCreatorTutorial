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
    },
    moveToTiledMapPoint: function (newTiled) {
        cc.log("new tiled = " + JSON.stringify(newTiled));
        let mapSize = this.tiledMap.getMapSize();
        cc.log("map size = " + JSON.stringify(mapSize));
        if (newTiled.x < 0 || newTiled.x > mapSize.width ){
            cc.log("超出界限");
            return;
        }
        if (newTiled.y < 0 || newTiled.y > mapSize.height ){
            cc.log("超出界限");
            return;
        }


        if (this.checkWall(newTiled)){
            cc.log("是墙");
            return
        }
        if (this.catchFood(newTiled)){
        }
        this.moveToCurrentPos(newTiled);
        this.playerTiled = newTiled;
        if (cc.pointEqualToPoint(newTiled,this.endPoint)){
            cc.log("进入了出口位置了");
            global.eventListener.fire("enter_next_map");
        }
        if (cc.pointEqualToPoint(newTiled, this.returnPoint)){
            cc.log("返回上一个地图");
            global.eventListener.fire("enter_befor_map");
        }
    },

    moveToCurrentPos: function (newTiled) {
        let mapTiledNode = this.mapNode.getChildByName("mapTiledNode");
        let pos = this.grounds.getPositionAt(newTiled.x, newTiled.y);
        cc.log("pos = " + JSON.stringify(pos));
        let convertPos = mapTiledNode.convertToWorldSpace(pos);
        cc.log("转换"  + JSON.stringify(convertPos));
        let endPos = this.node.convertToNodeSpace(convertPos);
        this.playerNode.position = {
            x: endPos.x + 32,
            y: endPos.y + 32
        };
    },
    catchFood: function (newTiled) {
        if (this.foods.getTileGIDAt(newTiled.x, newTiled.y)){
            console.log("食物");
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
        // let self = this;
        // this.getComponent(cc.TiledMap);
        global.eventListener.on("button_click", (direction) => {
            let newTiled = cc.p(this.playerTiled.x, this.playerTiled.y);
            console.log("button click ");
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
            this.moveToTiledMapPoint(newTiled);
        });

        let nowLevel = global.gameData.levelCount;
        let str ="tiledmap/" + "map_" + (nowLevel + 1);
        cc.loader.loadRes(str, (err, tiledMap) =>{
            if (err){
                cc.log("err "  + err);
                return ;
            }
            let mapNode = new cc.Node("mapTiledNode");
            mapNode.parent = this.mapNode;
            this.tiledMap = mapNode.addComponent(cc.TiledMap);
            this.tiledMap.tmxAsset = tiledMap;
            let players = this.tiledMap.getObjectGroup("players");
            let startPos = players.getObject("startPos").getProperties();
            let startPoint = this.getTiledPoint(startPos);
            let endPos = players.getObject("endPos").getProperties();
            this.endPoint = this.getTiledPoint(endPos);
            let returnPos = players.getObject("returnPos").getProperties();
            this.returnPoint = this.getTiledPoint(returnPos);
            this.grounds = this.tiledMap.getLayer("ground");
            this.walls = this.tiledMap.getLayer("wall");
            this.foods = this.tiledMap.getLayer("food");
            this.playerTiled = startPoint;
            this.moveToTiledMapPoint(startPoint);
        });

    },
    
    getTiledPoint: function (position) {
        position = cc.p(position.x, position.y);
        let tiledSize = this.tiledMap.getTileSize();
        cc.log("tiled size = " + JSON.stringify(tiledSize));
        let x = Math.floor(position.x / tiledSize.width);
        let y = Math.floor(position.y / tiledSize.height);
        let tilePos = cc.p(x,y);
        cc.log("tiled pos = " + JSON.stringify(tilePos));
        return tilePos;
    },
    convertTheCurrentPos: function (pos) {
        let currentPos = {
            x: pos.x,
            y: this.mapNode.height - pos.y
        };
        return currentPos;
    },
    update: function (dt) {
        this.camera.position = {
            x: this.playerNode.position.x,
            y: this.playerNode.position.y - 500
        };

    },
    removeAllEventListener: function () {
        global.eventListener.removeListenerType("button_click");
    },
    onDestroy: function () {
        // this.tiledMap.releaseMap();

        cc.log("on destroy");
        global.eventListener.removeListenerType("button_click");

    }

});
