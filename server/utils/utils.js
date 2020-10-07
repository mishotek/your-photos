const SUPPORTED_LANGUAGES = ['en', 'ka'];
const DEFAULT_LANGUAGE = 'en';

module.exports.getRequestLanguage = (req) => {
    const contentLanguage = req.header('X-Language');
    const languageSupported = SUPPORTED_LANGUAGES.includes(contentLanguage);
    return languageSupported ? contentLanguage : DEFAULT_LANGUAGE;
};

module.exports.extractPublicUserData = (user) => {
    return {
        id: user._id,
        username: user.username,
    };
};

module.exports.extractFileExtension = (fileName) => {
    return fileName.match(/\.[0-9a-z]+$/i)[0];
};
