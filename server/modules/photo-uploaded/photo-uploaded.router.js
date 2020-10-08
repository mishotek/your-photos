const express = require('express');
const photoUploadedService = require('./photo-uploaded.service');
const {isAuthorizedMiddleware} = require('../auth/auth.service');

const ROUTES = {
    uploadedPhotos: '/photo/uploaded-photos',
    deleteUploadedPhotos: '/photo/uploaded-photos/delete',
};

module.exports = () => {
    const photoUploadedRouter = express.Router();

    photoUploadedRouter.route(ROUTES.uploadedPhotos)
        .get(isAuthorizedMiddleware, photoUploadedService.getUploadedPhotos);

    photoUploadedRouter.route(ROUTES.deleteUploadedPhotos).post(
        isAuthorizedMiddleware,
        photoUploadedService.isOwnerOfPhotosMiddleWare,
        photoUploadedService.deleteUploadedPhotos,
    );

    return photoUploadedRouter;
};
