
/*��װ$*/
  window.$=HTMLElement.prototype.$=function(selector){
    var elems=(this==window?document:this)
        .querySelectorAll(selector);
    return elems.length==0?null:elems.length==1?elems[0]:elems;
  };
/*��װbind*/
HTMLElement.prototype.bind=
    function(eName,fn,capture){
      //this->elem
      this.addEventListener(eName,fn,capture);
    };
/*��װcss*/
HTMLElement.prototype.css=
    function(prop,value){//this->elem
      if(value===undefined){
        var style=getComputedStyle(this);
        return style[prop];
      }else{
        this.style[prop]=value;
      }
    };
/*���ͼƬ����*/
var imgs=[
  {"i":0,"src":"images/adv1.jpg"},
  {"i":1,"src":"images/adv2.jpg"},
  {"i":2,"src":"images/adv3.jpg"}
];
var adv={
  LIWIDTH:0,//ÿ��li�Ŀ�
  DISTANCE:0,//ÿ���ƶ��ܾ���
  DURATION:1000,//һ�ζ�����ʱ��
  STEPS:200,//�ܲ���
  step:0,//����   �ܾ���/�ܲ���
  interval:0,//��Ƶ  ��ʱ��/�ܲ���
  timer:null,
  moved:0,//��¼�ƶ��Ĳ���
  WAIT:2000,
  canAuto:true,
  init:function(){//��ʼ��
    this. LIWIDTH=parseFloat($("#slider").css("width"));
    this.updateView();
    $("#idxs").bind("mouseover",function(e){//��ul����������¼���ʵ���ֶ��ֲ�
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
  move:function(n){//��������  nΪ�ƶ���li�ĸ���
   // ��ֹ��������
    clearInterval(this.timer);
    this.timer=null;
    this.DISTANCE=this.LIWIDTH*n;
    this.step=this.DISTANCE/this.STEPS;//���㲽��
    if(n<0){//���n<0�����ƶ�
      imgs=imgs.splice(imgs.length-(-n),(-n)).concat(imgs);//ɾ������ĩβ��n��Ԫ����ƴ�������Ԫ��
      $("#imgs").css("left",this.LIWIDTH*n+"px");//��ul��left��Ϊthis.LIWIDTH*n  �Ǹ���
      this.updateView();//����ҳ��
      this.timer=setInterval(this.moveStep.bind(this/*adv*/),this.interval);
    }else{//����
      this.timer=setInterval(this.moveStep.bind(this/*adv*/,function(){//�ص�����thisΪwindow��Ҫ��Ϊadv
        imgs=imgs.concat(imgs.splice(0,n));//ɾ�����鿪ͷ��n��Ԫ��ƴ�ӵ������β
        this.updateView();//����ҳ��
        $("#imgs").css("left","");
      }.bind(this/*adv*/)),this.interval);
    }
  },
  moveStep:function(callback){//�ƶ�һ��
    $("#imgs").css("left",parseFloat($("#imgs").css("left"))-this.step+"px");
    this.moved++;
    if(this.moved==this.STEPS){
      clearInterval(this.timer);
      this.timer=null;
      this.moved=0;
      callback&&callback();//�ص�������һ�ζ�����ɺ�������������
      $("#imgs").css("left","");//
      this.autoMove();
    }
  },
  updateView:function(){//����ҳ��
    $("#imgs").innerHTML="";//ÿ�θ��¶�Ҫ��innerHTML���
    $("#idxs").innerHTML="";
    var fragImgs=document.createDocumentFragment();//��li img׷�ӵ�����
    var fragIdxs=document.createDocumentFragment(); //��li׷�ӵ�����1��2��3
    for(var i=0;i<imgs.length;i++){//�������齫ͼƬˢ�µ�ҳ��
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
    $("#imgs").css("width",imgs.length*this.LIWIDTH+"px");//��ul�Ŀ�ȸ�Ϊli�Ŀ�ȳ���li�ĸ���
  }
};
adv.init();
//jQuery
(function($){
  //�����������˵�
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
//���岿���л��˵�
$(".rec_menu ul a").on("click",function(e){
  e.preventDefault();
  //console.log($(this).attr("href"));
  $($(this).attr("href")).css('display','block').siblings().css('display','none');
  $(this).parent("li").addClass("active").siblings().removeClass("active");
});

})(jQuery);