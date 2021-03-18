const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const dataSchema = new Schema({
    language: { type: String, required: true},
    gender: { type: String, required: true },
    age: { type: String, required: true },
    jobtype: { type: String, required: true },
    order: { type: Array, required: true },
    date: { type: Date, required: true}
}, {
    timestamps: true,
});

const Data = mongoose.model('Data', dataSchema);

module.exports = Data;