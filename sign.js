/**
 * @description
 * @author  yinshi
 * @date 17/1/20.
 */
const crypto = require('crypto');

class Sign{
    constructor(appkey, appsecret){
        this.appkey = appkey;
        this.appsecret = appsecret;
    }
    serialize(paramsStr){
       return paramsStr.split('&').reduce((param, str)=>{
            const arr = str.split('=');
            if(arr[1]){
               param[arr[0]] =  arr[1];
            }
            return param;
        }, {})
    }
    getParams(href){
        const paramsObj = this.serialize(href.split('?')[1] || '') || {};
        paramsObj.app_key = this.appkey;
        paramsObj.timestamp = new Date().getTime();
        return paramsObj;
    }
    param(obj){
       return Object.keys(obj).sort()
           .map((key)=>[key, obj[key]].join('=')).join('&');
    }
    urlParam(params){
        return Object.keys(params).sort()
            .map((k)=>[k, params[k]].join('=')).join('&')
    }
    signStr(params, requestBody = ''){
        return this.appkey+this.appsecret+this.urlParam(params)+ requestBody;
    }
    reverse(str){
        return str.split('').reverse().join('');
    }
    signMd5(str){
        const md5sum = crypto.createHash('md5');
        md5sum.update(str, 'utf-8');
        return md5sum.digest('hex');
    }
    createSign(params, requestBody){
        const signStr = this.signStr(params, requestBody);
        return this.signMd5(this.reverse(signStr)).toUpperCase();
    }
    extend(obj1,obj2){
        if(obj2){
            Object.keys(obj2).forEach(k=>{
                obj1[k] = obj2[k];
            });
        }
        return obj1;
    }
    post(url, data){
        const path = url.split('?')[0];
        const params = this.getParams(url);
        const requestBody = typeof data === 'object' ?JSON.stringify(data): '';
        params.sign = this.createSign(params, requestBody);
        const paramStr = this.param(params);
        return [path, paramStr].join('?');
    }
    get(url, data){
        const path = url.split('?')[0];
        const params = this.extend(this.getParams(url), data);
        const requestBody = '';
        params.sign = this.createSign(params, requestBody);
        const paramStr = this.param(params);
        return [path, paramStr].join('?');
    }

}

const sign = new Sign('TEST', 'TEST');

const test = sign.get('http://intb-open.ddyc.com:8090/sign/test', {
    data:121
});
const post = sign.post('http://intb-open.ddyc.com:8090/sign/test', {
    data:''
});
console.log(post)