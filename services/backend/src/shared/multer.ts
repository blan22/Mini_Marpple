import multer, { MulterError } from 'multer';
import path from 'path';
import shared from '@monorepo/shared';

const options: multer.Options = {
  fileFilter: (_, file, cb) => {
    if (!shared.ACCEPTED_IMAGE_TYPES.includes(file.mimetype)) return cb(new MulterError('LIMIT_UNEXPECTED_FILE'));
    return cb(null, true);
  },
  limits: {
    fileSize: shared.MAX_IMAGE_UPLOAD_SIZE,
  },
  storage: multer.diskStorage({
    filename(req, file, done) {
      done(null, `${Date.now()}_${file.originalname}`);
    },
    destination(req, file, done) {
      done(null, path.join(path.resolve(), 'public', 'images'));
    },
  }),
};

const uploadMiddleware = multer(options).single('thumbnail');

export { uploadMiddleware };
