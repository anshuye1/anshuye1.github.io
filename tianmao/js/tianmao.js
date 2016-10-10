$(function(){
	var banner=$('.banner')[0];
	var bnbox=$('.bnbox',banner)[0];
	var bnimg=$('img',bnbox);
	var bnzz0=$('.zzbn',banner)[0];
	var bnzz=$('a',bnzz0);
	var bnbtn=$('.bnbtn',banner)[0];
	var bn=$('div',bnbtn)
     var x=0;
     for (var i = 1; i < bnimg.length; i++) {
    		bnimg[i].style.opacity=0;
    	};
     bnzz[0].style.zIndex=10;
     bn[0].style.background='#ccc';


    function move(){
    	x++;
    	if (x==6){x=0};
    	for (var i = 0; i < bnimg.length; i++) {
    		bnimg[i].style.opacity=0;
    	};
    		animate(bnimg[x],{opacity:1},100);
    	
    	for (var j = 0; j <bnzz.length; j++) {
    		bnzz[j].style.zIndex=0
    	};
    	bnzz[x].style.zIndex=10
    	for (var j = 0; j <bn.length; j++) {
    		bn[j].style.background='#555'
    	};
    	bn[x].style.background='#ccc'
    }
    var t=setInterval(move,2000);
    banner.onmouseover=function(){
    	clearInterval(t)
    }    
    banner.onmouseout=function(){
    	t=setInterval(move,2000)
    }

    for (var i = 0; i < bn.length; i++) {
    	bn[i].index=i;
    	bn[i].onclick=function(){
    	for (var j = 0; j < bnimg.length; j++) {
    		bnimg[j].style.opacity=0;
    		bnzz[j].style.zIndex=0;
    		bn[j].style.background="#555";
    	};
    		bn[this.index].style.background="#ccc";
    		bnzz[this.index].style.zIndex=10;
    		animate(bnimg[this.index],{opacity:1},100);
    		x=this.index;
    };
        
    }
    //下拉栏
    //懒加载
    var xial=$('.xialbox')[0];
    var refuchuang=$('.refuchuang')[0];
    var rea=$('a',refuchuang);
    var lj=$('.lj')
    var a=xial.offsetTop;
    var ch=document.documentElement.clientHeight;
    var arrc=[];
    var flagss=[];

    for (var i = 0; i < lj.length; i++) {
        arrc.push(lj[i].offsetTop);
        flagss.push(true)
    }
    window.onscroll=function(){
      var stop=document.body.scrollTop||document.documentElement.scrollTop;
        
   for (var i = 0; i < arrc.length; i++) {
        if(arrc[i]<=stop+ch&&flagss[i]){
            flagss[i]=false;
            var imgs=$('img',lj[i]);
            for (var j = 0; j < imgs.length; j++) {
            imgs[j].src=imgs[j].getAttribute('asrc');   
            };
        }
    };


    //下拉
      if (stop>600) {
        animate(xial,{top:0},500);
      }else{
        animate(xial,{top:-50},500);

      }
      

    //走哪哪亮
    if (stop>900) {
        animate(refuchuang,{left:20},300);
    }else{
        animate(refuchuang,{left:-50},300);
    }
        for (var i = 0; i < arrc.length; i++) {
            if (arrc[i]<stop+150) {
                for (var j = 0; j < rea.length; j++) {
             rea[j].style.background='#ccc';  
                };
            rea[i].style.background='#a50000';
        };
        
        //按钮功能
        rea[8].onclick=function(){
            animate(document.body,{scrollTop:0},1000);
            animate(document.documentElement,{scrollTop:0},1000);
        }
    for (var m = 0; m < rea.length-1; m++) {
            rea[m].index=m;
            rea[m].onclick=function(){
            document.body.scrollTop=arrc[this.index];
            document.documentElement.scrollTop=arrc[this.index]            
            }
        };          
    for (var n = 0; n < rea.length; n++) {
        rea[n].index=n;
     rea[n].onmouseover=function(){
            rea[this.index].style.background='#a50000';
    };
     rea[n].onmouseout=function(){
            rea[this.index].style.background="#ccc";
        }
}   
}
    }
    //变大
    var chaoliu1=$('.chaoliu1',chaoliu1)[0];
    var ctu1=$('.ctu1',chaoliu1);
    function ctu(a){
    var cimg=$('img',a)[0];
      a.onmouseover=function(){
        animate(cimg,{height:130,width:130,bottom:10},300)
      a.onmouseout=function(){
        animate(cimg,{height:120,width:120,bottom:20},300)
         }
     };
     }
     for (var i = 0; i < ctu1.length; i++) {
         ctu(ctu1[i])
     };

     //向左
     
     var qinzi=$(".qinqian")[0];
     var qinzi1=$(".qinhou")[0];
     
     var qinzia=$('a',qinzi);
     var qinzia1=$('a',qinzi1);
     for (var i = 0; i < qinzia.length; i++) {
       qzleft(qinzia[i])
     };
     for (var j = 0;j < qinzia1.length; j++) {
       qzleft(qinzia1[j])
     };
     function qzleft(qinzia){
      var qimg=$('img',qinzia)[0];
       qinzia.onmouseover=function(){
       animate(qimg,{right:10},200)
       }
       qinzia.onmouseout=function(){
        animate(qimg,{right:0},200) 
       }
      }
     var qinzi=$(".qinqian")[1];
     var qinzi1=$(".qinhou")[1];
     
     var qinzia=$('a',qinzi);
     var qinzia1=$('a',qinzi1);
     for (var i = 0; i < qinzia.length; i++) {
       qzleft(qinzia[i])
     };
     for (var j = 0;j < qinzia1.length; j++) {
       qzleft(qinzia1[j])
     };
     function qzleft(qinzia){
      var qimg=$('img',qinzia)[0];
       qinzia.onmouseover=function(){
       animate(qimg,{right:10},200)
       }
       qinzia.onmouseout=function(){
        animate(qimg,{right:0},200) 
       }
      }


      //潮电酷玩向左



      var dianwan=$(".dianwan");
      for (var i = 0; i < dianwan.length; i++) {
    
      var dwa=$("a",dianwan[i]);
      for (var j = 0; j < dwa.length; j++) {
        kwa(dwa[j])
      }
      }
        function kwa(dwa){
          var dwimg=$('img',dwa)[0];

        dwa.onmouseover=function(){
            animate(dwimg,{right:10},200)
        }
        dwa.onmouseout=function(){
            animate(dwimg,{right:0},200)
        }
        }
        
    //居家左
          var homez=$(".homez");
      for (var i = 0; i <homez.length; i++) {
    
      var hz=$("a",homez[i]);
      for (var j = 0; j < hz.length; j++) {
        kwa(hz[j])
      }
      }
          var homer=$(".homer");
      for (var i = 0; i <homer.length; i++) {
    
      var hr=$("a",homer[i]);
      for (var j = 0; j < hr.length; j++) {
        kwa(hr[j])
      }
      }

   






    //黑浮窗
    var heitiao=$('.heitiao')[0];
    var heif=$('.heif',heitiao)[0];
    var heif01=$('.heif01',heitiao);
    var heif05=$('.heif05',heitiao)[0];
    var heife=$('.heife',heitiao)[0];


    for (var i = 0; i < heif01.length; i++) {
        hei(heif01[i])
    };
    hei(heif)
    hei(heif05)
    hei(heife)

    function hei(heif){
    var heifa=$('a',heif)[1];

    hover(heif,function(){
        heifa.style.display='block';
    },function(){
        heifa.style.display='none';

    })};



//分类导航
   var taobox0=$('.taobox0');
    for (var i = 0; i < taobox0.length; i++) {
        tbox(taobox0[i]);
    };
   function tbox(taobox0){
   var taobox1=$('.taobox1',taobox0)[0];
   var taodiv=$('div',taobox0)[0];

   hover(taobox0,function(){
    taodiv.style.display='block';
    taobox1.style.background='#fff';
   },function(){
    taodiv.style.display='none';
    taobox1.style.background='';
   })}
   var taobox00=$('.taobox00')[0];
   tbox(taobox00);


//banner侧栏

     var banf=$('.banf');
    for (var i = 0; i < banf.length; i++) {
        bff(banf[i]);
    };
    function bff(banf){
     var banf1=$('.banf1',banf)[0];
     var banfa=$('a',banf)[0];
     hover(banf,function(){
        banf1.style.display='block';
        banfa.style.background='#fff';
        bnbtn.style.display='none';
     },function(){
        banf1.style.display='none';
        banfa.style.background='';
        bnbtn.style.display='block';
     })};




    
})