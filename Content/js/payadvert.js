$(function(){

if($('#imgBox').length==0){
	$('body').append('<div class="imgBox" style="position:fixed;bottom:0;left:0; width:100%;">\
		     <a id="a1" href="">\
		        <img style="width: 100%;height: 100%;" id="mImg" src="" alt="">\
		     </ a> \
    </div>');
}else{
$('#imgBox').html(`<a id="a1" target="_self" href="">
<img style="width: 100%;height: 100%;" id="mImg" src="" alt="">
</ a> `);
}
// var data ={ 参数1 : '1123', 参数2 :"456" };
$.ajax({
type:"post",
url:"http://paytest.52fengfu.com/qrcode/adtest",
// data:{} ,
dataType:"json",// 跨域json请求
jsonpCallback: 'successCallback',
// 跨域请求的参数名，默认是callback
success : function(res){ // 请求过来的数据参数："widths":"100px","heights":"200px","url"："","hrefs":""
	$('#mImg').prop('src',res.advertUrl);
	$('#a1').prop('href',res.jumpUrl);
	//alert("success")
},
error:function(XMLHttpRequest, textStatus, errorThrown) {
alert(XMLHttpRequest.status);
alert(XMLHttpRequest.readyState);
alert(textStatus);
}
//  error:function(){
//      $('#mImg').prop('src','http://183.232.43.134:9092//Public//slideImg//20180428//1524897355_80320.jpg');
//          $('#a1').prop('href','http://183.232.43.134:9092//Public//slideImg//20180514//1526266094_28987.jpg');
// }
});
})