import global from './../../global'
import defines from './../../defines'
import LevelData from './../../data/config/level-data'
import EventListener from './../../utility/event-listener'
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
        gameNode: {
            default: null,
            type: cc.Node
        }
    },

    // use this for initialization
    onLoad: function () {
        this.monsterList = [];
        // let startData = global.gameData.getMonsterLevelAndStartPoint();
        // cc.log("startData = " + JSON.stringify(startData));
        //
        // let levelCount = startData.nowLevelCount;
        // let levelData = LevelData[levelCount];
        // this.levelData = levelData;
        // cc.log("level data = " + JSON.stringify(levelData));
        global.mainworldEventListener = EventListener({});

        let levelCount = global.gameData.getLevelCount();
        cc.log("level count =  " + levelCount);
        this.levelData = LevelData[levelCount];
        this.startPoint = global.gameData.getStartPointData();
        cc.log("start point =" + JSON.stringify(this.startPoint));


        cc.loader.loadRes(this.levelData.map, (err, tiledMap)=>{
            if (err){
                cc.log("err = " + err);
                return;
            }
            let mapNode = new cc.Node("mapTiledNode");
            mapNode.parent = this.mapNode;
            this.tiledMap = mapNode.addComponent(cc.TiledMap);
            this.tiledMap.tmxAsset = tiledMap;
            let players = this.tiledMap.getObjectGroup("players");


            let endPos = undefined;

            if (players.getObject("endPos")){
                endPos = players.getObject("endPos").getProperties();

            }
            this.endPoint = this.getTiledPoint(endPos);


            let returnPos = undefined;
            if (players.getObject("returnPos")){
              returnPos = players.getObject("returnPos").getProperties();
            }
            this.returnPoint = this.getTiledPoint(returnPos);


            this.grounds = this.tiledMap.getLayer("ground");
            this.walls = this.tiledMap.getLayer("wall");


            // cc.log("start point = " + JSON.stringify(this.startPoint));
            // cc.log("end point = " + JSON.stringify(this.returnPoint));

            if (cc.pointEqualToPoint(this.startPoint, this.endPoint)){
              this.startPoint = this.getTiledPoint(players.getObject("returnStartPos").getProperties());
            }
            if (cc.pointEqualToPoint(this.startPoint, this.returnPoint)){
              // this.startPoint = this.getTiledPoint();
              this.startPoint = this.getTiledPoint(players.getObject("startPos").getProperties());
            }
          let list = this.tiledMap.getObjectGroup("monsters").getObjects();


          let winOrLose = global.gameData.getWinOrLoseData();
          if (winOrLose === 'lose'){
            this.startPoint = this.getTiledPoint(players.getObject("startPos").getProperties());
          }


           if ( this.startPoint !== undefined && this.startPoint !== null ){
             this.moveToTiledMapPoint(this.startPoint);
           }else {
             let startPos = players.getObject("startPos").getProperties();
             let startPoint = this.getTiledPoint(startPos);

             this.moveToTiledMapPoint(startPoint);
           }

          this.createMonstersList(list);


        });
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


        this.moveToCurrentPos(newTiled);
        this.playerTiled = newTiled;

        global.gameData.setStartPointData(newTiled);


        if ( this.endPoint !== undefined && cc.pointEqualToPoint(newTiled,this.endPoint)){
            cc.log("进入了出口位置了");
            global.eventListener.fire("enter_next_map");
        }
        if (this.returnPoint !== undefined && cc.pointEqualToPoint(newTiled, this.returnPoint)){
            cc.log("返回上一个地图");
            global.eventListener.fire("enter_befor_map");
        }

        let monster = this.checkMonsterPoint(newTiled);
        if (monster === null){
            cc.log("没找到怪兽");
        }else {
            global.eventListener.fire("enter_monster_world",{
                point: monster.point,
                name: monster.name
            });
        }
        // if (this.checkMonsterPoint(newTiled)){
        //     cc.log("打怪");
        //     global.eventListener.fire("enter_monster_world",)
        // }
    },

    checkMonsterPoint: function (point) {
        for (let i = 0 ; i < this.monsterList.length ; i ++){
            let node = this.monsterList[i];
            if (cc.pointEqualToPoint(point, node.point)){
                return node;
            }
        }
        return null;
    },
    moveToCurrentPos: function (newTiled) {
        let convertPos = this.getMapWorldPosition(newTiled);
        cc.log("转换"  + JSON.stringify(convertPos));
        let endPos = this.gameNode.convertToNodeSpace(convertPos);
        this.playerNode.position = {
            x: endPos.x + 32,
            y: endPos.y + 32
        };
    },
    getMapWorldPosition: function (point) {
        let mapTiledNode = this.mapNode.getChildByName("mapTiledNode");
        let pos = this.grounds.getPositionAt(point.x, point.y);
        return mapTiledNode.convertToWorldSpace(pos);
    },

    checkWall: function (newTiled) {
      if (this.walls.getTileGIDAt(newTiled.x, newTiled.y)){
          return true;
      }
    },

    // init: function (object) {
    //
    // },
    createMonstersList: function (monsterList) {
        cc.log("monsterList = " + monsterList.length);

        //初始化几个怪兽
        for (let i = 0 ; i < monsterList.length ; i ++){
            ///首先检查一下。这个位置上有没有怪物
            let point = this.getTiledPoint(monsterList[i].getProperties());
            this.createMonster(point);
        }

    },
    createMonster: function (point) {

        // let data = global.gameDataController.getRandomMonsterData(global.gameData.levelCount, LevelData);

        let winOrLose = global.gameData.getWinOrLoseData();

        if (cc.pointEqualToPoint(point, this.playerTiled) && winOrLose === 'win'){
          cc.log("游戏胜利,删掉这个怪物");
            global.gameData.setMonsterDataInPoint(point, null);
            return;
        }

        let data = undefined;
        if (global.gameData.getMonsterDataInPoint(point)){
            data = global.gameData.getMonsterDataInPoint(point);
            cc.log("找到了怪物类型");
        }else {
            data = global.gameDataController.getRandomObjInList(this.levelData.monsterList);
            cc.log("美债到怪物类型");

            if (global.gameData.setMonsterDataInPoint(point, data) === false){
              return
            }

            // global.gameData.setMonsterDataInPoint(point, data);
        }

        cc.log("monster data = " + data);

        cc.loader.loadRes(defines.monsterSpriteFrameConfig[data],cc.SpriteFrame,(err, spriteFrame)=>{
            if (err){
                return;
            }
            let node = new cc.Node(data);
            node.addComponent(cc.Sprite).spriteFrame = spriteFrame;
            node.parent = this.mapNode;
            let pos = this.getMapWorldPosition(point);
            node.position = cc.pAdd(this.gameNode.convertToNodeSpace(pos),cc.p(32,32));
            node.point = point;
            this.monsterList.push(node);
        });


        // cc.loader.loadRes()
    },
    start: function () {
        cc.log("start");
        // let self = this;
        // this.getComponent(cc.TiledMap);
        global.mainworldEventListener.on("button_click", (direction) => {
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
    },
    
    getTiledPoint: function (position) {
        if (position === undefined){
          return undefined;
        }
        position = cc.p(position.x, position.y);
        let tiledSize = this.tiledMap.getTileSize();
        cc.log("tiled size = " + JSON.stringify(tiledSize));
        let x = Math.floor(position.x / tiledSize.width);
        let y = Math.floor(position.y / tiledSize.height);
        let tilePos = cc.p(x,y);
        cc.log("tiled pos = " + JSON.stringify(tilePos));
        return tilePos;
    },
    update: function (dt) {
        this.camera.position = {
            x: this.playerNode.position.x,
            y: this.playerNode.position.y - 500
        };
    },
    onDestroy: function () {
        cc.log("on destroy");
        global.mainworldEventListener.removeListenerType("button_click",LevelData);

    }

});
