'use strict';

const utils = require('../../src/utils');
const isProd = process.env.NODE_ENV === 'production';

module.exports = (req, res) => {
    const name = 'lk';

    res.render(name, {
        data: {
            global: JSON.stringify({})
        },
        res: {
            bundles: {
                styles: utils.formBundlePath(name, 'css', isProd),
                scripts: utils.formBundlePath(name, 'js', isProd)
            }
        },
        meta: {
            faviconPath: ''
        }
    });
};