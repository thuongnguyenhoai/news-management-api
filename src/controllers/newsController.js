import { readNewsFile, writeNewsFile } from "../services/newsService.js";

//lấy danh sách tin tức
export const getAllNews = async (req, res, next) => {
    try {
        const listNews = await readNewsFile();
        return res.status(200).json(listNews);
    } catch (error) {
        next(error);
    }
};

//hiển thị dánh sách tin tức với ejs
export const renderNewsView = async (req, res, next) => {
    try {
        const listNews = await readNewsFile();
        return res.render("news", {listNews});
    } catch (error) {
        next(error);
    }
};

//tìm kiếm tin tức theo title hoặc category
export const searchNews = async (req, res, next) => {
    try {
        const { title, category } = req.query;
        const listNews = await readNewsFile();
        let filterNews = listNews;
        if(title) {
            filterNews = listNews.filter(f => 
                f.title.toLowerCase().includes(title.toLowerCase())
            )
        };
        if(category) {
            filterNews = listNews.filter(f => 
                f.category.toLowerCase().includes(category.toLowerCase())
            )
        };
        return res.status(200).json(filterNews);
    } catch (error) {
        next(error);
    }
}

// thêm tin tức mới
export const createNews = async (req, res, next) => {
    try {
        const { title, content, author, category } = req.body;
        if (!title || !content || !author || !category) {
            return res.status(400).json({message: "các trường dữ liệu không được để trống"});
        };

        const listNews = await readNewsFile();
        const newNews = {
            id: Date.now(),
            title: title,
            content: content,
            author: author,
            category: category
        }

        listNews.push(newNews);

        await writeNewsFile(listNews);
        return res.status(201).json({message: "thêm tin tức thành công", result: newNews});
    } catch (error) {
        next(error);
    }
}

// cập nhật tin tức
export const updateNews = async (req, res, next) => {
    try {
        //lay id tu params
        const { id } = req.params;
        const { title, content, author, category } = req.body;
        //lay danh sách tin tức
        const listNews = await readNewsFile();
        //tim id trong danh sach
        const index = listNews.findIndex(f => f.id === Number(id));
        //kiem ra id co ton tai khong
        if(index === -1) {
            return res.status(404).json({message: "khong tim thay tin tức"});
        };
        //thuc hien cập nhật
        listNews[index] = {
            ...listNews[index],
            title: title ?? listNews[index].title,
            content: content ?? listNews[index].content,
            author: author ?? listNews[index].author,
            category: category ?? listNews[index].category
        };
        //ghi file
        await writeNewsFile(listNews);
        //reponse client
        return res.status(200).json(listNews);
    } catch (error) {
        next(error);
    }
};

//xóa tin tức theo id
export const deleteNews = async (req, res, next) => {
    try {
        const { id } = req.params;

        const listNews = await readNewsFile();
        const filterNews = listNews.filter(f => f.id !== Number(id));
        
        if (!filterNews) {
            return res.status(404).json({message: "không tìm thấy tin tức"});
        }
        await writeNewsFile(filterNews);
        return res.status(200).json({message: "xóa tin tức thành công"});
    } catch (error) {
        next(error);
    }
}