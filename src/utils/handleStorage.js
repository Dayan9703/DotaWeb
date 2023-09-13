const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `${__dirname}/../public/img`)
    },
    filename: function (req, file, cb) {
        const ext = file.originalname.split('.').pop()
        const filename = `calendario.jpg`;
        cb(null, filename)
    }
})

const uploadMiddleware = multer({ storage })

module.exports = {uploadMiddleware}