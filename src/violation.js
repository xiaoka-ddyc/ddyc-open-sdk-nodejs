/**
 * @description
 * @author  yinshi
 * @date 17/1/20.
 */

const http = require('./http');

const violation = {
    /**
     * 违章查询条件
     * -|接口说明：
     * -|获取当前支持哪些城市及对应城市的查询条件，此接口返回的城市都经过典典严格筛选及验证。
     * @return {Promise}
     */
    condition(){
        return http.openGet('violation/condition/all/1.0');
    },
    /**
     * 违章查询条件【带省份】
     * -|接口说明：
     * -|获取当前支持城市及对应城市的查询条件，支撑城市典典养车支持的并且对合作方开放的城市，开放哪些城市合作方可以和典典商务人员确认
     * @return {Promise}
     */
    conditionAll(){
        return http.openGet('violation/condition/all/1.0');
    },
    /**
     * 违章查询
     * -|接口说明：
     * -|关于查询城市，指查询方希望以哪个城市的查询结果为主，因为各地法规不一致以及接口不同步问题，不同城市返回的数据不完全一致。
     * @param options {Object} 查询违章参数
     * @param options.plateNumber {String} 是 车牌号
     * @param options.vin {String} 是 车架号，长度要求参考各城市要求，从【违章查询条件】接口获取
     * @param options.engineNo {String} 否 发动机号，长度要求参考各城市要求，从【违章查询条件】接口获取
     * @param options.phone {String} 否 	手机号码，根据合作类型可能会要求必填，注意：一个手机号最多查3辆车！浙江车牌手机号必填
     * @param options.city {String} 否 	查询哪个城市的数据，如果不传则取车牌所在城市数据，传了不会再取车牌所在地数据
     * @param options.needFee {String} 否 是否需要返回服务费用，默认false,需要返回服务费则传入true；但是合作类型如果只是查询，则传入true也不会返回
     * @return {Promise}
     */
    query(options){
        return http.openPost('violation/query/1.0', options);
    },
    assignToken(options){
        return http.openPost('violation/assign/token', options);
    },
    createOrder(options){
        return http.openPost('violation/create/order', options);
    },
    orderStatus(token, orderId){
        return http.openGet('violation/order/status', {token, orderId});
    },
    orderDetail(token, orderId){
        return http.openGet('violation/order/detail', {token, orderId});
    },
};

module.exports = violation;