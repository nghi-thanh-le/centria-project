module.exports = function (res, status, content) {
    res.status(status).json(content);
};
