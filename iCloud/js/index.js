var title = angular.module('title',[]);
title.directive('ngColorUl',[function(){
    return{
        restrict:'AE',
        replace:true,
        transclude:true,
        template: '<ul class="left-title"><div ng-transclude></div></ul>',
        link:function(scope,el){
            $(el).on('click','li',function(){
                $('.left-title-inner').removeClass('bianji').removeClass('active');
                $(this).addClass('bianji');
                $(document).on('keyup',function(e) {
                    if(e.keyCode===46){
                        var id=parseInt($(el).find('.bianji').attr('data-id'));
                        console.log(id);
                        scope.$apply(function(){
                            scope.cates=scope.cates.filter(function(v){
                                return v.id !== id;
                            })
                        });
                    }
                    console.log(scope.cates);
                });
                return false;
            });
            $(el).on('mousedown',false);
            $(el).on('dblclick','li',function(){
                $('.left-title-inner').removeClass('active');
                $(this).addClass('active');
                var input=$(this).children('input');
                input.val(input.val()).focus();
                return false;
            });
        }
    }
}]);
title.controller('mainCtrl',['$scope',function($scope){
    $scope.cates = [
        {id:1001,theme:'yuan1',title:'新列表1',
            todo:[{id:1001,title:'che',state:1},{id:1002,title:'fang',state:0},{id:1003,title:'child',state:0}]},
        {id:1002,theme:'yuan2',title:'新列表2',
            todo:[{id:1001,title:'che',state:1},{id:1002,title:'fang',state:1},{id:1003,title:'child',state:1}]},
        {id:1003,theme:'yuan3',title:'新列表3',
            todo:[{id:1001,title:'che',state:1},{id:1002,title:'fang',state:0},{id:1003,title:'child',state:0}]},
        {id:1004,theme:'yuan4',title:'新列表4',
            todo:[{id:1001,title:'che',state:1},{id:1002,title:'fang',state:0},{id:1003,title:'child',state:0}]},
        {id:1005,theme:'yuan5',title:'新列表5',
            todo:[{id:1001,title:'che',state:1},{id:1002,title:'fang',state:0},{id:1003,title:'child',state:0}]},
        {id:1006,theme:'yuan6',title:'新列表6',
            todo:[{id:1001,title:'che',state:1},{id:1002,title:'fang',state:0},{id:1003,title:'child',state:0}]},
        {id:1007,theme:'yuan7',title:'新列表7',
            todo:[{id:1001,title:'che',state:1},{id:1002,title:'fang',state:0},{id:1003,title:'child',state:0}]}
    ];
    $scope.colors = [
        {theme: "yuan1",active:1},
        {theme: "yuan2",active:1},
        {theme: "yuan3",active:1},
        {theme: "yuan4",active:1},
        {theme: "yuan5",active:1},
        {theme: "yuan6",active:1},
        {theme: "yuan7",active:1}
    ];

    $scope.add=function(){
        var maxId=-Infinity;
        $scope.cates.forEach(function(v,i){
            if(maxId < v.id){
                maxId = v.id;
            }
        });
        $scope.cates.push(
            {
                id:maxId + 1,
                theme:'yuan'+(($scope.cates.length+1) % 7),
                title:'新列表'+($scope.cates.length+1)
            }
        );
        console.log(($scope.cates[$scope.cates.length-1]).id);
        console.log($scope.cates.length)
    };
    $scope.current = $scope.cates[0];
    $scope.setcurrent=function(v){
        $scope.current=v;
    };
    $scope.xiala=function(e){
        e.stopPropagation();
        $('.nav-list1 .success1').toggle();
        $('.nav-list0 .list span').toggleClass('active');
    };
    $scope.addLi=function(v){
        var maxId=-Infinity;
        $scope.current.todo.forEach(function(v,i){
            if(maxId < $scope.current.todo[i].id){
                maxId = $scope.current.todo[i].id;
            }
        });
        $scope.current.todo.push(
            {id:maxId + 1,title:v,state:0}
        );
        console.log(($scope.current.todo[$scope.current.todo.length-1]).id);
        console.log($scope.current.todo.length)
    };
    $scope.delete=function(a){
        var id=a.id;
        $scope.current.todo=$scope.current.todo.filter(function(v){
            console.log(v.id);
            console.log(id);
            if(v.id === id+1){
                a=v;
            }
            return v.id!==id;
        });
    };
    $scope.deletes=function(){
        $scope.current.todo=$scope.current.todo.filter(function(v){
            return v.state!==1;
        });
    };
    $scope.deleteLeft=function(v){
        var id=v.id;
        $scope.cates=$scope.cates.filter(function(v,i){
            console.log(v.id);
            console.log(id);
            return v.id !== id;
        });
    };
    $scope.searchLi=function(v){
        console.log(v);
        console.log($('.sousuo').get(0).value);
        $('.fanhui').css('display','block');
        $('.fanhui').on('click',function(){
           
            $(this).css('display','none');
            $('.search-input-box').css('display','none');
        });
        $scope.current.todo.filter(function(v){
            if($('.sousuo').get(0).value==v.title){
                $('.search-input-box ul').css('display','block');
                $('.search-input-box #search-li').val($('.sousuo').get(0).value);
            }
        });
    };
}]);
$(function(){
    $('.wancheng').on('click',function(){
        $('.title-hide').css('display','none');
    });
    $('.xuanxiang').on('click',function(){
        $('.title-hide').css('display','block');
    });
    $('.color-box div:first').addClass('active');
    $('.color-box div').on('click',function(){
        $('.color-box div').removeClass('active');
        $(this).addClass('active');
    });
    $('.nav-box ul').on('click','li',function(){
        $('.nav-box ul li').removeClass('active');
        $(this).addClass('active');
        return false;
    });
    $('.quxiao').on('click',function(){
        $('.color-box div').removeClass('active');
        $('.color-box div:first').addClass('active');
        $('.title-hide').css('display','none');
    });

    $(document).on('click',function(){
        $('.nav-box ul li').removeClass('active');
        $('.left-title').children('li').removeClass('bianji').removeClass('active');
        $('.nav-list0 .list span').removeClass('active');
        $('.nav-list1 .success1').hide();
    });
    $('.nav-box .nav-list0 .list').on('mousedown',false);
    $('.sousuo').on('click',function(){
        $('.search-input-box').css('display','block');
    })
});