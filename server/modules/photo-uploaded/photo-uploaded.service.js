const send = require('../../utils/send');
const Logger = require('../../utils/logger');
const Utils = require('../../utils/utils');
const httpCodes = require('../../configs/enums/http-codes');
const PhotoModel = require('../../db-models/photo.model');

exports.getUploadedPhotos = async (req, res) => {
    try {
        const user = req.user;
        const photoModels = await PhotoModel.find({ownerId: user._id}).exec();
        const photos = photoModels.map(Utils.extractPublicPhotoData);
        send(res, httpCodes.OK, photos);
    } catch (e) {
        Logger.logError(e);
        send(res, httpCodes.InternalServerError);
    }
};
