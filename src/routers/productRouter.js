import express from 'express';
import slugify from 'slugify';
import { deleteProduct, getAllProducts, getProductById, insertProduct, updateProduct } from '../models/products/ProductModel.js';
import upload from '../utils/uploadMulter.js';
const router = express.Router();

router.post('/', upload.array('images', 5), async (req, res, next) => {
    try {
        const { name } = req.body;
        if (typeof name === 'string' && name.length) {
            const slug = slugify(name, { lower: true })
            const images = req.files.map(file => file.path);
            req.body.thumbnail = images[0]
            req.body.images = images;
            const product = await insertProduct({ ...req.body, slug })
            product?._id ? res.json({
                status: 'success',
                message: 'Product data received successfully'
            }) : res.json({
                status: 'error',
                message: 'Product data couldnt be saved'
            })
        }

    } catch (error) {
        if (error.message.includes('E11000 duplicate key')) {
            error.status = '200';
            error.message = 'Product already in use...'
        }
        next(error);
    }
})


router.get("/", async (req, res, next) => {
    try {
        const products = await getAllProducts()
        res.json({
            status: "success",
            message: "Products Fetched successfully",
            products
        });
    } catch (error) {
        next(error);
    }
});

router.get("/:_id", async (req, res, next) => {
    try {
        const { _id } = req.params;
        const product = await getProductById(_id)
        res.json({
            status: "success",
            message: "Product Fetched successfully",
            product
        });
    } catch (error) {
        next(error);
    }
});


router.put('/:_id', async (req, res, next) => {
    try {
        const { _id } = req.params;
        const product = await updateProduct(_id, req.body)
        console.log(product)
        product?._id ? res.json({
            status: 'success',
            message: 'Product update successfully'
        }) : res.json({
            status: 'error',
            message: 'Product couldnt be updated'
        })
    } catch (error) {
        next(error);
    }
})

router.delete('/:_id', async (req, res, next) => {
    try {
        const { _id } = req.params;
        const product = await deleteProduct(_id)
        product?._id ? res.json({
            status: 'success',
            message: 'Delete successfully'
        }) : res.json({
            status: 'error',
            message: 'Product couldnt be deleted'
        })
    } catch (error) {
        next(error);
    }
})

export default router;