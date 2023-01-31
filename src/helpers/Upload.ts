import multer from 'multer';
import { Request } from 'express';

const upload = multer.diskStorage({
	destination: (req: Request, file: Express.Multer.File, cb) => {
		cb(null, process.env.STATIC_DIR || "");
	},
	filename: (req: Request, file: Express.Multer.File, cb) => {
		cb(null, file.originalname);
	},
});

export default multer({ storage: upload }).single('image');
