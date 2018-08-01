
	
	$(function(){
		$(".payinfo").slideDown();
		var $total = $("#total");
		// 大写金额
		var upperCaseMoney = $('.upper-case span');
		$("#total").focus(function(){
			$(".payinfo").slideDown();
       		document.activeElement.blur();
		});
		$(".paynum").each(function(){
			$(this).click(function(){
				if(($total.text()).indexOf(".") != -1 && ($total.text()).substring(($total.text()).indexOf(".") + 1, ($total.text()).length).length == 2){
					return;
				}
				if($.trim($total.text()) == "0"){
					return;
				}
				if (parseInt($total.text()) > 10000 && $total.text().indexOf(".") == -1) {
					return;
				}
				$('.pay').removeClass('pay-disabled').find('a').attr('href','pay-result.html');
				$total.text($total.text() + $(this).text());
				upperCaseMoney.text(digitUppercase($total.text()));
			});
		});
		
		$("#pay-return").click(function(){
			$total.text(($total.text()).substring(0, ($total.text()).length - 1));
			upperCaseMoney.text(digitUppercase($total.text()));
			if (!$total.text()) {
				upperCaseMoney.text('');
				$('.pay').addClass('pay-disabled').find('a').attr('href', 'javascript:return false;');
			}
		});
		
		$("#pay-zero").click(function(){
			if(($total.text()).indexOf(".") != -1 && ($total.text()).substring(($total.text()).indexOf(".") + 1, ($total.text()).length).length == 2){
				return;
			}
			if($.trim($total.text()) == "0"){
				return;
			}
			if (parseInt($total.text()) > 10000 && $total.text().indexOf(".") == -1) {
				return;
			}
			$total.text($total.text() + $(this).text());
		});
		
		$("#pay-float").click(function(){
			if($.trim($total.text()) == ""){
				return;
			}
		
			if(($total.text()).indexOf(".") != -1){
				return;
			}
			
			if(($total.text()).indexOf(".") != -1){
				return;
			}
			
			$total.text($total.text() + $(this).text());
		});
		if (!$total.text()) {
			$('.pay').addClass('pay-disabled');
		}
	});

<!--自适应布局-->

	(function () {
		var designW = 750;  //设计稿宽
		var font_rate = 100;
		//适配
		document.getElementsByTagName("html")[0].style.fontSize = document.body.offsetWidth / designW * font_rate + "px";
		document.getElementsByTagName("body")[0].style.fontSize = document.body.offsetWidth / designW * font_rate + "px";
		//监测窗口大小变化
		window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function () {
			document.getElementsByTagName("html")[0].style.fontSize = document.body.offsetWidth / designW * font_rate + "px";
			document.getElementsByTagName("body")[0].style.fontSize = document.body.offsetWidth / designW * font_rate + "px";
		}, false);
	})();


