const config = require('../configs/config');
const app = require('../app');

var request = require('superagent');
var should = require('should');

var agent = request.agent();

describe('POST /GetChannelKey', function () {
  it('should get a channel key', function (done) {
    agent
      .post(config.host + config.GetChannelKey)
      .send({
        "channel": config.testOptions.channel,
        "password": config.testOptions.password
      })
      .set('Accept', 'application/json')
      .end(function (err, res) {
        should.not.exist(err);

        res.status.should.be.equal(200);
        //Key
        res.body.should.have.property('Key');
        res.body.should.have.property('Key').be.a.String();
        res.body.should.have.property('Key').be.have.lengthOf(36);

        //Result
        res.body.should.have.property('Result');
        res.body.should.have.property('Result').be.a.Boolean();

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