import { Router } from 'express';
import { SpeechController } from '../controllers/speech.controller';
const multer = require('multer');

// create a multer instance to store file to memory, not disk
const upload = multer({storage: multer.memoryStorage(),})

class SpeechRouter {
    public router: Router = Router();

    public constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        // store audio in field 'file' and parse it to req.file
        this.router.get('/speech', upload.single('file'), SpeechController.query)
    }
}

export const speechRouter = new SpeechRouter();