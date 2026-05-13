export const errorHandler = (err, req, res, next) => {
    console.error(err);

    const statusCode = err.status || 500;

    res.status(statusCode).json({
        status: statusCode,
        message: err.message || "Lỗi hệ thống nội bộ",
    });
};