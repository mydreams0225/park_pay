function callpay(paramJsonObj) {
	//alert(paramJsonObj.tradeNo);
	if(paramJsonObj.tradeNo!= "") {
		ready(function() {
			AlipayJSBridge.call("tradePay", {
				tradeNO: paramJsonObj.tradeNo
			}, function(data) {
				alert("data.resultCode-->"+data.resultCode);
				window.location.href = www.baidu.com;
				if("9000" == data.resultCode) {
					window.location.href = www.baidu.com;
				} else {
					AlipayJSBridge.call('closeWebview');
				}
			});
		})
	} else {
		alert(json.message);
		AlipayJSBridge.call('closeWebview');
	}
}

/**
调起支付宝收银台
*/
function ready(callback) {
if(window.AlipayJSBridge) {
	callback && callback();
} else {
	document.addEventListener('AlipayJSBridgeReady', callback, false);
}
}