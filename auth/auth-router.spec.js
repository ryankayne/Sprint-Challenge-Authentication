const request = require('supertest');

const server = require('./auth-router.js');

const db = require('../database/dbConfig.js');

const Auth = require('./auth-model.js');



    describe('test environment', function() {
        it('should use the testing environment', function() {
            expect(process.env.DB_ENV).toBe('testing');
        })
    })
    
    describe('helpers', function() {

    describe('add()', function() {
        beforeEach(async () => {
        await db('users').truncate();
        })

        it('adds the new user to the db', async function() {
            await Auth.add({ username: 'Test1', password: 'test' })

            const auth = await db('users');

            expect(auth).toHaveLength(1);
        })
    })

    describe('Post /users', function () {
        it('responds with json', function () {
            request(server)
                .post('/register')
                .send({ username: 'Test2', password: 'test' })
                .expect('ContentType', /json/)
        });
    });

    describe('findBy()', function() {
        beforeEach(async () => {
        await db('users').truncate();
        })

        it('should find the user', async function() {
            original = await Auth.add({ username: 'Test3', password: 'test' });
            user = await Auth.findBy({ username: 'Test3' })
            expect(user).toBeDefined();
            expect(user).toMatchObject([original]);
        })

        it('should return the right user', async function() {
            original = await Auth.add({ username: 'Test4', password: 'test' });
            user = await Auth.findBy({ username: 'Test4' })
            expect(user).toMatchObject([original]);
        })
    })
})