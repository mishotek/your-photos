/* eslint-disable max-len */
const API_ROOT = 'api';
const API_VERSION = '1';
const API_PREFIX = `/${API_ROOT}/v${API_VERSION}`;

module.exports = (app) => {
    app.use(API_PREFIX, require('./modules/translation/translation.router')());
    app.use(API_PREFIX, require('./modules/auth/auth.router')());
    app.use(API_PREFIX, require('./modules/photo-upload/photo-upload.router')());
    app.use(API_PREFIX, require('./modules/photo-uploaded/photo-uploaded.router')());
};
