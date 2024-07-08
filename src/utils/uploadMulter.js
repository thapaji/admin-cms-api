import multer from 'multer'

const imageFolderPath = 'public/img/product'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let error = null;
        cb(error, imageFolderPath)
    },
    filename: (req, file, cb) => {
        let error = ''
        cb(error, Date.now() + '-' + file.originalname)
    }
})

const limits = {
    fileSize: 1 * 1024 * 1024,
}

const fileFIlter = (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
        return cb(new Error('Only image files'), false)
    }
}

const upload = multer({ storage, limits, fileFIlter })
export default upload