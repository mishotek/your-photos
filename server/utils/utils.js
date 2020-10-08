const SUPPORTED_LANGUAGES = ['en', 'ka'];
const DEFAULT_LANGUAGE = 'en';

exports.getRequestLanguage = (req) => {
    const contentLanguage = req.header('X-Language');
    const languageSupported = SUPPORTED_LANGUAGES.includes(contentLanguage);
    return languageSupported ? contentLanguage : DEFAULT_LANGUAGE;
};

exports.extractFileExtension = (fileName) => {
    return fileName.match(/\.[0-9a-z]+$/i)[0];
};

exports.extractPublicPhotoData = (photo) => {
    return {
        fileName: photo.fileName,
        name: photo.name,
        url: photo.url,
    };
};