import { readJsonFile, writeJsonFile } from "../utils/fileHelper.js";

const path = process.env.DB_FILE_PATH;

export const readNewsFile = async () => {
    return readJsonFile(path);
};

export const writeNewsFile = async (data) => {
    return writeJsonFile(path, data);
};
