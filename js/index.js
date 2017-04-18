
/*封装$*/
  window.$=HTMLElement.prototype.$=function(selector){
    var elems=(this==window?document:this)
        .querySelectorAll(selector);
    return elems.length==0?null:elems.length==1?elems[0]:elems;
  };
/*封装bind*/
HTMLElement.prototype.bind=
    function(eName,fn,capture){
      //this->elem
      this.addEventListener(eName,fn,capture);
    };
/*封装css*/
HTMLElement.prototype.css=
    function(prop,value){//this->elem
      if(value===undefined){
        var style=getComputedStyle(this);
        return style[prop];
      }else{
        this.style[prop]=value;
      }
    };
/*广告图片数组*/
var imgs=[
  {"i":0,"src":"images/adv1.jpg"},
  {"i":1,"src":"images/adv2.jpg"},
  {"i":2,"src":"images/adv3.jpg"}
];
var adv={
  LIWIDTH:0,//每个li的宽
  DISTANCE:0,//每次移动总距离
  DURATION:1000,//一次动画总时间
  STEPS:200,//总步数
  step:0,//步长   总距离/总步数
  interval:0,//步频  总时间/总步数
  timer:null,
  moved:0,//记录移动的步数
  WAIT:2000,
  canAuto:true,
  init:function(){//初始化
    this. LIWIDTH=parseFloat($("#slider").css("width"));
    this.updateView();
    $("#idxs").bind("mouseover",function(e){//给ul绑定鼠标移入事件，实现手动轮播
      var target= e.target;
      if(target.nodeName=="LI"&&target.className!="hover"){
        var start=$("#idxs .hover").innerHTML;
        var end=target.innerHTML;
        this.move(end-start);
      }
    }.bind(this));
    this.autoMove();
    $("#slider").bind("mouseover",function(){this.canAuto=false;}.bind(this));
    $("#slider").bind("mouseout",function(){this.canAuto=true;}.bind(this));
  },
  autoMove:function(){
    this.timer=setTimeout(function(){
      this.canAuto?this.move(1):this.autoMove();
    }.bind(this),this.WAIT);
  },
  move:function(n){//启动动画  n为移动的li的个数
   // 防止动画叠加
    clearInterval(this.timer);
    this.timer=null;
    this.DISTANCE=this.LIWIDTH*n;
    this.step=this.DISTANCE/this.STEPS;//计算步长
    if(n<0){//如果n<0向右移动
      imgs=imgs.splice(imgs.length-(-n),(-n)).concat(imgs);//删除数组末尾的n个元素再拼上数组的元素
      $("#imgs").css("left",this.LIWIDTH*n+"px");//将ul的left改为this.LIWIDTH*n  是负数
      this.updateView();//更新页面
      this.timer=setInterval(this.moveStep.bind(this/*adv*/),this.interval);
    }else{//左移
      this.timer=setInterval(this.moveStep.bind(this/*adv*/,function(){//回调函数this为window，要绑定为adv
        imgs=imgs.concat(imgs.splice(0,n));//删除数组开头的n个元素拼接到数组结尾
        this.updateView();//更新页面
        $("#imgs").css("left","");
      }.bind(this/*adv*/)),this.interval);
    }
  },
  moveStep:function(callback){//移动一步
    $("#imgs").css("left",parseFloat($("#imgs").css("left"))-this.step+"px");
    this.moved++;
    if(this.moved==this.STEPS){
      clearInterval(this.timer);
      this.timer=null;
      this.moved=0;
      callback&&callback();//回调函数，一次动画完成后立即更该数组
      $("#imgs").css("left","");//
      this.autoMove();
    }
  },
  updateView:function(){//更新页面
    $("#imgs").innerHTML="";//每次更新都要将innerHTML清空
    $("#idxs").innerHTML="";
    var fragImgs=document.createDocumentFragment();//把li img追加到其中
    var fragIdxs=document.createDocumentFragment(); //把li追加到其中1，2，3
    for(var i=0;i<imgs.length;i++){//遍历数组将图片刷新到页面
      var li=document.createElement("li");
      var image=new Image();
      image.src=imgs[i].src;
      li.appendChild(image);
      fragImgs.appendChild(li);
      li=document.createElement("li");
      if(i==imgs[0].i){li.className="hover";}
      li.innerHTML=i+1;
      fragIdxs.appendChild(li);
    }
    $("#imgs").appendChild(fragImgs);
    $("#idxs").appendChild(fragIdxs);
    $("#imgs").css("width",imgs.length*this.LIWIDTH+"px");//将ul的宽度给为li的宽度乘以li的个数
  }
};
adv.init();
//jQuery
(function($){
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
//主体部分切换菜单
$(".rec_menu ul a").on("click",function(e){
  e.preventDefault();
  //console.log($(this).attr("href"));
  $($(this).attr("href")).css('display','block').siblings().css('display','none');
  $(this).parent("li").addClass("active").siblings().removeClass("active");
});

})(jQuery);