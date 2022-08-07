const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categories = await Category.findAll({
      order: ['id'],
      include: [Product]
    });
    res.status(200).json(categories);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({message: 'Oops! Server error' });
  }
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const category = await Category.findOne({
      where: {
        id: req.params.id
      }, 
      include: [Product]
    });

    if (!category) {
      res.status(404).json({ message: 'No category found with matching id!'});
      return;
    }

    res.status(200).json(category);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Oops! Server error'});
  }
});

router.post('/', (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create({
      category_name: req.body.category_name
    });
    res.status(200).json(newCategory);
  }
  catch (err) {
    console.log(err);
    res.status(400).json({ message: 'Error please check formatting'});
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try {
    const updatedCategory = await Category.update(
      {category_name: req.body.category_name}, 
      {where: {id: req.params.id}
    })

    if (!updatedCategory) {
      res.status(404).json({ message: 'No category found with this id'});
      return;
    }

    res.status(200).json({message: 'Category updated'});
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    const category = await Category.destroy({
      where: {
        id: req.params.id
      }
    })

    if (!category) {
      res.status(404).json({ message: 'No category found with this id'});
      return;
    }

    res.status(200).json({ message: 'Category deleted'});
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
