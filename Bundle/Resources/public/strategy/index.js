/**
 * 得到当前url
 *
 * @returns {string}
 */
function getSelfUrl() {
    return window.location.href;
}

/**
 * url参数替换
 *
 *
 * @param url
 * @param param
 * @param value
 * @returns {*}
 */
function urlParamWrite(url, param, value) {
    if(url.indexOf('?'+ param) === -1 && url.indexOf('&'+ param) === -1){
        if(url.indexOf('?') === -1){
            return url + '?' + param + '=' + value;
        }else{
            return url + '&' + param + '=' + value;
        }
    }else {
        if(url.indexOf('?'+ param) === -1){
            return url.replace(eval('/([?&]+' + param + '=)([^&]*)/gi'), '&' + param + '=' + value);
        }else{
            return url.replace(eval('/([?&]+' + param + '=)([^&]*)/gi'), '?' + param + '=' + value);
        }
    }
}

function splicingGetParamsToUrl(url, params) {
    $.each(params, function (key, val) {
        url = urlParamWrite(url, key, val);
    });

    return url;
}


/**
 * 响应处理
 *
 * @param that
 * @param result
 * @param go_url
 * @param resultPreprocessFunction
 */
function resultPreprocess(that, result, go_url, resultPreprocessFunction)
{
    if(result.code != 0) {
        that.$message.error(result.msg);
    }else{
        if(result.msg != '') {
            that.$message.success(result.msg);
        }
    }
    
    if(result.hasOwnProperty('data')){
        if(result['data'].hasOwnProperty('go_url')){
            goUrlPreprocess(result.data.go_url);return;
        }
    }

    if(go_url != undefined && result.code == 0){
        goUrlPreprocess(go_url);return;
    }

    if(resultPreprocessFunction != undefined && resultPreprocessFunction != ''){
        resultPreprocessFunction(that, result);
    }
}

function goUrlPreprocess(go_url) {

    //如果是数组,则在新窗口打开, gp_url[1]等同于target="_blank
    if(go_url instanceof Array){
        window.open(urlPreprocess(go_url[0]));
    }else{
        if(go_url == ''){
            window.location.reload();
        }else {
            window.location.href =  urlPreprocess(go_url);
        }
    }
}

/**
 *
 * url 处理
 *
 * @param url
 * @returns {*}
 */
function urlPreprocess(url) {
    var reg = new RegExp("amp;","g");
    return url.replace(reg, '');
}

/**
 * 得到多行文本
 *
 * 定义使用方式 https://www.cnblogs.com/starlet/archive/2010/05/24/1742572.html
 *
 * @returns {String}
 */
Function.prototype.getMultiLine = function() {
    var lines = new String(this);
    lines = lines.substring(lines.indexOf("/*") + 3, lines.lastIndexOf("*/"));
    return lines;
}
