const express = require('express');
const photoUploadService = require('./photo-upload.service');
const {isAuthorizedMiddleware} = require('../auth/auth.service');

const ROUTES = {
    upload: '/photo/upload',
};

module.exports = () => {
    const photoUploadRouter = express.Router();

    photoUploadRouter.route(ROUTES.upload)
        .post(isAuthorizedMiddleware, photoUploadService.upload);

    return photoUploadRouter;
};
