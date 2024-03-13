const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const path = require('path');

cloudinary.config({
  cloud_name: 'dc3af1i6q',
  api_key: '871113595788773',
  api_secret: 'CijnsdWxSGhB3HxHz4cvZM68VU8',
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'ProfilePics',
    format: async (req, file) => path.extname(file.originalname).substring(1),
    public_id: (req, file) => file.fieldname + '-' + Date.now(),
  },
});

  const fileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  };

const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;

