const responseMiddleware = (_, res, next) => {
    res.success = (data = {}) => {
        return res.status(200).json({ success: true, data });
    };

    res.fail = (message = "Failure", statusCode = 400) => {
        return res.status(statusCode).json({ success: false, message });
    };

    next();
}

module.exports = responseMiddleware;