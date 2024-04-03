import { readFileSync, writeFileSync } from "fs";
class JsonFileReader {
    readFileJson(filePath) {
        const jsonData = readFileSync(filePath, "utf-8");
        return JSON.parse(jsonData);
    }
    writeFileJson(filePath, data) {
        writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
    }
}
export default new JsonFileReader();
//# sourceMappingURL=jsonFileReader.js.map