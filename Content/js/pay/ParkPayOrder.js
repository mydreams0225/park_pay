$(function () {
    $('.loadingbox').hide();
    $('#pay').attr({ "disabled": "disabled" });
    var sId = $.getUrlParam('shopId');
    var cNo = $.getUrlParam('openId');//检查停车系统传来的微信OpenId(cardNo)用于无牌车支付
    var cId = $.getUrlParam('channelId');//停车系统传来的通道ID(支付成功后，通知停车系统付款成功时，需要带上此ID)

    var hintTxt = '输入车牌查询停车费';
    var reg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼]{1}$/;
    var regnum =/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼]{1}[A-Z]{1}[A-Z0-9]{5}$/;
    var regnum2 = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼]{1}[A-Z]{1}[A-Z0-9]{5}[A-Z0-9学港澳]{1}$/;

    document.getElementById("platenum").innerHTML = hintTxt; //输入框提示

    //屏蔽浏览器body的touchmove事件
    document.body.addEventListener('touchmove', function (event) {
        event.preventDefault(); //禁止touchmove的默认操作（即拖动页面）
        //event.stopPropagation();//阻止弹出层的click事件，防止冒泡到body
    }, false);

    //检查是否无车牌用户进入
    if (!$.StringIsNullOrUndefined(cNo) && !$.StringIsNullOrUndefined(sId)) {
        searchCarInfo('', cNo, sId);
    }

    $('.shuru').click(function (e) {
        var platenumDiv = document.getElementById("platenum");
        //platenumDiv.innerHTML = ''; //清空提示内容
        var contentTxt = platenumDiv.innerHTML;

        if (contentTxt === '' || contentTxt === null || contentTxt === hintTxt) {
            showProvinceKB();
            e.stopPropagation();

            platenumDiv.innerHTML = ''; //清空车牌内容
        }
    })

    $('#form_edit .num').click(function () {
        var oDiv = document.getElementById("platenum");
        var contentTxt = oDiv.innerHTML;

        if (contentTxt === hintTxt) {
            contentTxt = '';
        }

        contentTxt = contentTxt + this.innerHTML;
        //检查录入的车牌号码是否符合
        if ($.CheckPlateNumRule(contentTxt)) {
            oDiv.innerHTML = contentTxt;
        }

        // 如果有省，隐藏省份录入的键盘
        if (reg.test(contentTxt)) {
            hideProvinceKB();
        }
    });

    $('#remove').click(function (e) {
        var oDiv = document.getElementById("platenum");
        var oDivHtml = oDiv.innerHTML;
        oDiv.innerHTML = oDivHtml.substring(0, oDivHtml.length - 1);

        //如果是空，显示省份录入的键盘
        if (oDiv.innerHTML === '' || oDiv.innerHTML === null) {
            showProvinceKB();
            e.stopPropagation();
        }
    });

    //查询车辆停车费用
    $('#search').click(function () {
        var pNum = $("#platenum").text();

        if ($.StringIsNullOrUndefined(pNum)) {
            //alert('请录入车牌');
            iosOverlay({
                text: "请录入车牌号",
                duration: 2e3,
                icon: "../../Content/image/cross.png"
            });
            return;
        }

        if (!regnum.test(pNum) && (!regnum2.test(pNum))) {
            //alert('您录入的车牌号有误，请重新录入');
            iosOverlay({
                text: "车牌号有误",
                duration: 2e3,
                icon: "../../Content/image/cross.png"
            });
            return;
        }
        
        
        searchCarInfo(pNum, '', sId);
        
    });


    
    // 提交支付
    $('#pay').click(function () {
        $('#pay').attr({ "disabled": "disabled" });
        var pNum = $('#platenum').html();
        //pNum = plateNumHandler(pNum, cNo);       

        $.ajax({
            type: "POST",
            url: "/api/INativePay/js_pay",
            data: JSON.stringify({
                shopId: sId,
                total: $('#sp_total').html(),
                real: $("#sp_real").html(),
                plateNum: plateNumHandler(pNum, cNo),
                cardNo: cNo,
                inTime: $('#inp_inTime').val(),
                outTime: $('#inp_outTime').val(),
                parkTime: $("#inp_parkTime").val(),
                channelId: cId
            }),
            contentType: "application/json",
            dataType: "json",
            async: true,//false代表只有在等待ajax执行完毕后,再向下执行
            success: function (dataObj) {
                //alert(dataObj);
                if ($.StringIsNullOrUndefined(dataObj)) {
                    
                    alert('数据加载失败，请重新扫码支付');
                    return;
                }

                if (dataObj.errcode === 0) {
                    
                    var jObj = eval('(' + dataObj.data + ')');
                    var attObj = eval('(' + dataObj.attach + ')');

                    callpay(jObj, attObj);
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

var hideProvinceKB = function () {
    $('.layer-province').animate({
        bottom: '-200px'
    }, 200)
}
var showProvinceKB = function () {
    $('.layer-province').animate({
        bottom: 0
    }, 200)

}

var plateNumHandler = function(pNum, cNo){
    if (!$.StringIsNullOrUndefined(cNo))
        return '';
    else
        return pNum;
}

var searchCarInfo = function (pNum, cNo, sId) {
    $('.loadingbox').show();
    
    pNum = plateNumHandler(pNum, cNo);

    //alert('pNum: ' + pNum + '; cNo:' + cNo);

    //查询车辆信息                
    $.ajax({
        type: "POST",
        url: "../../api/IPark/findParkInfo",
        data: JSON.stringify({ plateNum: pNum, cardNo: cNo, shopId: sId }),
        contentType: 'application/json',
        success: function (dataObj) {
            $('.loadingbox').hide();
            $('#pay').removeAttr("disabled");

            if (!$.StringIsNullOrUndefined(dataObj)) {
                if (dataObj.errcode === 0) {

                    $('#sp_time').html(dataObj.data.parkTime);
                    $('#sp_total').html(dataObj.data.chargeMoney)
                    $('#sp_discount').html(dataObj.data.discount);
                    $('#sp_real').html(dataObj.data.money);

                    $('#inp_inTime').val(dataObj.data.inTime);
                    $('#inp_outTime').val(dataObj.data.outTime);
                    $('#inp_parkTime').val(dataObj.data.parkTime);

                    var isClose = true;
                    if (!$.StringIsNullOrUndefined(cNo))
                        isClose = false;

                    //弹出层，显示价格明细
                    $('#paylayer').reveal($(this).data(), isClose);
                    $(".reveal-modal-bg").append("<div class='close'></div>");
                }
                else if (dataObj.errcode === 3102) {
                    iosOverlay({
                        text: "无需支付",
                        duration: 2e3,
                        icon: "../../Content/image/check.png"
                    });
                }
                else {
                    iosOverlay({
                        text: "没有找到车辆信息",
                        duration: 2e3,
                        icon: "../../Content/image/cross.png"
                    });
                }
            }
            else {
                console.warn("FindParkInfo api return data is null");
            }
        },
        error: function (error) {
            $('.loadingbox').hide();
            
            console.error(error);
        }
    });

}