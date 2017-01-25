/**
 * @description 到店服务
 * @author  yinshi
 * @date 17/1/25.
 */

const http = require('./http');

const offline = {
    /**
     *商家列表（全国）
     *-|此接口在正式环境仅限于22:00-06:00访问，且设有每日访问次数限制，请勿频繁请求。
     *@param pageIndex {Number} 分页索引，从1开始递增，直到等于pageLength为止
     *@param pageSize {Number} 每页记录数，仅限测试环境测试使用，正式环境服务端统一设置
     */
    shopGetdata(pageIndex, pageSize){
        return http.openGet('offline/shop/getdata', {pageIndex, pageSize});
    },
    /**
     * 附近商家（距离排序）
     * -|此接口设有每日访问次数限制，具体以协议为准。
     * -|此接口根据请求经纬度按距离从近到远排序，采用高德坐标系，若使用GPS坐标请自行转换。
     * @param param {Object} 请求参数
     * @param param.pageIndex {Number} 分页索引，从1开始递增，直到等于pageLength为止
     * @param param.pageSize {Number} 每页记录数，最大值50
     * @param param.lat {Number} 经度
     * @param param.lng {Number} 纬度
     * @param param.distance {Number} 搜索范围，单位KM，默认50，最大值50
     */
    nearbyShopList(param){
        return http.openGet('offline/nearby/shop/list', param);
    },
    /**
     *
     * @param data
     */
    createOrder(data){
        return http.openPost('offline/create/order', data);
    },
    /**
     *
     * @param outOrderNo
     * @param consumerCode
     */
    cancelOrder(outOrderNo, consumerCode){
        return http.openGet('offline/cancel/order', {outOrderNo, consumerCode});
    }
};