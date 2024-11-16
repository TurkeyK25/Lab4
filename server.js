const express = require('express');
const app = express();
const port = 3001;

app.listen(port, () => {
    console.log('Server dang chay chong : ' + port);
})
app.get('/', (req, res) => {
    res.sendfile(__dirname, './upload.html');
})
app.get('/', (req, res) => {
    res.sendfile(__dirname + '/upload.html');
    // res.send('Trang chu');
})
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        var dir = './upload';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, 'upload')
    },
    filename: function(req, file, cb) {
        let filename = file.fieldname;
        let newFileName = filename;
        // arr = fileName.split('.');

        // let newFileName = '';

        // for (let i =0; i< arr.length; i++) {
        //     if (i != arr.length - 1) {
        //         newFileName += arr[i];
        //     } else {
        //         newFileName += ('-' + Date.now() + '.' + arr[i]);
        //     }
        // }

        cb(null, newFileName)
    }
})
const fs = require('fs');
const upload = multer({ storage: storage })
app.post('/uploadfile', upload.single('myfile'), (req, res, next) => {
    let file = req.file;
    if (!file) {
        var error = new Error('Can chon file!');
        error.httpStatusCode = 400;
        return next(error);
    }
    res.send(file);
})