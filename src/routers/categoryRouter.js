import express from 'express';
import slugify from 'slugify';
import { insertCategory } from '../models/categories/CategoryModel.js';
const router = express.Router();

router.post('/', (req, res, next) => {
    try {
        const { title } = req.body;
        if (typeof title === 'string' && title.length) {
            const slug = slugify(title, { lower: true })
            const category = insertCategory({ title, slug })
            category?._id ? res.json({
                status: 'success',
                message: 'User data received successfully'
            }) : res.json({
                status: 'error',
                message: 'User data couldnt be saved'
            })
        }

    } catch (error) {
        if (error.message.includes('E11000 duplicate key')) {
            error.status = '200';
            error.message = 'Category already in use...'
        }
        next(error);
    }
})

export default router;