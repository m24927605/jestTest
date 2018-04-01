const config = require('../configs/config');
const app = require('../app');
const colors = require('colors');
var prettyjson = require('prettyjson');
const jsonToTable = require('json-to-table');

const request = require('superagent');
const should = require('should');

const agent = request.agent();

describe('POST /GetChannelKey', function () {
    let key = '';
    it('should get a channel key', function (done) {
        let postObj = {
            channel: config.testOptions.channel,
            password: config.testOptions.password
        }
        console.log(colors.green('should get a channel key:'));
        console.log(prettyjson.render(postObj, {
            keysColor: 'green',
            dashColor: 'magenta',
            stringColor: 'white'
          }));
        agent
            .post(config.host + config.GetChannelKey)
            .send(postObj)
            .set('Accept', 'application/json')
            .end(function (err, res) {
                should.not.exist(err);
                res.status.should.be.equal(200);
                key = res.body.Key;
                done();
            })
    })

    it('Check Account in one step', function (done) {
        let postObj = {
            channel: config.testOptions.channel,
            loginID: config.testOptions.loginID,
            password: config.testOptions.userPassword,
            key: key,
            ip: config.testOptions.ip,
            version: config.testOptions.version,
            language: config.testOptions.language,
        }
        console.log(colors.green('Check Account in one step:'));
        console.log(prettyjson.render(postObj, {
            keysColor: 'green',
            dashColor: 'magenta',
            stringColor: 'white'
          }));
        agent
            .post(config.host + config.CheckAccountOneStep)
            .send(postObj)
            .set('Accept', 'application/json')
            .end(function (err, res) {
                should.not.exist(err);

                //http
                res.status.should.be.equal(200);

                //Result
                res.body.should.have.property('Result');
                res.body.should.have.property('Result').be.a.Boolean();
                res.body.should.have.property('Result').equal(true);

                //ResultCode
                res.body.should.have.property('ResultCode');
                res.body.should.have.property('ResultCode').be.a.String();
                res.body.should.have.property('ResultCode').be.have.lengthOf(4);

                //ResultMessage
                res.body.should.have.property('ResultMessage');
                res.body.should.have.property('ResultMessage').be.a.String();

                //Token
                res.body.should.have.property('Token');
                res.body.should.have.property('Token').be.a.String();
                res.body.should.have.property('Result').not.equal('');
                done();
            })
    })
})

describe('Dirty Test POST /GetChannelKey', function () {
    const wrongParameters = [0, "", NaN, undefined, null, false];
    wrongParameters.forEach(function (element) {
        it('should response the error', function (done) {
            agent
                .post(config.host + config.GetChannelKey)
                .send({
                    "channel": `${element}`,
                    "password": `${element}`
                })
                .set('Accept', 'application/json')
                .end(function (err, res) {
                    should.not.exist(err);

                    res.status.should.be.equal(200);
                    //Key
                    res.body.should.have.property('Key');
                    res.body.should.have.property('Key').not.be.have.lengthOf(36);

                    //Result
                    res.body.should.have.property('Result');
                    res.body.should.have.property('Result').be.a.Boolean();
                    res.body.should.have.property('Result').equal(false);

                    //ResultCode
                    res.body.should.have.property('ResultCode');
                    res.body.should.have.property('ResultCode').be.a.String();
                    res.body.should.have.property('ResultCode').be.have.lengthOf(4);

                    //ResultMessage
                    res.body.should.have.property('ResultMessage');
                    res.body.should.have.property('ResultMessage').be.a.String();
                    done();
                })
        })
    });
})