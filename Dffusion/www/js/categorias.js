//3 CONTROLLERS
var app = angular.module('dffusion');

app.controller('SearchCtrl', function($scope, MainService){
  $scope.buscar = function (name){   
    params = { nombre:name,city:window.localStorage['zona']};
    MainService.postService('search.php',params).success(function(response){
      $scope.busqueda = response
    });
  }
  $scope.dato = MainService.makeString();
  $scope.setRaiting = function(val) {  
    $scope.star = MainService.setRaiting(val);
  }

});

app.controller('PremiumCtrl', function($scope, $http, MainService){
 params = {zona:window.localStorage['zona']};
 MainService.postService('premium.php',params).success(function(response){
  $scope.items = response
});
 $scope.dato = MainService.makeString();
 
 $scope.setRaiting = function(val) {  
  $scope.star = MainService.setRaiting(val);
}

});

app.controller('CategoriaDetailCtrl', function($scope, $http ,$state, CategoriaService, MainService){ 
  $scope.idcategoria = $state.params.id;
  CategoriaService.setCategoria($state.params.id);
  CategoriaService.setLoading();

 $scope.items = [];
  CategoriaService.GetFeed().then(function(items){
    if(CategoriaService.getLoading()!=0){
     $scope.items = items;
   }
 });
  
  $scope.loadMore = function(){
    CategoriaService.GetContador();
    CategoriaService.GetNewUsers().then(function(items) {
      if(CategoriaService.getLoading()!=0){
       $scope.items = $scope.items.concat(items);
     }
     $scope.$broadcast('scroll.infiniteScrollComplete');
   });
  };

  $scope.moreDataCanBeLoaded = function (){
    if(CategoriaService.getLoading()=="0"){
      return false;
    }else{
      return true;
    }
  }

$scope.dato = MainService.makeString();
 $scope.setRaiting = function(val) {  
  $scope.star = MainService.setRaiting(val);
 }

});













