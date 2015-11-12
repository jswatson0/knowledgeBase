angular.module('kB')

// get all articles
.controller('ArticlesCtrl',['$scope', '$http', '$location', function($scope, $http, $location){
    $http.get('/articles').success(function(data){
      $scope.articles = data;
    });

    $scope.deleteArticle = function(articleId){
      $http.delete('/articles/' + articleId).success(function(data){
        console.log(data);
      });
      $location.path('/articles')
    };

}])

// get article by cat
.controller('ArticlesCategoryCtrl', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams){
  $http.get('/articles/category/' + $routeParams.category).success(function(data){
    $scope.categoryArticles = data;
  })
}])

// get article
.controller('ArticleDetailsCtrl', ['$scope', '$http', '$routeParams', '$location', function($scope, $http, $routeParams, $location){
  $http.get('/articles/' + $routeParams.id).success(function(data){
    $scope.article = data;
  });

  $scope.removeArticle = function(){
    $http.delete('/articles/' + $routeParams.id).success(function(data){
      console.log(data);
    });
    $location.path('/categories')
  }
}])

.controller('ArticleCreateCtrl', ['$scope', '$http', '$routeParams', '$location', function($scope, $http, $routeParams, $location){
  $http.get('/categories').success(function(data){
    $scope.categories = data;
  });

  $scope.addArticle = function(){
    var data = {
      title: $scope.title,
      body: $scope.body,
      category: $scope.category,
      link: $scope.link
    };

    $http.post('/articles', data).success(function(data, status){
      console.log([status, data]);
    });

    $location.path('/articles');
  }
}])

.controller('ArticleEditCtrl', ['$scope', '$http', '$routeParams', '$location',
  function($scope, $http, $routeParams, $location){
    $http.get('/categories').success(function(data){
      $scope.categories = data;
    });

    $http.get('/articles/' + $routeParams.id).success(function(data){
      $scope.article = data;
    });

    $scope.updateArticle = function(){
      var data = {
        id:       $routeParams.id,
        title:    $scope.article.title,
        body:     $scope.article.body,
        link:     $scope.article.link,
        category: $scope.article.category
      };


      $http.put('/articles', data).success(function(data, status){
        console.log([status, data]);
      });

      $location.path('/articles');
    }
  }]);

