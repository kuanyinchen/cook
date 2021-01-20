const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.should();

chai.use(chaiHttp);

describe('recipes API all', () => {
    it('it should GET status 200', (done) => {
        chai.request(app)
            .get('/api/1.0/recipes/all')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
    it('it should GET type object', (done) => {
        chai.request(app)
            .get('/api/1.0/recipes/all')
            .end((err, res) => {
                res.should.be.a('object');
                done();
            });
    });
});
