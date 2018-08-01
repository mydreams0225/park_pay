(function ($) {
    //打乱密码字符串
    $.gpsetPassword = function(username, password) {
        var pwArr;
        var arrLong = 0;

        if (username.length > password.length)
            arrLong = username.length * 2;
        else
            arrLong = password.length * 2;

        pwArr = new Array(arrLong);

        for (i = 0; i < arrLong / 2; i++) {
            if (i < username.length) {
                pwArr[i * 2] = username[i];
            }
            else {
                pwArr[i * 2] = i;
            }
        }

        for (i = 0; i < arrLong / 2; i++) {
            if (i < password.length) {
                pwArr[i * 2 + 1] = password[i];
            }
            else {
                pwArr[i * 2 + 1] = i;
            }
        }

        var pw = pwArr.toString().replace(/,/g, "");

        return pw;
    }

    //获取Url（不包括参数）
    $.getUrlNonContainParam = function () {
        var test = window.location.href;

        if (test.indexOf('?'))
            return test.substring(0, test.indexOf('?'));

        if (test.indexOf('#'))
            return test.substring(0, test.indexOf("#"));

        return test;
    }

    //获取url中的参数
    $.getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }
})(jQuery);