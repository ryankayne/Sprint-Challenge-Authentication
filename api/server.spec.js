const request = require('supertest');

const server = require('./server.js');

describe('server', function() {
    it('runs the test', function() {
        expect(true).toBe(true);
    })


    describe('GET /', function() {
        it('should return 200', () => {
            return request(server).get('/')
                .then(res => {
                expect(res.status).toBe(200);
            })
        })

        it('should return JSON', function() {
            return request(server).get('/')
                .then(res => {
                expect(res.type).toMatch(/json/i);
            })
        })
    })
})
