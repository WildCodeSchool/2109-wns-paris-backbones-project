import { RequestHandler, Router } from 'express';
import { create, deleteOne, readOne } from '../controllers/files';
import multer from 'multer';

const storagePath = process.env.STORAGE_PATH || '/app/uploads';

const upload = multer({
    storage: multer.diskStorage({
        destination: storagePath,
        filename: (req, file, callback) => {
            const originalExtension = (file.originalname.split('.').pop() || '').toLowerCase();
            const extension = /^[a-z_-]{1,20}$/.test(originalExtension) ? originalExtension : 'unknown';
            const filename = `${Date.now()}-${Math.floor(Math.random() * 8999) + 1000}.${extension}`;
            callback(null, filename);
        }
    })
});

function asyncHandler(handler: Function): RequestHandler {
    return async (req, res, next) => {
        try {
            await handler(req, res, next);
        } catch {
            res.status(500).json({ message: 'internal_error' });
        }
    }

}

const router = Router();

router.delete('/:filename', asyncHandler(deleteOne));
router.get('/:filename', asyncHandler(readOne));
router.post('/', upload.single('file'), asyncHandler(create));

export default router; 