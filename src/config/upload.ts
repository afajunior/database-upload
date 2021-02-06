import crypto from 'crypto'
import multer from 'multer';
import path from 'path'

const tmpDir = path.resolve(__dirname, '..', '..', 'tmp');

export default {
    directory: tmpDir,
    storage: multer.diskStorage({
        destination: tmpDir,
        filename: (request, file, callback) => {
            const filehash = crypto.randomBytes(10).toString('hex');
            const filename = `${filehash}-${file.originalname}`;

            return callback(null, filename);
        }
    })
};