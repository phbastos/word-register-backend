const express = require('express');
const router = express.Router();
const Item = require('../models/word');
const Sentence = require("../models/sentence");


// Create Item
router.post('/addWord', async (req, res) => {
    const item = new Item(req.body);
    try {
        const savedItem = await item.save();
        res.status(201).json(savedItem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get All Items
router.get('/getAll', async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json(items);
        console.log('Palavras buscadas com sucesso', items);
    } catch (error) {
        console.error('Erro ao buscar palavras', error)
        res.status(500).json({ error: error.message });
    }
});

// Get Single Item
router.get('/getWord/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).json({ error: 'Item not found' });
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update Item
router.put('/updateWord/:id', async (req, res) => {
    try {
        console.log('Atualizando a palavra:', req.body)
        const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedItem) return res.status(404).json({ error: 'Item not found' });
        res.status(200).json(updatedItem);
    } catch (error) {
        console.error('Erro ao atualizar palavra:', error)
        res.status(400).json({ error: error.message });
    }
});

// Delete Item
router.delete('/deleteWord/:id', async (req, res) => {
    try {
        const deletedItem = await Item.findByIdAndDelete(req.params.id);
        if (!deletedItem) return res.status(404).json({ error: 'Item not found' });
        res.status(200).json(deletedItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/getWords/:language/:categoria', async (req, res) => {
    try {
        console.log('Executando busca com os seguintes parametros', {language: req.params.language, categoria: req.params.categoria})
        const words = await Item.find({language: req.params.language, categoria: req.params.categoria});
        res.status(200).json(words);
    } catch (error) {
        console.log('Erro ao buscar palavras por idioma e categoria:', error);
        res.status(500).json({ error: error.message });
    }
});

router.get('/getSentences', async (req, res) => {
    try {
        console.log('Retornando todas as sentences');
        const sentences = await Sentence.find();
        console.log('Registros retornados:', sentences);
        res.status(200).json(sentences);
    } catch (error) {
        console.log('Erro ao buscar sentences:', error);
        res.status(500).json({ error: error.message });
    }
});

router.get('/getSentences/:wordId', async (req, res) => {
    try {
        console.log('Executando busca das sentences com os seguintes parametros', {wordId: req.params.wordId})
        const sentences = await Sentence.find({wordId: req.params.wordId});
        res.status(200).json(sentences);
        console.log('Registros retornados:', sentences)
    } catch (error) {
        console.log('Erro ao buscar sentences por id:', error);
        res.status(500).json({ error: error.message });
    }
});

router.post('/addSentence/:wordId/:sentence', async (req, res) => {
    let sentence = new Sentence();
    sentence.sentence = req.params.sentence
    sentence.wordId = req.params.wordId;
    try {
        const savedSentence = await sentence.save();
        res.status(201).json(savedSentence);
        console.log('Frase salva com sucesso:', savedSentence);
    } catch (error) {
        console.error('Erro ao salvar sentence:', error)
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
