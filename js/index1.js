/**1 页面加载完成后，异步请求页头和页尾**/
(function($){
  $(function(){
    $('#header').load('header.php');
    $('#footer').load('footer.php');
  });

//加载图片数据
			
				//导航条下拉菜单
				$(".course_box").on('mouseover',function(){
					$("#course_list").siblings("a").addClass("hover");
					$("#course_list").show();
				});
				$(".course_box").on('mouseout',function(){
					$("#course_list").siblings("a").removeClass("hover");
					$("#course_list").hide();
				});
				$(".business_box").on('mouseover',function(){
					$("#business_list").siblings("a").addClass("hover");
					$("#business_list").show();
				});
				$(".business_box").on('mouseout',function(){
					$("#business_list").siblings("a").removeClass("hover");
					$("#business_list").hide();
				});
				$(".campus_box").on('mouseover',function(){
					$("#campus_list").siblings("a").addClass("hover");
					$("#campus_list").show();
				});
				$(".campus_box").on('mouseout',function(){
					$("#campus_list").siblings("a").removeClass("hover");
					$("#campus_list").hide();
				});
			
		


  function loadcourse(pno){
    $.getJSON('data/select.php',{'pno':pno},function(pager){
      console.log("开始处理响应数据");
      console.log(pager);
      $("#case ul.course").empty();
			var html="";
      for(var i=0;i<pager.data.length;i++){
	
         html+=`<li><a href="#"><img src=${pager.data[i].pic}></a><p>${pager.data[i].pname}</p></li>`;
        
      }
			$("#case ul.course").append(html);
    //生成分页条
			//$('.pager').empty();
			//$('.pager').append(`<li class="active"><a href="#">${pager.currentPage}</a></li> `);
			//$('.pager').append(`<li><a href="#">${pager.currentPage+1}</a></li> `);
			//$('.pager').append(`<li><a href="javascript:loadcourse(3)">${pager.currentPage+2}</a></li> `);
			//$('.pager').append(`<li><a href="#">共${pager.pageCount}页</a></li> `);
		});
		
  }
	loadcourse(1);
	$('#page a').on("click",function(e){
		e.preventDefault();
		console.log("我被点击了");
		$(this).parent("li").addClass("active").siblings("li").removeClass("active");
		loadcourse(parseInt($(this).html()));
	})
})(jQuery);
