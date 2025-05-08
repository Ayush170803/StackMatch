const mongoose = require('mongoose');

const connectdb = async () =>
{
  await  mongoose.connect("mongodb+srv://ayusH5288:DAn9JIIv0TpcZlPy@cluster0.f7u3g.mongodb.net/");
}

module.exports = connectdb;
