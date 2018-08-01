$(function () {
	var openid = $.getUrlParam('openid');
	var paytoken = $.getUrlParam('paytoken');
    /*var sId = $.getUrlParam('shopId');
    var qrcNo = $.getUrlParam('qrcNo');*/
    

    //屏蔽浏览器body的touchmove事件
    document.body.addEventListener('touchmove', function (event) {
        event.preventDefault();
    }, false);
    //填写信息
    $('.submit').click(function (e) {
        $('.layer').hide();
        $('.form').hide();
        e.preventDefault();//阻止表单提交
    })
    // 监听#total内容变化，改变支付按钮的颜色
    $('#total').bind('DOMNodeInserted', function () {
        if ($("#total").text() != "" || $("#total").text() > '0') {
            $('.submit').removeClass('active');
            $('.submit').attr('disabled', false);
        } else {
            $('.submit').addClass('active');
            $('.submit').attr('disabled', true);
        }
    }).trigger('DOMNodeInserted');

    var reg = /^((?:0|0\.)|(?:[1-9]\d*|[1-9]\d*\.))(?:\.\d{1,2})?$/;
    $('.form_edit .num').click(function () {
        var oDiv = document.getElementById("total");
        var totalStr = oDiv.innerHTML;
        totalStr = totalStr + this.innerHTML;

        if (reg.test(totalStr)) {
            oDiv.innerHTML = totalStr;
        }

    });
    $('#remove').click(function () {
        var oDiv = document.getElementById("total");
        var oDivHtml = oDiv.innerHTML;
        oDiv.innerHTML = oDivHtml.substring(0, oDivHtml.length - 1);
    });
    //提交订单
    $('.submit').click(function () {
        
    	alert(JSON.stringify({ openid: openid,total: $("#total").text()}));
        $.ajax({
            type: "POST",
            url: "/qrcode/createOrder?openid="+openid+"&paytoken="+paytoken+"&tradeMoney="+$("#total").text(),
            data: JSON.stringify({ openid: openid,total: $("#total").text()}),
            contentType: "application/json",
            dataType: "json",
            async: true,//false代表只有在等待ajax执行完毕后,再向下执行
            success: function (dataObj) {
            	alert(dataObj);
                /*if ($.StringIsNullOrUndefined(dataObj)) {
                    alert('数据加载失败，请重新扫码支付');
                    return;
                }*/
               // alert("1111");
                if (dataObj.status == 0) {
                   // var jObj = eval('(' + dataObj.data + ')');
                   // var attObj = eval('(' + dataObj.attach + ')');

                    callpay(dataObj, dataObj);
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
});