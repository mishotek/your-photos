const send = require('../../utils/send');
const Logger = require('../../utils/logger');
const Utils = require('../../utils/utils');
const httpCodes = require('../../configs/enums/http-codes');
const PhotoModel = require('../../db-models/photo.model');

exports.upload = async (req, res) => {
    try {
        const photos = req.files && req.files['photos'];
        if (!Array.isArray(photos)) {
            return send(res, httpCodes.BadRequest, null,
                {message: 'No image files were received'});
        }

        for (const photo of photos) {
            await _storePhoto(req.user, photo);
        }

        send(res, httpCodes.Created, null, null, 'Photos uploaded');
    } catch (e) {
        Logger.logError(e);
        send(res, httpCodes.InternalServerError);
    }
};

const _storePhoto = async (user, photo) => {
    // eslint-disable-next-line max-len
    const storedFileName = `${photo.md5}${Utils.extractFileExtension(photo.name)}`;
    await photo.mv(`./public/photos/${storedFileName}`);
    const photoModel = new PhotoModel({
        ownerId: user._id,
        accessibleTo: [user._id],
        fileName: storedFileName,
        name: photo.name,
        url: `${process.env.DOMAIN}/public/photos/${storedFileName}`,
    });
    await photoModel.save();
};
