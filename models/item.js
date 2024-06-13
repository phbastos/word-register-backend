const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
        language: {
            type: String,
            required: true,
        },
        word: {
            type: String,
            required: true,
            unique: true,
        },
        definition: {
            type: String,
            required: true,
        },
        observacao: {
            type: String,
            required: false,
        },
        sentences: [{
            type: [String],
            required: false,
        }],
        categoria: {
            type: String,
            required: true,
        }
    });

module.exports = mongoose.model('Word', itemSchema);
