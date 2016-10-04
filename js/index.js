$(function () {
    var h=$(window).height();
    $('.header-box').height(h);
    var flag=true;
    $(document).on('click',function(){
        $('.wz-box p').toggleClass('wz-inner');
        $('.header-box h2').toggleClass('ani').toggleClass('zoom-in-left');
        if(flag){
            clearInterval(t);
            $('.wz-box3').animate({'top':100},2000);
            $('.wz-box3').animate({'opacity':0},2000);
            flag=false;
        }else{
            t=setInterval(move,4000);
            $('.wz-box3').animate({'top':'40%'},2000);
            $('.wz-box3').animate({'opacity':1},2000);
            flag=true;
        }
    });
     var t=setInterval(move,4000);
    function move() {
        $('.wz-box2').animate({'left':'40%'},2000);
        $('.wz-box2').animate({'left':'0'},2000);
        $('.wz-shengzi').animate({'width':'40%'},2000);
        $('.wz-shengzi').animate({'width':'0'},2000);
    }
});