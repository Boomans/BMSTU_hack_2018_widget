'use strict';
const utils = require('../../src/utils');
const isProd = process.env.NODE_ENV === 'production';
const fs = require('fs');

module.exports = (req, res) => {
    const name = 'widget';

    res.render(name, {
        data: {
            code: fs.readFileSync(__dirname + `/../../../build/client/${name}.bundle.js`),
            widget: JSON.stringify({
                containerId: req.query.containerId,
                cookieKey: req.query.cookieKey
            })
        }
    });
};