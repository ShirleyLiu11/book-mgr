const fs = require('fs');

const saveFileToDisk = (ctx, filename) => {
    return new Promise((resolve, reject) => {
        const file = ctx.request.files.file;

        const reader = fs.createReadStream(file.path);

        const writeStream = fs.createWriteStream(filename);

        reader.pipe(writeStream);

        writeStream.on('end', () => {
            resolve(filename);
        });

        writeStream.on('error', (err) => {
            reject(err);
        });

        reader.on('error', (err) => {
            reject(err);
        });
    });
};

module.exports = {
    saveFileToDisk,
};