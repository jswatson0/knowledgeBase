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

// create Article
module.exports.createArticle = function(newArticle, callback){
  newArticle.save(callback);
};

// update Article
module.exports.updateArticle = function(id, data, callback){
  var title = data.title;
  var body = data.body;
  var category = data.category;
  var link = data.link;

  var query = {id:id};

  Article.findById(id, function(err, article){
    if(!article){
      return next(new Error("Can't find article."));
    } else {
      article.title = title;
      article.body = body;
      article.category = category;
      article.link = link;

      article.save(callback);
    }
  })
};

// Remove article
module.exports.removeArticle = function(id, callback){
  Article.find({_id: id}).remove(callback);
};



