module.exports = async (
    res,
    status,
    data = undefined,
    error = undefined,
    message = undefined,
) => {
    await res.status(status).json({
        error,
        data,
        message,
    });
};
