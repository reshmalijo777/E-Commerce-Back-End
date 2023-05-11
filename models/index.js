// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

Product.belongsTo(Category,{
  foreignKey:'category_id'
});

Category.haveMany(Product,{
  foreignKey:'category_id',
  onDelete:'CASCADE'
});

Product.belongsToMany(Tag,{
  through: {
    model: ProductTag,
    unique: false
  },
})

Tag.belongsToMany(Product,{
  through: {
    model: ProductTag,
    unique: false
  },
  as:'Tag_Product'
})

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
