mongoose = require('mongoose');

var categorySchema = mongoose.Schema({
  name: {
    type: String,
    index: true,
    required: true
  },
  description: {
    type: String
  }
});

var Category = module.exports = mongoose.model('Category', categorySchema);

// Get all categories
module.exports.getCategories = function(callback){
  Category.find(callback);
};

// Get Category by ID
module.exports.getCategoryById = function(id, callback){
  Category.findById(id, callback);
};



// Create Category
module.exports.createCategory = function(newCategory, callback){
  newCategory.save(callback);
};



