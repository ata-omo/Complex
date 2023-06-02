const Cloudinary = require('./configureCloudinary');

const CloudinaryUploader = async(buffer, options) => {
    let resultPromise = new Promise((resolve, reject) => {
        Cloudinary.uploader.upload_stream(options, (err, res) => {
            if(err) reject(err);
            resolve(res);
            
        }).end(buffer);
    })

    return resultPromise;
};

module.exports = CloudinaryUploader;