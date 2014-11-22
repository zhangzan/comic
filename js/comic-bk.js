// 初始设置
// var pages = new Array(6,2,2,4);
var comicList = {
                'chapter1' :{'pages' : 6, 'info' : '第1章简介'},
                'chapter2' :{'pages' : 2, 'info' : '第2章简介'},
                'chapter3' :{'pages' : 2, 'info' : '第3章简介'},
                'chapter4' :{'pages' : 4, 'info' : '第4章简介'}
    };
var totalChapter = 0,
    totalPages = 0,
    currentPage = 1,
    currentChapter = 1;
$.each(comicList, function(i, v) {
    totalChapter++;
    totalPages += comicList[i].pages;
});
console.log(totalPages);
printPage();
setMenuOn();

function setPages(){

}
$('.pages').html('1/'+currentTotalpage);
for (var i = 0; i < pages.length; i++) {
    totalPages += parseInt(pages[i]);
};
$('.flipsnap').css('width', totalPages*640+'px');
$('.menu-content').css('width', ($('.menu-content li').length)*320+'px');

// printPage
function printPage(){
    var sflipsnap=smenuContent='';
    // 第一章
    for (var k = 1; k <= comicList.chapter1.pages; k++) {
        sflipsnap+='<li class="chapter1" data-chapter="1" data-page="'+k+'"><a class="prev"></a><a class="menu"></a><a class="next"></a><img src="img/1-'+k+'.png"></li>'
    };
    // 剩下章
    for (var i = 1; i < pages.length; i++) {
        for (var k = 1; k <= pages[i]; k++) {
            sflipsnap+='<li class="chapter'+(i+1)+'" data-chapter="'+(i+1)+'" data-page="'+k+'"><a class="prev"></a><a class="menu"></a><a class="next"></a><img data-src="img/'+(i+1)+'-'+k+'.png"></li>'
        };
    };
    for (var i = 1; i <= totalChapter; i++) {
        smenuContent+='<li class="menu-chapter'+i+'" data-chapter="'+i+'"><div class="img"><img src="img/chapter'+i+'.png"></div><h2 class="title">第'+i+'话</h2><p class="info">「ティターン戦記 序幕」</p></li>';
    }
    $('.flipsnap').html(sflipsnap);
    $('.menu-content').html(smenuContent);
}

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

    // 到第一页或最后一页 显示底部
    if(!flipsnap.hasPrev() || !flipsnap.hasNext()){
        $('.menu-warp').addClass('show');
    }else{
        $('.menu-warp').removeClass('show');
    }

    // 设置翻页数字
    currentPage = $('.flipsnap li').eq(flipsnap.currentPoint).attr('data-page');
    currentTotalpage = pages[$('.flipsnap li').eq(flipsnap.currentPoint).attr('data-chapter')-1];
    $('.pages').html(currentPage+'/'+currentTotalpage);

    // 延时加载
    currentChapter = parseInt($('.flipsnap li').eq(flipsnap.currentPoint).attr('data-chapter'));
    lazyLoading();

    setMenuOn();

}, false);
$('.menu').click(function() {
    $('.menu-warp').toggleClass('show');
});


// 延时加载
function lazyLoading() {
    var nextChapter = (currentChapter+1);
    for (var i = 0; i < $('.chapter'+nextChapter+'').length; i++) {
        var thisImg = $('.chapter'+nextChapter+'')[i].getElementsByTagName('img')[0];
        var thisSrc = thisImg.attributes.getNamedItem('data-src').value;
        thisImg.setAttribute('src', thisSrc);
    };
}

// 底部菜单
menuContent = Flipsnap('.menu-content', {
     distance: 320, // 一次滚动距离
     maxPoint: totalChapter-2   // move able 3 times
});

$('.menu-content li').click(function() {
    var thisChapter = $(this).attr('data-chapter');
    flipsnap.moveToPoint(num - 1);
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
        myScroll.on('zoomStart', zz());
        function zz(){
        }
    });
    document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
})()






