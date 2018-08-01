$(function(){

  
       

    //输入span的touch事件
    $('.input-wrap').on('touchstart','.input-span',function(e){
        $('.input-span').removeClass('input-span-active');
        $(this).addClass('input-span-active');
       
      if($(this).hasClass('input-span-first')){
          $('.keyboard-first-wrap').slideDown();
          $('.keyboard-second-wrap').slideUp();
      } 
      else{
        $('.keyboard-second-wrap').slideDown();
        $('.keyboard-first-wrap').slideUp();
      }
    })

    //按钮span的touch事件
    $('.keybord-group').on('touchstart','.keybord-input-span',function(){
        if($(this).hasClass('keybord-delete')){
            $('.input-span-active').html('');
            if($('.last-span').html('')){
                $('.last-span').html('新能源');
                $('.last-span').css('font-size','3.75px');
                changeBeforeTarget();
            }else{
                changeBeforeTarget();
            }
            
        }
        else{
            var value = $(this).html();
            $('.input-span-active').html(value);
            changeAfterTarget();
            if($('.last-span').html()!="新能源"){
                $('.last-span').css('font-size','16px');
            }
        }
    })

    $(document).bind("touchstart",function(e){
        //id为menu的是菜单，id为open的是打开菜单的按钮            
        if($(e.target).closest(".input-wrap").length == 0 
        && $(e.target).closest(".keyboard-base").length == 0
        && $(e.target).closest(".submin-btn").length == 0){
        //点击id为menu之外且id不是不是open，则触发
        $('.keyboard-first-wrap').slideUp();
        $('.keyboard-second-wrap').slideUp();
        }
    })
    //提交的点击事件
    // $('.submin-btn').on('touchstart',function(){
    //     var targetList = $('.input-span');
    //     $.each(targetList,function(index,item){
    //        if($(item).html() == ''){
    //            alert('填写完整的车牌号!')
    //            return false;
    //        } 
    //     })

    // });
    $('.submin-btn').click(function () {
        var carNo="";
        var source = $('.input-span') ;
        console.log(source);
        var carNo="";
        $.each(source,function(index,item){
            carNo += $(item).html();
        })
        if(carNo.length<7){
            alert("车牌号不存在")
        }
        $('.payAfterHidden').removeClass('payAfterHidden');
        $('.imgWrap').css("display","none");
        var shouldpay=30;
        $('.shouldPay').html(shouldpay);
        $('.factPay').html(shouldpay);
        console.log(carNo);
        // alert(carNo);
        var paybtn=this;
        // $(paybtn).attr('disabled', 'disabled');
        $.ajax({
            type: "POST",
            url:"",
            // url: "/qrcode/alipaycreateOrder?auth_code="+auth_code+"&paytoken="+paytoken+"&tradeMoney="+$("#total").text(),
            // data: JSON.stringify({ auth_code: auth_code,total: $("#total").text()}),
            data:"",
            contentType: "application/json",
            dataType: "json",
            beforeSend: function () {
                 //3.让提交按钮失效，以实现防止按钮重复点击
                 $(paybtn).attr('disabled', 'disabled');
                 console.log('send')
                 //4.给用户提供友好状态提示
                 $(paybtn).attr('value', '支付中...');
             },
            async: true,//false代表只有在等待ajax执行完毕后,再向下执行
            success: function (dataObj) {
            	//alert(dataObj);
                /*if ($.StringIsNullOrUndefined(dataObj)) {
                    alert('数据加载失败，请重新扫码支付');
                    return;
                }*/
               // alert("1111");
               
                if (dataObj.status == 0) {
                   // var jObj = eval('(' + dataObj.data + ')');
                   // var attObj = eval('(' + dataObj.attach + ')');
                	//alert("0000000000");
                    callpay(dataObj);
                    $('.payAfterHidden').removeClass('payAfterHidden');
                    $('.imgWrap').css("display","none");
                    var shouldpay=30;
                    $('.shouldPay').html(shouldpay);
                    $('.factPay').html(shouldpay);

                }
                else {
                    alert(dataObj.errmsg);
                }
            },
            error: function (error) {
                var e = error;
            }
        }); 
    });
})



function changeAfterTarget(){
    var next =  $('.input-span-active').next();
    if(next.length==0){
        return "";
    }
    if(next.hasClass('input-span-special')){
        next = next .next();
    }
    $('.input-span-active').removeClass('input-span-active')
    next.addClass('input-span-active');
    $('.keyboard-second-wrap').slideDown()
    $('.keyboard-first-wrap').slideUp()

}

function changeBeforeTarget(){
    var prev =  $('.input-span-active').prev()
    if(prev.hasClass('input-span-special')){
        prev = prev .prev();
    }
    $('.input-span-active').removeClass('input-span-active')
    prev.addClass('input-span-active');
    
    if(prev.hasClass('input-span-first')){
        $('.keyboard-first-wrap').slideDown()
          $('.keyboard-second-wrap').slideUp()
    }

}


function getUrl(url,name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r  = !url.split("?")[1]  ? "" : url.split("?")[1].match(reg);
    if (!!r)
        return decodeURI(r[2]);
    return null;
}
    var url = window.location.href;
    var parkNo = getUrl(url,"parkNo");
    if(parkNo){
    var inputList =  $('.input-span')
    var len=parkNo.length;
    for(var i=0;i<len;i++){
            console.log(inputList[i])
            $(inputList[i]).html(parkNo[i]);
    }
    }
