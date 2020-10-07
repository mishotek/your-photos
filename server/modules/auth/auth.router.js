const express = require('express');
const authService = require('./auth.service');

const ROUTES = {
    register: '/auth/register',
};

module.exports = () => {
    const authRouter = express.Router();

    authRouter.route(ROUTES.register)
        .post(authService.register);

    return authRouter;
};
