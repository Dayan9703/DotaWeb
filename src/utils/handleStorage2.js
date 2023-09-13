const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `${__dirname}/../public/img`)
    },
    filename: function (req, file, cb) {
        const ext = file.originalname.split('.').pop()
        const filename = `principal.jpg`;
        cb(null, filename)
    }
})

const uploadMiddleware2 = multer({ storage })

module.exports = {uploadMiddleware2}