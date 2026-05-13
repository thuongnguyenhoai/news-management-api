import fs from "fs/promises";

//hàm đọc file
export const readJsonFile = async (path) => {
    const data = await fs.readFile(path, "utf-8");
    return JSON.parse(data);
};

//hàm ghi file
export const writeJsonFile = async (path, data) => {
    await fs.writeFile(path, JSON.stringify(data, null, 2));
};