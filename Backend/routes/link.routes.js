import express from 'express';
import { createShort, handleRedirect } from '../controllers/link.controller.js';



const router = express.Router();

router.post('/', createShort); // create endpoint
router.get('/:code', handleRedirect); // catch-all short URL route

export default router;