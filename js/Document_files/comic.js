// 初始设置
var currentPage = 1,//当前页
    totalPages = 24,//总页数
    lazyNum = 4;
printPage();
$('.viewport').css('height', $(window).height()+'px');
$('.flipsnap li').css('height', $(window).height()+'px');
$('.flipsnap').css('width', totalPages*640+'px');
$('.menu-content').css('width', ($('.menu-content li').length)*160+'px');
setPages();

// 主视图滑动 点击
var flipsnap = Flipsnap('.flipsnap');
var $next = $('.next').click(function() {
    flipsnap.toNext();
});
var $prev = $('.prev').click(function() {
    flipsnap.toPrev();
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
    currentPage = flipsnap.currentPoint + 1;
    setPages();
    lazyLoading();
}, false);
$('.menu').click(function() {
    $('.menu-warp').toggleClass('show');
});

// printPage
function printPage(){
    var sflipsnap=smenuContent='';
    for (var i = 1; i <= totalPages; i++) {
        if(i<5){
            sflipsnap+='<li id="flipsnapli'+i+'"><a class="prev"></a><a class="menu"></a><a class="next"></a><img src="img/'+i+'.jpg"></li>'
        }else{
            sflipsnap+='<li id="flipsnapli'+i+'"><a class="prev"></a><a class="menu"></a><a class="next"></a><img src=""></li>'
        }
    };
    for (var i = 1; i <= totalPages; i++) {
        if(i<5){
            smenuContent+='<li id="menuli'+i+'" data-num="'+i+'"><img src="img/'+i+'.jpg"></li>';
        }else{
            smenuContent+='<li id="menuli'+i+'" data-num="'+i+'"><img src=""></li>';
        }
    };
    $('.flipsnap').html(sflipsnap);
    $('.menu-content').html(smenuContent);
}

// 延时加载
function lazyLoading() {
    $('#flipsnapli'+(currentPage+3)).find('img').attr('src', 'img/'+(currentPage+3)+'.jpg');
    $('#flipsnapli'+(currentPage+4)).find('img').attr('src', 'img/'+(currentPage+4)+'.jpg');
    $('#menuli'+(currentPage+3)).find('img').attr('src', 'img/'+(currentPage+3)+'.jpg');
    $('#menuli'+(currentPage+4)).find('img').attr('src', 'img/'+(currentPage+4)+'.jpg');
}

// 设置翻页数字
function setPages(){
    $('.pages').html(currentPage+'/'+totalPages);
}

// 底部菜单
menuContent = Flipsnap('.menu-content', {
    distance: 320, // 一次滚动距离
    maxPoint: totalPages/2 - 1   // move able 3 times
});
// menuContent.element.addEventListener('fspointmove', function() {
//     currentPage = menuContent.currentPoint + 1;
//     lazyLoading();
//     setPages();
// }, false);

$('.menu-content li').click(function() {
    var num = $(this).attr('data-num');
    flipsnap.moveToPoint(num - 1);
});

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
    document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
})()







