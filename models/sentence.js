const mongoose = require('mongoose')

const sentenceSchema = new mongoose.Schema({
    sentence: {
        type: String,
        required: true,
    },
    wordId: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Sentence', sentenceSchema);