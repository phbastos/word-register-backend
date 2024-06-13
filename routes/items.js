const express = require('express');
const router = express.Router();
const Item = require('../models/item');

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
    } catch (error) {
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
        const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedItem) return res.status(404).json({ error: 'Item not found' });
        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete Item
router.delete('deleteWord/:id', async (req, res) => {
    try {
        const deletedItem = await Item.findByIdAndDelete(req.params.id);
        if (!deletedItem) return res.status(404).json({ error: 'Item not found' });
        res.status(200).json(deletedItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
