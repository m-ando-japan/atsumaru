const assert = require('chai').assert;

const sut = require('../index.js');

describe('Function Index Tests', function() {
    it('API path', () => {
        assert.sameMembers(Object.keys(sut), ['event', 'member', 'history']);
    });
});