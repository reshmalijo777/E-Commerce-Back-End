const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
    include:[{model:Product}]
    })
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single category
router.get('/:id', async (req, res) => {
  try {
    const getCategory = await Category.findByPk(req.params.id, {
      // JOIN with product
      include: [{ model: Product }]
    });

    if (!getCategory) {
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }

    res.status(200).json(getCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});
//create a new category
router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updateCategory = await Category.update(req.body,
      {
      where: {
        id: req.params.id
      }
    });

    if (!updateCategory) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(updateCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const delCategory = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!delCategory) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(delCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
