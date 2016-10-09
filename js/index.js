$(function(){
    var light=$('.light');
    var speedX=3;
    var speedY=3;
    var flag=true;
    function lightMove(){
        if(light.offset().top>($(window).height()-$('.light').width()-10)||light.offset().top<0){
            speedY*=-1;
        }else{
            speedY*=1;
        }
        if(light.offset().left>($(window).width()-$('.light').width()-10)||light.offset().left<0){
            speedX*=-1;
        }else{
            speedX*=1;
        }
        light.css({
            'left':"+="+speedX,
            'top':"+="+speedY
        });
    }
    var t=setInterval(lightMove,20);
    if(flag){
        setTimeout(function(){
            clearInterval(t);
            light.addClass('active');
            setTimeout(function(){
                light.removeClass('active');
                light.css({
                    'width':'100%',
                    'height':'100%',
                    'border-radius':'0',
                    'box-sizing':'border-box',
                    'left':0,
                    'top':0,
                    'box-shadow':'0 0 0 0'
                });
            },3000)
        },9000);
        setTimeout(function(){
            $('.nr-box').addClass('active');
        },14800);
    }
    $('.nr-box').on('click',function(){
        flag=false;
        clearInterval(t);
        $('.nr-box').addClass('active');
    });
    //////////////////////箭头向下/////////////////
    var speedYuan=0;
    function moveYuan() {
        speedYuan+=2;
        if(speedYuan>$('.yuan').height()){
            $('.yuan-inner').css('top',-60);
            speedYuan=0;
        }else{
            $('.yuan-inner').css('top',speedYuan-60);
        }
    }
    var yuanT=setInterval(moveYuan,100);
    $('.yuan').on('mouseenter',function(){
        clearInterval(yuanT);
    });
    $('.yuan').on('mouseleave',function(){
        yuanT=setInterval(moveYuan,100);
    });
    /////////////////////////文字效果//////////////
    setInterval(function(){
        $('.nr-inner1 .wz').toggleClass('active');
        setTimeout(function(){
            $('.nr-inner1 .wz1').toggleClass('active');
        },3000)
    },3000);
    //////home/////////////
    $('.nr-inner:first-child ').on('click',function(){
        $(this).children('a').toggleClass('active');
    });
    /////////////////////////////////////////////////////////////////////////skill动画//////////////
    $('.skill-nr-box').clone().appendTo($('.skill-nr1'));
    var skillSpeed=0;
    function skillMove(){
        skillSpeed+=1;
        if(skillSpeed>$('.skill-nr-box').width()/2){
            skillSpeed=0;
            $('.skill-nr1').css('left',0);
        }
        $('.skill-nr1').css('left',-skillSpeed);
    }
    var skillT=setInterval(skillMove,20);
    $('.skill-nr-box li').on('mouseenter',function(){
        clearInterval(skillT);
        $(this).children('a').addClass('active');
        $(this).children('span').addClass('active');
    });
    $('.skill-nr-box li').on('mouseleave',function(){
        skillT=setInterval(skillMove,20);
        $(this).children('a').removeClass('active');
        $(this).children('span').removeClass('active');
    });
    ////////////////////////////////////////////////////作品
    var designW=$('.design-inner').width();
    var design=$('.design-inner');
    var index=1;
    var next=1;
    $('.design-inner:first').css('left',2*designW);
    $('.design-inner').eq(1).css('left',1*designW);
    $('.design-inner').eq(1).children('a').addClass('active');
    function designMove(){
        next++;
        if(next>design.length-1){next=0;}
        design.eq(next).css('left',0*designW);
        design.eq(index).animate({'left':2*designW},1000);
        design.eq(next).animate({'left':1*designW},1000);
        $(design.eq(next).children('a')).addClass('active');
        $(design.eq(index).children('a')).removeClass('active');
        index=next;
    }
    var designT=setInterval(designMove,3000);
    $('.btn .right').on('click',function(){
        designMove();
    });
    $('.btn .left').on('click',function(){
        next--;
        if(next<0){next=design.length-1;}
        design.eq(next).css('left',2*designW);
        design.eq(index).animate({'left':0*designW},1000);
        design.eq(next).animate({'left':1*designW},1000);
        $(design.eq(next).children('a')).addClass('active');
        $(design.eq(index).children('a')).removeClass('active');
        index=next;
    });
    $('.shade-r').on('click',function(){
        designMove();
    });
    $('.shade').on('click',function(){
        next--;
        if(next<0){next=design.length-1;}
        design.eq(next).css('left',2*designW);
        design.eq(index).animate({'left':0*designW},1000);
        design.eq(next).animate({'left':1*designW},1000);
        $(design.eq(next).children('a')).addClass('active');
        $(design.eq(index).children('a')).removeClass('active');
        index=next;
    });
    $('.li-box').on('mouseenter',function(){
        $('.btn').addClass('active');
        clearInterval(designT);
    });
    $('.li-box').on('mouseleave',function(){
        $('.btn').removeClass('active');
        designT=setInterval(designMove,3000);
    });
    /////////////////////////////////////////////contact
    $('.callBtn').on('click',function(){
        $('.call a').toggleClass('active');
    });
    ////////////////////////////////////
    var H=$('body').scrollTop();
    console.log(H);
    if(H>660){
        $('.nr-inner a').css('color','#fff');
        $('.nr-inner').eq(0).css('color','yellow')
    }
    if(H>660*2){
        $('.nr-inner a').css('color','#fff');
        $('.nr-inner').eq(1).css('color','yellow')
    }
    if(H>660*3){
        $('.nr-inner a').css('color','#fff');
        $('.nr-inner').eq(2).css('color','yellow')
    }
    if(H>660*4){
        $('.nr-inner a').css('color','#fff');
        $('.nr-inner').eq(3).css('color','yellow')
    }
    if(H>660*5){
        $('.nr-inner a').css('color','#fff');
        $('.nr-inner').eq(4).css('color','yellow')
    }
    // for(var i=0;i<5;i++){
    //     $('.nr-inner a').eq(i).on('click',function(){
    //         $('body').scrollTop(i*660);
    //     })
    // }
    $('.nr-inner a').eq(0).on('click',function(){
        $('body').scrollTop(0*660);
    });
    $('.nr-inner a').eq(1).on('click',function(){
        $('body').scrollTop(1*660);
    });
    $('.nr-inner a').eq(2).on('click',function(){
        $('body').scrollTop(2*660);
    });
    $('.nr-inner a').eq(3).on('click',function(){
        $('body').scrollTop(3*660);
    });
    $('.nr-inner a').eq(4).on('click',function(){
        $('body').scrollTop(4*660);
    })

});