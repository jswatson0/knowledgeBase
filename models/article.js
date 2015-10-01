mongoose = require('mongoose');
var articleSchema = mongoose.Schema({
  title: {
    type: String,
    index: true,
    required: true
  },
  body: {
    type: String,
    index: true,
    required: true
  },
  category: {
    type: String,
    index: true,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  link: {
    type: String
  }
});

var Article = module.exports = mongoose.model('Article', articleSchema);

// Get all articles
module.exports.getArticles = function(callback){
  Article.find(callback);
};

// Get article by ID
module.exports.getArticleById = function(id, callback){
  Article.findById(id, callback);
};

// Get articles by category
module.exports.getArticlesByCategory = function(category, callback){
  var query = {category: category};
  Article.find(query, callback);
};

// Add



