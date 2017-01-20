/**
 * @description 请求封装
 * @author  yinshi
 * @date 17/1/20.
 */
const config = require('./config');
const Sign = require('./sign');
const request = require('request');

const sign = new Sign(config.appkey, config.appsecret);
function httpOpen(options = {}) {
    const opts = {
        headers:{
            'Content-Type': 'application/json;utf-8'
        }
    };
    sign.extend(opts, options);
    return new Promise(function (resolve, reject) {
        request(opts, function (error, response, body) {
            if(error){
                reject(error);
                return
            }
            if(response.statusCode >=200 && response.statusCode< 300){
                try{
                    const data = JSON.parse(body);
                    resolve(data);
                }catch (e){
                    reject(e);
                }
            }
            reject(new Error(body));
        })
    })
}

exports.openPost = function openPost(path, data) {
    const signObj = sign.post(path, data);
    const url = config.host + signObj.url;
    return httpOpen({
        url,
        method: 'POST',
        body: signObj.body
    })
}

exports.openGet = function openGet(path, data) {
    const signObj = sign.get(path, data);
    const url = config.host + signObj.url;
    return httpOpen({
        url,
        method: 'GET'
    })
}