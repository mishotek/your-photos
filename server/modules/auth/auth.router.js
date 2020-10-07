const express = require('express');
const authService = require('./auth.service');

const ROUTES = {
    register: '/auth/register',
    login: '/auth/login',
};

module.exports = () => {
    const authRouter = express.Router();

    authRouter.route(ROUTES.register)
        .post(authService.register);

    authRouter.route(ROUTES.login)
        .post(authService.login);

    return authRouter;
};
