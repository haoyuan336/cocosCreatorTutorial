cc.Class({
    extends: cc.Component,

    properties: {

        ControllerSprite: {
            default: null,
            type: cc.Node
        }
    },

    onLoad: function () {
        let posList = [{x: 100, y: 50},{x: 100,y: 200},{x: 300,y: 400},{x: 500, y: 400},{x: 500, y: 200}];
        this.linesFormulaList = [];
        for(let i = 0 ; i<  posList.length - 1 ; i++){
            this.drawLine(posList[i],posList[i + 1]);
            this.linesFormulaList.push(this.processLinesFormula(posList[i],posList[i + 1]));
        }
        for (let i in this.linesFormulaList){
            cc.log("line  = " + JSON.stringify(this.linesFormulaList[i]));
        }
    },

    processLinesFormula: function (startPos, endPos) {
        //计算直线的曲线公式
        // y = kx + b
        // y1 = kx1 + b
        // y2 = kx2 + b
        // y1 - y2 = kx1 - kx2
        // y1 - y2 = k(x1 - x2)

        //斜率
        // k = (y1 - y2) / (x1 - x2)

        // y1 = kx1 + b
        // b = y1 - kx1
        // b = y1 - (y1 - y2) / (x1 - x2)x1
        // b = ( y1(x1 - x2) - x1(y1 - y2) ) / (x1 - x2)
        // b = ( x1y1 - x2y1 - x1y1 + x1y2) / (x1 - x2)
        //偏移值
        // b = ( x1y2 - x2y1) / (x1 - x2)

        let k = 0;
        let b = 0;

        // let k = (()=>{
        //       if (startPos.x === endPos.x){
        //           return 0
        //       }else if (startPos.y === endPos.y){
        //           return 1
        //       } else {
        //           return (startPos.y - endPos.y) / (startPos.x - endPos.x);
        //       }
        //   })();
        //
        //
        // let b = (()=>{
        //       if (startPos.x === endPos.x){
        //           return 0
        //       }else {
        //           return (startPos.x * endPos.y - endPos.x * startPos.y) / (startPos.x - endPos.x);
        //       }
        //   })();

        if (startPos.x === endPos.x){
            k = Number.MAX_VALUE;
        }else if (startPos.y === endPos.y){
            k = Number.MIN_VALUE;
        }else {
            k = (startPos.y - endPos.y) / (startPos.x - endPos.x);
        }
        b = (startPos.x * endPos.y - endPos.x * startPos.y) / (startPos.x - endPos.x);

        return {
            k: k,  //斜率
            b: b,   //偏移量
            minX: Math.min(startPos.x,endPos.x),  //区间
            maxX: Math.max(startPos.x,endPos.x),
            minY: Math.min(startPos.y,endPos.y),
            maxY: Math.max(startPos.y,endPos.y)
        }
    },

    drawLine: function (startPos,endPos) {
        this.Graphics = this.node.getComponent(cc.Graphics);
        this.Graphics.strokeColor=cc.Color.RED;
        this.Graphics.lineWidth=10;
        this.Graphics.moveTo(startPos.x,startPos.y);
        this.Graphics.lineTo(endPos.x, endPos.y);
        this.Graphics.stroke();
        // this.Graphics.fill();

    },
    getCurrentFormul: function (position) {
        //将目标设置到正确的位置
        //首先根据区间得到正确的直线的曲线公式，也就是k b
        for (let i in this.linesFormulaList){
            let formul = this.linesFormulaList[i];
            // //范围
            // cc.log("formul = " + JSON.stringify(formul));
            // cc.log("position = " + JSON.stringify(position));
            if (formul.minX === formul.maxX && Math.abs(position.x - formul.minX) < 50){
                if (position.y >= formul.minY && position.y <= formul.maxY){
                    return formul;  //垂直x轴的情况
                }
            }else if (formul.minY === formul.maxY && Math.abs(position.y - formul.minY) < 50){
                if (position.x >= formul.minX && position.x <= formul.maxX){
                    return formul;
                }
            }else if (formul.minX !== formul.maxX && formul.minY !== formul.maxY){
                console.log('都不相等');
                if (position.x >= formul.minX && position.x <= formul.maxX && position.y >= formul.minY && position.y <= formul.maxY){
                    return formul;  //得到了曲线公式 并返回
                }
            }
        }
        return null;
    }
    ,

    processCurrentPosition: function (formul,position) {
        //计算正确的位置
        //根据之前的曲线公式 y = kx + b
        // x = (y - b) / k
        let y = formul.k * position.x + formul.b;
        let x = (position.y - formul.b) / formul.k;
        return {x: x, y: y}; //计算并返回
    },
    setTestCurrentPosition: function (position) {
        let formul = this.getCurrentFormul(position);
        //然后根据position 计算出正确的 x y的值
        console.log('current formal = ' + JSON.stringify(formul));

        if (formul !== null){
            // this.ControllerSprite.position = currentPos;
            let currentPos = this.processCurrentPosition(formul,position);
            console.log('current position = ' + JSON.stringify(currentPos));
            if (formul.k !== Number.MAX_VALUE && formul.k !== Number.MIN_VALUE){
                this.ControllerSprite.position = {
                    x: position.x,
                    y: currentPos.y
                }
            }else if (formul.k === Number.MIN_VALUE){
                this.ControllerSprite.position = {
                    x: position.x,
                    y: formul.minY
                }
            }else if (formul.k === Number.MAX_VALUE){
                this.ControllerSprite.position = {
                    x: formul.minX,
                    y: position.y
                }
            }

        }

    },
    setTouchPosition: function (position) {
        cc.log("touch position =" + JSON.stringify(position));
        // this.ControllerSprite.position = position;
        this.setTestCurrentPosition(position);
    }

});
