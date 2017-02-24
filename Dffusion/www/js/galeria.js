var app = angular.module('dffusion');

app.controller('GalleryCtrl', function($scope,$http, $ionicBackdrop, $ionicModal, $ionicSlideBoxDelegate, $ionicScrollDelegate , $state, MainService) {
  $scope.carpeta = window.localStorage['carpeta'];
  $scope.carpeta =  $scope.carpeta.trim().replace(/ /g,'%20');
  
  $http.post('http://www.newdifusion.com/androidDevelopers/app/galeria.php',{
    carpeta:window.localStorage['carpeta']
   }).success(function(response){
      $scope.allImages = response;
   });
 
  $scope.zoomMin = 1;

  $scope.showImages = function(index,imagen){
   $scope.url = 'http://www.newdifusion.com/androidDevelopers/system/'+$scope.carpeta+'/img/'+imagen;
   $scope.activeSlide = index;
   $scope.showModal('templates/categorias/gallery.html'); 
  };
 
$scope.showModal = function(templateUrl) {
  $ionicModal.fromTemplateUrl(templateUrl, {
     scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
    $scope.modal.show();
  });
}
 
$scope.updateSlideStatus = function(slide) {
    $ionicSlideBoxDelegate.enableSlide(false);
};

 $scope.closeModal = function() {
   $scope.modal.hide();
   $scope.modal.remove()
 };



  $scope.dato = MainService.makeString();
  
});
