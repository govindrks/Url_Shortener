import express from 'express';
import { createShort, handleRedirect } from '../controllers/link.controller.js';



const router = express.Router();

// create endpoint
router.post('/', createShort); 

// catch-all short URL route
router.get('/:code', handleRedirect); 

export default router;