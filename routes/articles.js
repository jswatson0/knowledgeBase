var express = require('express');
var router = express.Router();

var Article = require('../models/article');


// Articles listing
router.get('/', function(req, res, next) {
  Article.getArticles(function(err, articles){
    if(err){
      console.log(err);
    }
    res.json(articles);
  })
});

// Article by ID
router.get('/:id', function(req, res, next) {
  Article.getArticleById(req.params.id, function(err, article ){
    if(err){
      console.log(err);
    }
    res.json(article);
  })
});

// Articles by category
router.get('/category/:category', function(req, res, next) {
  Article.getArticlesByCategory(req.params.category, function(err, articles ){
    if(err){
      console.log(err);
    }
    res.json(articles);
  })
});

// create article
router.post('/', function(req, res, next){
  // get form values
  var title = req.body.title;
  var category = req.body.category;
  var body = req.body.body;
  var link = req.body.link;

  // article object
  var newArticle = new Article({
    title: title,
    category: category,
    body: body,
    link: link
  });

  // create article
  Article.createArticle(newArticle, function(err, article){
    if(err){
      console.log(err)
    }
    res.location('/articles');
    res.redirect('/articles');
  })
});

//edit article
router.put('/', function(req, res, next){
  var id = req.body.id;
  var data = {
    title: req.body.title,
    body: req.body.body,
    category: req.body.category,
    link: req.body.link
  };

  Article.updateArticle(id, data, function(err, article){
    if(err){
      console.log(err);
    }
    res.location('/articles');
    res.redirect('/articles');

  })
});

// remove article
router.delete('/:id', function(req, res, next){
  Article.removeArticle(req.params.id, function(err, article){
    if(err){
      console.log(err);
    }

    res.location('/articles');
    res.redirect('/articles');
  })
});


module.exports = router;
