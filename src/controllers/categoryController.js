const Category = require('../models/categoryModel');

// Create a category
exports.createCategory = async (req, res) => {
  try {
    const { nome } = req.body;

    if (!nome) {
      return res.status(400).json({ message: "'Nome e necessario" });
    }

    const newCategory = new Category({ nome });
    await newCategory.save();

    res.status(201).json({ message: 'Categoria criada', category: newCategory });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ categories });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update a category
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome } = req.body;

    if (!nome) {
      return res.status(400).json({ message: "'nome' is required" });
    }

    const updatedCategory = await Category.findByIdAndUpdate(id, { nome }, { new: true });
    if (!updatedCategory) {
      return res.status(404).json({ message: 'Categoria não encontrada' });
    }

    res.status(200).json({ message: 'Categoria atualizada', category: updatedCategory });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      return res.status(404).json({ message: 'Categoria não encontrada' });
    }

    res.status(200).json({ message: 'Categoria deletada' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
