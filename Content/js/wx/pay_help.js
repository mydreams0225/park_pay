
//调用微信JS api 支付
function jsApiCall(paramJsonObj, attachJsonObj) {
    WeixinJSBridge.invoke(
        'getBrandWCPayRequest',
        {
            "appId": paramJsonObj.appId,//公众号名称，由商户传入
            "nonceStr": paramJsonObj.nonceStr, //随机串   
            "package": paramJsonObj.package,
            "paySign": paramJsonObj.paySign, //微信签名 
            "signType": paramJsonObj.signType,//微信签名方式：
            "timeStamp": paramJsonObj.timeStamp//时间戳，自1970年以来的秒数     
        },
        function (res) { // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
            if (res.err_msg == "get_brand_wcpay_request:ok") {
                
               // window.location.href = attachJsonObj.adpage;
            	window.location.href = www.baidu.com;
            }
            if (res.err_msg == "get_brand_wcpay_request:cancel") {
                //alert("cancel");
                alert("取消支付");
            }
            if (res.err_msg == "get_brand_wcpay_request:fail") {
                //alert("fail");
                alert("支付失败");
            }

            WeixinJSBridge.log(res.err_msg);
            //alert(res.err_code + '; ' + res.err_desc + '; ' + res.err_msg + ';');
        }
    );
}

function callpay(paramJsonObj, attachJsonObj) {
    if (typeof WeixinJSBridge == "undefined") {
        if (document.addEventListener) {
            document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
        }
        else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', jsApiCall);
            document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
        }
    }
    else {
        jsApiCall(paramJsonObj, attachJsonObj);
    }
}

wx.ready(function () {
    //批量隐藏菜单项
    wx.hideMenuItems({
        menuList: [
            'menuItem:readMode', // 阅读模式
            'menuItem:share:timeline', // 分享到朋友圈
            'menuItem:share:appMessage',
            'menuItem:share:qq',
            'menuItem:share:weiboApp',
            'menuItem:favorite',
            'menuItem:share:QZone',
            'menuItem:copyUrl', // 复制链接
            'menuItem:exposeArticle', //举报
            'menuItem:setFont', //调整字体
            'menuItem:dayMode',
            'menuItem:nightMode',
            'menuItem:openWithQQBrowser',
            'menuItem:openWithSafari',
            'menuItem:share:email',
            'menuItem:share:brand'
        ],
        success: function (res) {
            //alert('已隐藏“阅读模式”，“分享到朋友圈”，“复制链接”等按钮');
        },
        fail: function (res) {
            alert(JSON.stringify(res));
        }
    });
});
