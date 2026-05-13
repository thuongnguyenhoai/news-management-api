export const validateNews = (req, res, next) => {
    const { title } = req.body;
    if(!title || title.length <= 10) {
        return res.status(400).json({message: "title không được để trống và phải nhiều hơn 10 kí tự"});
    };
    next();
};
