function getcall(classname,fw){
	if (document.getElementsByClassName){//如果有clname属性
		return fw.getElementsByClassName(classname);//返回clname函数
	}else{//否则
		var tag=fw.getElementsByTagName('*');//将其所有标签遍历出来赋给tag
		var b=[];//为空数组
		for (var i = 0; i < tag.length; i++) {//将所有标签遍历出来
			function bb(arr,classmanes){
                var aa=arr.split(' ')
                for (var i = 0; i < aa.length; i++) {
                    if(aa[i]==classmanes){
       	              return true;
                    }else{
       	              return false;
                    }
                }              
            } 
			if (bb(tag[i].className,classname)) {//如果函数bb返回值为真 
               	 b.push(tag[i]);//把标签放到数组b中
               }
            }
            return b;
		}
}
//获取
function getstyle(obj,sty){
  if (obj.currentStyle) {
    return obj.currentStyle[sty];
  }else{
    return getComputedStyle(obj,null)[sty];
  }
}


function $(selector,fw){
	if (typeof selector=='string') {
		var fw=fw||document;
	    if (selector.charAt(0)=='#') {
		    return document.getElementById(selector.substr(1))
	    }
	    if(selector.charAt(0)=='.'){
	    	return getcall(selector.substr(1),fw);
	    }
	    if(/^[a-zA-Z][a-zA-Z1-6]{0,9}$/.test(selector)){
	    	return fw.getElementsByTagName(selector);
	    }
      // if (/^<[a-zA-Z][a-zA-Z1-6]{0,9}>$/.test(selector)) {
      //   retrun document.createElement(selector.slice(-1,1));
      // };
    }else if(typeof selector=='function'){
    	window.onload=selector;
    }
}



function getChilds(obj){
        	var arr=[];
        	var childs=obj.childNodes;
            for (var i=0; i< childs.length; i++) {
        		if(!(childs[i].nodeType==8||(childs[i].nodeType==3&&stm(childs[i].nodeValue)==""))){
        			arr.push(childs[i]);
        		}
        	}return arr;
}
function stm(str){
            return str.replace(/^\s+|\s+$/g,"")
}

       
function	getfirst(obj){
       	   return  getChilds(obj)[0];
}

function	getlast(obj){
       	   var  getlast=getChilds(obj)
       	   return  getlast[getlast.length-1];
}

function getindex(obj,index){
       	   return getChilds(obj)[index];
}

function getnext(obj){
       	  var next=obj.nextSibling;
       	  if (!next) {return false};
          while(next.nodeType==8||(next.nodeType==3&&stm(next.nodeValue)=="")){
       	  if (!next) {return false};
       	  next=next.nextSibling;
       	  }return next;
}


function getprevious(obj){
       	  var previous=obj.previousSibling;
       	  if (!previous) {return false};
          while(previous.nodeType==8||(previous.nodeType==3&&stm(previous.nodeValue)=="")){
       	  if (!previous) {return false};
       	  previous=previous.nextSibling;
       	  }return previous;
       	}


function ysbefore(obj1,obj2){
	var parent=obj2.parentNode;
	parent.insertBefore(obj1,obj2);
}

function yslast(obj1,obj2){
	var parent=obj2.parentNode;
	var next=getnext(obj2);
	if(next){ 
	return 
	parent.insertBefore(obj1,next);
	}else{
	 return	parent.appendChild(obj1);
	}
}
  