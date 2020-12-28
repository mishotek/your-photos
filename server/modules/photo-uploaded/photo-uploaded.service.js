const send = require('../../utils/send');
const fs = require('fs');
const Logger = require('../../utils/logger');
const Utils = require('../../utils/utils');
const httpCodes = require('../../configs/enums/http-codes');
const PhotoModel = require('../../db-models/photo.model');

exports.getUploadedPhotos = async (req, res) => {
    try {
        const user = req.user;
        const photoModels = await PhotoModel.find({ownerId: user._id}).exec();
        const photos = photoModels
            .sort((a, b) => b.createdAt - a.createdAt)
            .map(Utils.extractPublicPhotoData);
        send(res, httpCodes.OK, photos);
    } catch (e) {
        Logger.logError(e);
        send(res, httpCodes.InternalServerError);
    }
};

exports.isOwnerOfPhotosMiddleWare = async (req, res, next) => {
    try {
        const user = req.user;
        const ids = req.body['ids'];

        if (!Array.isArray(ids) || ids.length === 0) {
            return send(res, httpCodes.BadRequest, null,
                {message: 'Please send list of photo ids to remove'});
        }

        const photoModels = await PhotoModel.find({'_id': {$in: ids}});
        const isUploadedByUser = (photoModel) => user._id.equals(photoModel.ownerId);
        const hasNoOwnership = !photoModels.every(isUploadedByUser);

        if (hasNoOwnership) {
            return send(res, httpCodes.Forbidden, null,
                {message: 'You can\'t remove photos that aren\'t uploaded by you'});
        }

        req.photoModels = photoModels;
        next();
    } catch (e) {
        Logger.logError(e);
        send(res, httpCodes.InternalServerError);
    }
};

exports.deleteUploadedPhotos = async (req, res) => {
    try {
        for (const photoModel of req.photoModels) {
            await _removePhoto(photoModel);
        }
        send(res, httpCodes.OK, {}, null, 'Photos were removed');
    } catch (e) {
        Logger.logError(e);
        send(res, httpCodes.InternalServerError);
    }
};

const _removePhoto = async (photoModel) => {
    fs.unlinkSync(`./public/photos/${photoModel.fileName}`);
    await photoModel.remove();
};

