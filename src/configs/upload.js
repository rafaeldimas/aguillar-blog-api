const path = require('path')

module.exports = {
  storage: process.env.UPLOAD_STORAGE,
  limitSize: process.env.UPLOAD_LIMIT_SIZE,
  publicStorage: path.resolve(__dirname, '..', '..', 'public', 'storage'),
  publicStaticFiles: '/static/files',
  allowedMimes: [
    'image/jpeg',
    'image/pjpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'application/pdf'
  ]
}
