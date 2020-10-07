const API_ROOT = 'api';
const API_VERSION = '1';
const API_PREFIX = `/${API_ROOT}/v${API_VERSION}`;

const translationRouter = require('./modules/translation/translation.router')();

module.exports = (app) => {
    app.use(API_PREFIX, translationRouter);
};
