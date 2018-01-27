// function resize(){
// 	$(function(){
// 		var screenWidth = $(window).width;
// 		var isSmallScreen =screenWidth <768
// 	$("#main_ad >#carousel-example-generic>.carousel-inner>.item").each(function(i,item){
// 		var $item = $(item);
// 		var imgSrc = isSmallScreen ?$item.data("image-xs") :$item.data("image-lg");
// 		$itme.css('backgroudImage',"url('+imgSrc+')")
// 		if (isSmallScreen){
// 			$item.html("<img src="'+imgSrc+'" alt="" />")
// 		}
// 	})

// })
// }
// $(window).on("resize",resize)trigger("resize");
/*
 * 自己的JS脚步
 * @Author: iceStone
 * @Date:   2015-12-12 10:59:26
 * @Last Modified by:   iceStone
 * @Last Modified time: 2015-12-13 15:19:19
 */

$(function() {
  // 当文档加载完成才会执行
  /**
   * 根据屏幕宽度的变化决定轮播图片应该展示什么
   * @return {[type]} [description]
   */
  function resize() {
    // 以下是给tab选项卡添加动态滑动条
    var $ulContainer = $("#products >.container .nav-tabs");
    // console.log($ulContainer);
    var UlWidth = 30;
    $ulContainer.children().each(function(index,element){
      // 注意这里的element先是js对象 需要转换为jQuery对象
      UlWidth += $(element).width();
      // console.log(UlWidth);
    })
    if(UlWidth > $(window).width()){
      $ulContainer
        .css('width', UlWidth)
        .parent().css('overflow-x', 'scroll');
    }
    else{
      $ulContainer.css("width","auto");
    }
    // 以下是切换轮播图的图片
    // 获取屏幕宽度
    var windowWidth = $(window).width();
    // 判断屏幕属于大还是小
    var isSmallScreen = windowWidth < 768;
    // 根据大小为界面上的每一张轮播图设置背景
    // $('#main_ad > .carousel-inner > .item') // 获取到的是一个DOM数组（多个元素）
    $('#main_ad > #carousel-example-generic>.carousel-inner > .item').each(function(i, item) {
      // 因为拿到是DOM对象 需要转换
      var $item = $(item);
      // var imgSrc = $item.data(isSmallScreen ? 'image-xs' : 'image-lg');
      // var imgSrc =
      //   isSmallScreen ? $item.data('image-xs') : $item.data('image-lg');

      // jQuery方式
      // $element.data()
      // 是一个函数 ，专门用于取元素上的自定义属性（data-abc）
      // 函数的参数是我们要取得属性名称（abc）
      //
      // $element.attr('data-abc')
      //
      // JS中的写法
      // element.dataset['abc']
      //
      // element.getAttribute('data-abc')
      // element.setAttribute('data-abc','')

      // 设置背景图片
      // $item.css('backgroundImage', 'url("' + $item.data('image-xs') + '")');
      //
      // 因为我们需要小图时 尺寸等比例变化，所以小图时我们使用img方式
      if (isSmallScreen) {
        $item.html('<img src="' + $item.data('image-xs') + '" alt="" />');
      } else {
        $item.empty(); 
        $item.css('backgroundImage', 'url("' + $item.data('image-lg') + '")');
      }
    });
  }
  // $(window).on('resize', resize);
  // // 让window对象立即触发一下resize
  // $(window).trigger('resize');


  $(window).on('resize', resize).trigger('resize');
  // 这里使用tab选项卡内容必须的初始化
  $(function () {
  $('[data-toggle="tooltip"]').tooltip()
})


  // news中a标签的点击事件
  $newsTitle = $(".news-title");
  $("#news>.container>.row .nav-pills li a").on("click",function(){
    var $this = $(this);
    // 注意这一步千万不能省略，将doc对象转换为jQuery对象
    $newsTitle.text($this.data("title"))
  })


  // 轮播图的左滑右滑操作
  var $carousel = $("#main_ad>.carousel");
  var startX,endX;
  var huadongdaxiao=50;
  $carousel.on("touchstart",function(e){
    console.log(e);
    startX = e.originalEvent.changedTouches[0].clientX;

  })
  $carousel.on("touchmove",function(e){
    // console.log(e);
    endX = e.originalEvent.changedTouches[0].clientX;
  })  
  $carousel.on("touchend",function(e){
    $this = $(this);
    var distance = Math.abs(startX-endX);
    if (distance > huadongdaxiao) {
      $this.carousel(startX > endX ?"next":"prev");
    }

  })  



});
