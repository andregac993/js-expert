const {describe, it, after, before} = require('mocha')

const supertest = require('supertest')
const assert = require('assert')

describe("API Suite test", () => {
    let app
    before((done) => {
        app = require('./api.js')
        app.once('listening', done)
    })
    after(done => app.close(done))

    describe('/contact:get', () => {
        it('should request the contact route and return HTTP Status 200', async () => {
            const response = await supertest(app)
                .get('/contact')
                .expect(200)

            assert.equal(response.text, 'contact us page')
        })
    })

    describe('/login:post', () => {
        it('should request the contact page and return HTTP Status 200', async () => {
            const response = await supertest(app)
                .post('/login')
                .send({username: 'andré carvalho', password: '123' })
                .expect(200)

            assert.equal(response.text, 'Log in success!')
        })
        it('should request the contact page and return HTTP Status 401', async () => {
            const response = await supertest(app)
                .post('/login')
                .send({username: 'xuxa', password: '123' })
                .expect(401)

            assert.equal(response.text, 'Log in failed!')
        })
    })

    describe('/hi:get - 404', () => {
        it('should request and existing page and return HTTP Status 404', async () => {
            const response = await supertest(app)
                .get('/hi')
                .expect(404)

            assert.equal(response.text, 'not found!')
        })
    })
})
