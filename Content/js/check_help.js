(function ($) {
    //检查空字符串
    $.StringIsNullOrUndefined = function (str) {
        if (str === '' || str === null || str === undefined) {
            return true;
        } else {
            return false;
        }
    }

    //用户名检查，英文字母开头，只含有英文字母、数字和下划线
    var un_regex = new RegExp('^[a-zA-Z][a-zA-Z0-9_]*$');
    $.CheckUserNameFormat = function (un) {
        return un_regex.test(un)
    }

    //密码检查，必须包含字母、数字、特称字符，至少8个字符，最多30个字符
    var pw_regex = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,30}');
    $.CheckPasswordFormat = function (pw) {
        return pw_regex.test(pw)
    }

    //录入车牌时，检查车牌规则
    $.CheckPlateNumRule = function (plateNum) {
        var reg1 = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼]{1}$/;
        var reg2 = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼]{1}[A-Z]{1}$/;
        var reg3 = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼]{1}[A-Z]{1}[A-Z0-9]{1}$/;
        var reg4 = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼]{1}[A-Z]{1}[A-Z0-9]{2}$/;
        var reg5 = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼]{1}[A-Z]{1}[A-Z0-9]{3}$/;
        var reg6 = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼]{1}[A-Z]{1}[A-Z0-9]{4}$/;
        var reg7 = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼]{1}[A-Z]{1}[A-Z0-9]{5}$/;
        var reg8 = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼]{1}[A-Z]{1}[A-Z0-9]{5}[A-Z0-9学港澳]{1}$/;

        if (reg1.test(plateNum) || reg2.test(plateNum) || reg3.test(plateNum) || reg4.test(plateNum) || reg5.test(plateNum) ||
            reg6.test(plateNum) || reg7.test(plateNum) || reg8.test(plateNum)) {
            return true;
        } else {
            return false;
        }
    }
})(jQuery)
