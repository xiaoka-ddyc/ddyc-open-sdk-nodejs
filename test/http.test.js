/**
 * @description
 * @author  yinshi
 * @date 17/2/9.
 */

const http = require('../src/http');
const expect = require('chai').expect;

describe('Test the http method', function () {
    it('the get method ', function (done) {
        http.openGet('sign/test', {data:'data'}).then(function (body) {
            expect(body.success).to.equal(true);
            done();
        })
    });
    it('the post method', function (done) {
        http.openPost('sign/test', {data:'data'}).then(function (body) {
            expect(body.success).to.equal(true);
            done();
        })
    });
})