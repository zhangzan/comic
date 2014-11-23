// 初始设置
var comicList = {
                'chapter1' :{'chapter' : '1' , 'pages' : 6, 'info' : '第1章简介'},
                'chapter2' :{'chapter' : '2' , 'pages' : 2, 'info' : '第2章简介'},
                'chapter3' :{'chapter' : '3' , 'pages' : 2, 'info' : '第3章简介'},
                'chapter4' :{'chapter' : '4' , 'pages' : 4, 'info' : '第4章简介'}
    };
var totalChapter = totalPages = 0,
    currentPage =currentChapter =1;

$.each(comicList, function(i, v) {
    totalChapter++;
    totalPages += comicList[i].pages;
})
$('.flipsnap').css('width', totalPages*640+'px');
$('.menu-content').css('width', totalChapter*320+'px');

printPage();
setMenuOn();
setPages();

// 主视图滑动 点击
var flipsnap = Flipsnap('.flipsnap');
var $next = $('.next').click(function() {
    flipsnap.toPrev();
});
var $prev = $('.prev').click(function() {
    flipsnap.toNext();
});
flipsnap.element.addEventListener('fspointmove', function() {
    $next.attr('disabled', !flipsnap.hasNext());
    $prev.attr('disabled', !flipsnap.hasPrev());
    currentPage = $('.flipsnap li').eq(flipsnap.currentPoint).attr('data-page');
    currentChapter = $('.flipsnap li').eq(flipsnap.currentPoint).attr('data-chapter');
    setPages();
    setMenuOn();
    menuContent.moveToPoint(currentChapter-2);
    lazyLoading();
 }, false);

// 底部菜单
var menuContent = Flipsnap('.menu-content', {
     distance: 320, // 一次滚动距离
     maxPoint: totalChapter-2   // 滚动次数
});

function setPages(){
    $('.pages').html(currentPage+'/'+comicList['chapter'+currentChapter].pages);
}
// printPage
function printPage(){
    var sflipsnap=smenuContent='';
    $.each(comicList, function(i, v) {
        for (var k = 1; k <= v.pages; k++) {
            sflipsnap+='<li data-chapter="'+v.chapter+'" data-page="'+k+'" data-img="0"><a class="prev"></a><a class="menu"></a><a class="next"></a><img data-src="img/'+v.chapter+'-'+k+'.png"></li>'
        };
        smenuContent+='<li class="menu-chapter'+v.chapter+'" data-chapter="'+v.chapter+'"><div class="img"><img src="img/chapter'+v.chapter+'.png"></div><h2 class="title">第'+v.chapter+'话</h2><p class="info">'+v.info+'</p></li>';
    });
    $('.flipsnap').html(sflipsnap);
    $('.menu-content').html(smenuContent);
}

$('.menu').click(function() {
    $('.menu-warp').toggleClass('show');
});

// 延时加载
function lazyLoading() {
    for (var ii = -1; ii < 3; ii++) {
        var index = flipsnap.currentPoint+ii;
        var dom = $('.flipsnap li').eq(index);
        var img = dom.find('img');
        var imgState = dom.attr('data-img');
        if (imgState == 0) {
                // dom.siblings('li').find('img').attr('src', '');
            img.attr('src', img.attr('data-src'));
            dom.attr('data-img', '1');
        };
    };
    for (var i = 0; i < totalPages; i++) {
        if(!( flipsnap.currentPoint-2 < i && i < flipsnap.currentPoint+3 )){
            var dom = $('.flipsnap li').eq(i);
            var img = dom.find('img');
            var imgState = dom.attr('data-img');
            img.attr('src', '');
            dom.attr('data-img', '0');
        }
    };
}
lazyLoading();


$('.menu-content li').click(function() {
    var thisIndex = 0;
    currentChapter = $(this).attr('data-chapter');
    menuContent.moveToPoint(currentChapter-2);
    $('.menu-chapter'+currentChapter+'').addClass('on').siblings('li').removeClass('on');
    for (var i = 1; i < currentChapter; i++) {
        thisIndex += comicList['chapter'+i].pages;
    };
    flipsnap.moveToPoint(thisIndex);
});

function setMenuOn() {
    $('.menu-chapter'+currentChapter+'').addClass('on').siblings('li').removeClass('on');
}

// fastclick
FastClick.attach(document.body);

//zoom

(function(){
    var myScroll;
    $(window).load(function() {
        myScroll = new IScroll('#zoom', {
            zoom: true,
            scrollX: true,
            scrollY: true,
            mouseWheel: true,
            wheelAction: 'zoom'
        });
    });
    document.addEventListener('touchmove', function (e) {
        e.preventDefault();
    }, false);
})()

