const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://kinggs1314:RbxgaC8hT30geRSs@raccoon-redux-store.lfcavik.mongodb.net/');

module.exports = mongoose.connection;
