const Logger = require('../../utils/logger');
const httpCodes = require('../../configs/enums/http-codes');
const Utils = require('../../utils/utils');
const send = require('../../utils/send');

const _getDictionary = (language) => {
    return require(`../../configs/dictionaries/${language}.dictionary.json`);
};

/**
 * @desc Get dictionary as JSON, language is selected according to
 * the X-Language header
 * @route GET /dictionary
 * @access Public
 */
module.exports.getDictionary = async (req, res) => {
    try {
        const language = Utils.getRequestLanguage(req);
        send(res, httpCodes.OK, _getDictionary(language));
    } catch (e) {
        Logger.logError(e);
        send(res, httpCodes.InternalServerError);
    }
};
