const Fibonacci = require('./fibonacci.js')

const {createSandbox} = require('sinon')
const assert = require('assert')
const sinon = createSandbox();




;(async () => {
    {
        const fibonacci = new Fibonacci();
        const spy = sinon.spy(
            fibonacci,
            fibonacci.execute.name
        )

        for (const sequencia of fibonacci.execute(3)) {
        }
        const expectedCallCount = 4
        assert.strictEqual(spy.callCount, expectedCallCount)
    }

    {
        const fibonacci = new Fibonacci();
        const spy = sinon.spy(
            fibonacci,
            fibonacci.execute.name
        )

        const results = [...fibonacci.execute(5)]

        const expectedCallCount = 6
        assert.strictEqual(spy.callCount, expectedCallCount)
        const {args} = spy.getCall(2)
        const expectedParams = [3, 1, 2]
        assert.deepStrictEqual(args, expectedParams, "os arrays não são iguais")

        const expectedResults = [0, 1, 1, 2, 3]
        assert.deepStrictEqual(results, expectedResults, "os arrays não são iguais")
    }
})()