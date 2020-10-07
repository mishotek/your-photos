const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const logger = require('../../utils/logger');
const httpCodes = require('../../configs/enums/http-codes');
const authCodes = require('../../configs/enums/auth-codes');
const send = require('../../utils/send');
const utils = require('../../utils/utils');
const UserModel = require('../../db-models/user.model');

/**
 * @desc Register user
 * @route POST /auth/register
 * @access Public
 */
module.exports.register = async (req, res) => {
    try {
        const {username, password} = req.body;

        const error = await _validateCredentials(username, password);
        if (error) {
            return send(res, httpCodes.BadRequest, null, error);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new UserModel({username, password: hashedPassword});
        await user.save();

        send(res, httpCodes.OK, utils.extractPublicUserData(user));
    } catch (e) {
        logger.logError(e);
        send(res, httpCodes.InternalServerError);
    }
};

/**
 * @desc Login user
 * @route POST /auth/login
 * @access Public
 */
module.exports.login = async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await _authenticate(username, password);

        if (!user) {
            return send(res, httpCodes.Forbidden,
                {message: 'Invalid username or password'});
        }

        const accessToken = jwt.sign(
            {_id: user._id},
            process.env.JWT_ACCESS_TOKEN_SECRET,
        );
        send(res, httpCodes.OK, {
            accessToken,
            user: utils.extractPublicUserData(user),
        });
    } catch (e) {
        logger.logError(e);
        send(res, httpCodes.InternalServerError);
    }
};

const _validateCredentials = async (username, password) => {
    if (!_passwordValid(password)) {
        return {
            message: 'Password doesn\'t meet the requirements',
            code: authCodes.InvalidPassword,
        };
    }

    if (!_usernameValid(username)) {
        return {
            message: 'Username doesn\'t meet the requirements',
            code: authCodes.InvalidUsername,
        };
    }

    if (await _usernameTaken(username)) {
        return {
            message: 'This username is already taken',
            code: authCodes.UsernameTaken,
        };
    }

    return null;
};

const _authenticate = async (username, password) => {
    const user = await _getUserByUsername(username);
    if (!user) {
        return null;
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (passwordMatches) {
        return user;
    }

    return null;
};

const _passwordValid = (password) => {
    return typeof password === 'string' &&
        RegExp('^[A-Za-z0-9]{6,12}$').test(password);
};

const _usernameValid = (username) => {
    return typeof username === 'string' &&
        RegExp('^[A-Za-z0-9]{6,12}$').test(username);
};

const _usernameTaken = async (username) => {
    return !!(await _getUserByUsername(username));
};

const _getUserByUsername = async (username) => {
    return await UserModel.findOne({username}).exec();
};

