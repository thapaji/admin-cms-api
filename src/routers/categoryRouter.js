import express from 'express';
import slugify from 'slugify';
import { deleteCategory, getAllCategories, insertCategory, updateCategory } from '../models/categories/CategoryModel.js';
const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const { title } = req.body;
        if (typeof title === 'string' && title.length) {
            const slug = slugify(title, { lower: true })
            const category = await insertCategory({ title, slug })
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


router.get("/", async (req, res, next) => {
    try {
        const categories = await getAllCategories()
        res.json({
            status: "success",
            message: "Categories Fetched successfully",
            categories
        });
    } catch (error) {
        next(error);
    }
});


router.put('/:_id', async (req, res, next) => {
    try {
        const { _id } = req.params;
        const category = await updateCategory(_id, req.body)
        console.log(category)
        category?._id ? res.json({
            status: 'success',
            message: 'Category update successfully'
        }) : res.json({
            status: 'error',
            message: 'Category couldnt be updated'
        })
    } catch (error) {
        next(error);
    }
})

router.delete('/:_id', async (req, res, next) => {
    try {
        const { _id } = req.params;
        const category = await deleteCategory(_id)
        category?._id ? res.json({
            status: 'success',
            message: 'Delete successfully'
        }) : res.json({
            status: 'error',
            message: 'Category couldnt be deleted'
        })
    } catch (error) {
        next(error);
    }
})

export default router;