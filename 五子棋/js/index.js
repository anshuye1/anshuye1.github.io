$(function () {
    var canvas = $('#canvas').get(0);
    var ctx = $('#canvas').get(0).getContext('2d');
    var ROW = 15;
    var width = canvas.width;
    var flag = true;
    var blocks = {};
    var off = width / ROW;//间距
    var ai=false;
    var blank ={};
    var canvas1 = $('#canvas1').get(0);
    var ctx1 = $('#canvas1').get(0).getContext('2d');
    for(var i=0 ;i<15;i++){
        for(var j=0;j<15;j++){
            blank[i+'_'+j]=true;
        }
    }
    console.log(blank);
    //0.5用来消除间距
    //转｛position:x,position:y｝
    function o2k(position) {
        return position.x + '_' + position.y;
    }
    //转｛x:x,y:y｝
    function k2o(key) {
        var arr = key.split('_');
        return {x: parseInt(arr[0]) , y: parseInt(arr[1])};
    }
    //画线
    function draw() {
        ///////////////////////////////////画线//////////////////////////////////////////
        function makeLine() {
            //横线
            for (var i = 0; i < ROW; i++) {
                ctx.beginPath();
                ctx.moveTo(off / 2 + 0.5, off / 2 + 0.5 + i * off);
                ctx.lineTo((ROW - 0.5) * off + 0.5, off / 2 + 0.5 + i * off);
                ctx.stroke();
                ctx.closePath();
            }
            //竖线
            for (var i = 0; i < ROW; i++) {
                ctx.beginPath();
                ctx.moveTo(off / 2 + 0.5 + i * off, off / 2 + 0.5);
                ctx.lineTo(off / 2 + 0.5 + i * off, (ROW - 0.5) * off + 0.5);
                ctx.stroke();
                ctx.closePath();
            }
        }

        makeLine();
        ////////////////////////////////////画圆//////////////////////////////////////////
        function makeCircle(x, y, r) {
            ctx.beginPath();
            ctx.arc((x + 0.5) * off + 0.5, (y + 0.5) * off + 0.5, r, 0, 2 * Math.PI);
            ctx.fill();
            ctx.closePath();
        }

        makeCircle(3, 3, 2);
        makeCircle(3, 11, 2);
        makeCircle(7, 7, 3);
        makeCircle(11, 3, 2);
        makeCircle(11, 11, 2);
    }draw();
    //落子
    function drawCircle(position, color) {
        ctx.save();
        ctx.beginPath();
        ctx.translate((position.x + 0.5) * off + 0.5, (position.y + 0.5) * off + 0.5);
        ctx.arc(0, 0, 15, 0, 2 * Math.PI);
        var radgrad = ctx.createRadialGradient(-2, -2, 2, 0, 0, 15);
        radgrad.addColorStop(0, '#ccc');
        radgrad.addColorStop(1, '#000');
        var radgrad2 = ctx.createRadialGradient(0, 0, 3, 0, 0, 15);
        radgrad2.addColorStop(0, '#fff');
        radgrad2.addColorStop(1, '#ccc');
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.shadowBlur = 2;
        ctx.shadowColor = "rgba(0, 0, 0, 0.9)";
        if (color === "black") {
            ctx.fillStyle = radgrad
        } else {
            ctx.fillStyle = radgrad2
        }
        ctx.fill();
        ctx.closePath();
        ctx.restore();
        //放表
        blocks[o2k(position)] = color;
        delete blank[o2k(position)];
    }
    //选择
    function check(pos, color) {
        var table = {};
        var num = 1;
        var num1 = 1;
        var num2 = 1;
        var num3 = 1;
        for (var i in blocks) {
            if (blocks[i] === color) {
                table[i] = true;
            }
        }
        var tx = pos.x;
        var ty = pos.y;
        /////////////////////////////左右
        while (table[tx + 1 + '_' + ty]) {
            num++;
            tx++;
        }
        tx = pos.x;
        ty = pos.y;
        while (table[tx - 1 + '_' + ty]) {
            num++;
            tx--;
        }

        /////////////////////////////上下
        tx = pos.x;
        ty = pos.y;
        while (table[tx + '_' + (ty + 1)]) {
            num1++;
            ty++;
        }
        tx = pos.x;
        ty = pos.y;
        while (table[tx + '_' + (ty - 1)]) {
            num1++;
            ty--;
        }
        /////////////////////////////右上\下
        tx = pos.x;
        ty = pos.y;
        while (table[(tx - 1) + '_' + (ty + 1)]) {
            num2++;
            tx--;
            ty++;
        }
        tx = pos.x;
        ty = pos.y;
        while (table[(tx + 1) + '_' + (ty + 1)]) {
            num2++;
            tx++;
            ty--;
        }

        /////////////////////////////左右
        tx = pos.x;
        ty = pos.y;
        while (table[(tx + 1) + '_' + (ty + 1)]) {
            num3++;
            tx++;
            ty++;
        }
        tx = pos.x;
        ty = pos.y;
        while (table[(tx - 1) + '_' + (ty - 1)]) {
            num3++;
            tx--;
            ty--;
        }
        return Math.max(num,num1,num2,num3)
    }
    //棋谱文本
    function drawText(pos, text,color) {
        ctx.save();
        ctx.font = "20px 微软雅黑";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        if(color =='black'){
            ctx.fillStyle= '#fff';
        }else if(color =='white'){
            ctx.fillStyle= '#000';
        }
        ctx.fillText (text,(pos.x+0.5)*off,(pos.y+0.5)*off);
        ctx.restore();
    }
    //棋谱
    function review() {
        var i=1;
        for (var j in blocks) {
            drawText(k2o(j),i,blocks[j]);
            i++;
        }
    }
    //输赢系统
    function handleClick(){
        $(canvas).on('click', function (e) {
            var position = {
                x: Math.round((e.offsetX - off / 2) / off),
                y: Math.round((e.offsetY - off / 2) / off)
            };
            if (blocks[o2k(position)]) {
                return
            }
            if(ai){
                drawCircle(position,'black');
                if (check(position, 'black')>=5) {
                    $(canvas).off("click");
                    alert('黑旗赢');
                    if (confirm("是否产生棋谱")) {
                        review()
                    } else {
                        return
                    }
                }
                drawCircle(AI(),'white');
                if (check(position, 'white')>=5) {
                    $(canvas).off("click");
                    alert('白旗赢');
                    if (confirm("是否产生棋谱")) {
                        review()
                    } else {
                        return
                    }
                }
                return;
            }
            // drawCircle(position);
            if (flag) {
                $('.qizi').addClass('bq1').removeClass('hq1');
                clearInterval(setInterval(js,1000));
                setInterval(js,1000);
                s=60;
                drawCircle(position, 'black');
                flag = false;
                } else {
                $('.qizi').addClass('hq1').removeClass('bq1');
                clearInterval(setInterval(js,1000));
                setInterval(js,1000);
                s=60;
                    drawCircle(position, 'white');
                    flag = true;
                }
            if (check(position, 'black')>=5) {
                $(canvas).off("click");
                alert('黑旗赢');
                if (confirm("是否产生棋谱")) {
                    review()
                } else {
                    return
                }
            }
            if (check(position, 'white')>=5) {
                $(canvas).off("click");
                alert('白旗赢');
                if (confirm("是否产生棋谱")) {
                    review()
                } else {
                    return
                }
            }
        });

    }handleClick();
    //重新开始
    function restart(){
        ctx.clearRect(0,0,width,width);
        blocks={};
        draw();
        flag=true;
        $(canvas).off('click').on('click', handleClick);
    }
    //AI
    function AI(){
        var max1=-Infinity;
        var max2=-Infinity;
        var pos1;
        var pos2;
        for(var i in blank){
            var score1=check(k2o(i),'black');
            var score2=check(k2o(i),'white');
            if(score1>max1){
                max1=score1;
                pos1=k2o(i);
            }
            if(score2>max2){
                max2=score2;
                pos2=k2o(i);
            }
        }
        if(max2>=max1){
            return pos2;
        }else{
            return pos1;
        }
    }
    AI();
    console.log(AI());
    //启动AI
    $('.ai').on('mousedown',false);
    $('.ai').on('click',function(){
        restart();
        $(this).toggleClass('active');
        ai=!ai;
    });
    $('.ai1').on('click',function(){
        restart();
        $('.ai').toggleClass('active1');
        ai=!ai;
    })
    //计时
    var s=60;
    function js() {
        s--;
        if(s===0){
            clearInterval(setInterval);
            s=60;
        }
        if(s>=10){
            $('.js').text("00:"+s);
        }else{
            $('.js').text("00:0"+s);
        }
        clock()
    }

    //秒表

    function clock() {
        //表盘
        ctx1.clearRect(0,0,300,300);
        function render() {
            ctx1.save();
            ctx1.translate(150, 150);
            for (var i = 0; i < 60; i++) {
                var r = Math.floor(Math.random() * 255);
                var g = Math.floor(Math.random() * 255);
                var b = Math.floor(Math.random() * 255);
                var color = 'rgb(' + r + ',' + g + ',' + b + ')';
                ctx1.strokeStyle = color;
                ctx1.lineWidth = 1.5;
                ctx1.beginPath();
                ctx1.moveTo(0, -150);
                if (i % 5 == 0) {
                    ctx1.lineTo(0, -135);
                } else {
                    ctx1.lineTo(0, -145);
                }
                ctx1.stroke();
                ctx1.closePath();
                ctx1.rotate(Math.PI / 30);
            }
            ctx1.restore();
        }
        render();

    //秒针
    function seconds() {
        console.log(s);
        ctx1.save();
        ctx1.translate(150,150);
        ctx1.rotate(Math.PI * (60-s)/30);
        ctx1.beginPath();
        ctx1.moveTo(0,10);
        ctx1.lineTo(0,20);
        ctx1.moveTo(0,-10);
        ctx1.lineTo(0,-100);
        ctx1.strokeStyle = "rgba(255,0,0,0.8)";
        ctx1.stroke();
        ctx1.closePath();
        ctx1.beginPath();
        ctx1.moveTo(10,0);
        ctx1.arc(0,0,10,0,2*Math.PI);
        ctx1.fillStyle = "rgba(255,0,0,0.6)";
        ctx1.fill();
        ctx.closePath();
        ctx1.restore();
    }seconds();
    ctx1.restore()
    }clock()
})

