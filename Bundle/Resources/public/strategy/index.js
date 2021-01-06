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
        return url.replace(eval('/(' + param + '=)([^&]*)/gi'), param + '=' + value);
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
        that.$message.success(result.msg);
    }

    if(go_url != undefined && result.code == 0){
        if(go_url == ''){
            window.location.reload();
        }else {
            window.location.href = urlPreprocess(go_url);
        }
        return;
    }


    if(result.hasOwnProperty('data')){
        if(result['data'].hasOwnProperty('go_url')){
            window.location.href = urlPreprocess(result.data.go_url);return;
        }
    }

    if(resultPreprocessFunction){
        resultPreprocessFunction(that, result);
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