/**
 * @description
 * @author  yinshi
 * @date 17/1/20.
 */
const Sign = require('../src/sign');
const expect = require('chai').expect;
const request = require('request');

const sign = new Sign('TEST', 'TEST');

describe('Test method GET', function () {
    it('Test params is null', function (done) {
        const test = sign.get('http://intb-open.ddyc.com:8090/sign/test');
        request.get(test.url, function (error, response, body) {
            const data = JSON.parse(body);

            expect(data.data.urlParam).to.equal(test.params);
            done();
        });
    });
    it('Test params is not null', function (done) {
        const test = sign.get('http://intb-open.ddyc.com:8090/sign/test?app=2&s=3');
        request.get(test.url, function (error, response, body) {
            const data = JSON.parse(body);
            expect(data.data.urlParam).to.equal(test.params);
            done();
        });
    });
    it('Test data is not null', function (done) {
        const test = sign.get('http://intb-open.ddyc.com:8090/sign/test', {
            s:2,
            d:3
        });
        request.get(test.url, function (error, response, body) {
            const data = JSON.parse(body);
            expect(data.data.urlParam).to.equal(test.params);
            done();
        });
    });
    it('Test data and params is both exist', function (done) {
        const test = sign.get('http://intb-open.ddyc.com:8090/sign/test?app=2&s=3', {
            data:'2',
            datd: 3,
            d:''
        });
        request.get(test.url, function (error, response, body) {
            const data = JSON.parse(body);
            expect(data.data.urlParam).to.equal(test.params);
            done();
        });
    });
});
describe('Test method Post', function () {
    it('query params is null', function (done) {
        const test = sign.post('http://intb-open.ddyc.com:8090/sign/test');
        request.post(test.url,{
            body: test.body
        }, function (error, response, body) {
            const data = JSON.parse(body);

            expect(data.data.urlParam).to.equal(test.params);
            done();
        });
    });
    it('the post body is not null', function (done) {
        const test = sign.post('http://intb-open.ddyc.com:8090/sign/test',{
            data:'body'
        });
        request.post(test.url,{
            headers:{
                'Content-Type':'application/json',
            },
            body: test.body
        }, function (error, response, body) {
            const data = JSON.parse(body);
            expect(data.data.urlParam).to.equal(test.params);
            done();
        });
    });
    it('the post body is  null', function (done) {
        const test = sign.post('http://intb-open.ddyc.com:8090/sign/test');
        request.post(test.url,{
            headers:{
              'Content-Type':'application/json',
            },
            body: test.body
        }, function (error, response, body) {
            const data = JSON.parse(body);

            expect(data.data.urlParam).to.equal(test.params);
            done();
        });
    });
    it('The body and params is both exist', function (done) {
        const test = sign.post('http://intb-open.ddyc.com:8090/sign/test?param=thisisaparam');
        request.post(test.url,{
            headers:{
                'Content-Type':'application/json',
            },
            body: test.body
        }, function (error, response, body) {
            const data = JSON.parse(body);
            expect(data.data.urlParam).to.equal(test.params);
            done();
        });
    });
});
