import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
class FileService {
    save(file) {
        const fileExtension = file.mimetype.split('/')[1];
        const fileName = uuidv4() + "." + fileExtension;
        console.log(fileName);
        const filePath = path.resolve('static', fileName);
        file.mv(filePath);
        return fileName;
    }
    delete(fileName) {
        const filePath = path.resolve('static', fileName);
        fs.unlinkSync(filePath);
    }
}
export default new FileService();
//# sourceMappingURL=fileService.js.map