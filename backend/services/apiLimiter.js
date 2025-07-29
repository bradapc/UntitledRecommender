var Bottleneck = require('bottleneck');

const limiter = new Bottleneck({
    maxConcurrent: 10,
    minTime: 22
});

module.exports = {limiter};