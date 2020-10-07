const express = require('express');
const translationService = require('./translation.service');
const authService = require('../auth/auth.service');

const ROUTES = {
    dictionary: '/dictionary',
};

module.exports = () => {
    const translationRouter = express.Router();

    translationRouter.route(ROUTES.dictionary)
        .get(
            authService.isAuthorizedMiddleware,
            translationService.getDictionary,
        );

    return translationRouter;
};
