const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findAll({
      include: [Product]
    });
    res.status(200).json(tags);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Oops! Server error' });
  }
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tag = await Tag.findOne({
      where: {id: req.params.id},
      include: [Product]
    });

    if (!tag) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }

    res.status(200).json(tag);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create({
      tag_name: req.body.tag_name
    });
    res.status(200).json(newTag);
  }
  catch (err) {
    console.log(err);
    res.status(400).json({ message: 'Please check formatting'});
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updatedTag = await Tag.update({
      tag_name: req.body.tag_name
    },
    {where: {id: req.params.id}
    })


    if (!updatedTag) {
      res.status(404).json({ message: 'No category found with matching id!'});
      return;
    }

    res.status(200).json({message: 'Tag updated!'});
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Oops! Server error' });
  }
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  try {
    const tag = await Tag.destroy({
      where: {id: req.params.id}
    })

    if (!tag) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }

    res.status(200).json({message: 'Tag deleted'});
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error'});
  }
});

module.exports = router;
