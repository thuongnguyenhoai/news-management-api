import { getAllNews, renderNewsView, searchNews, createNews, updateNews, deleteNews } from "../controllers/newsController.js";
import { validateNews } from "../middlewares/validateNews.js";
import express from "express";

const router = express.Router();

router.get("/", getAllNews);
router.get("/view", renderNewsView);
router.get("/search", searchNews);
router.post("/", validateNews, createNews);
router.put("/:id", updateNews);
router.delete("/:id", deleteNews);

export default router;
