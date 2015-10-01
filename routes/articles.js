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

router.get('/category/:category', function(req, res, next) {
  Article.getArticlesByCategory(req.params.category, function(err, articles ){
    console.log(req.params);
    if(err){
      console.log(err);
    }
    res.json(articles);
  })
});


module.exports = router;
