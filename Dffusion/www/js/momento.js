var app = angular.module('dffusion');


app.controller('MomentoCtrl',function($scope, $http ,$state, PersonService, OneService, $ionicModal,$cordovaToast, $ionicSlideBoxDelegate, MainService){
  
  $scope.items = [];
  $scope.user = {comentario:""};
  PersonService.SetLoading();
  PersonService.GetFeed().then(function(items){
   if(PersonService.GetLoading()!="0"){ 
    $scope.items = items;
   }
  
 });
   
  if(typeof window.localStorage['ciudad'] == "undefined"){
      $scope.ciudad = 'Nayarit';
       window.localStorage['zona'] = 1;
   }else{
      $scope.ciudad = window.localStorage['ciudad'];
   }
      

  $scope.loadMore = function(){
      PersonService.GetContador();
      PersonService.GetNewUsers().then(function(items) {
        if(PersonService.GetLoading()!="0"){ 
           $scope.items = $scope.items.concat(items);
        }
      $scope.$broadcast('scroll.infiniteScrollComplete');
    });
  };

  $scope.compartir = function(text, folder,image){
      OneService.shareByFacebook(text,folder,image);
  }


   $scope.dato  = MainService.makeString();
   $scope.dato2 = MainService.makeString();






   $scope.openModalComentarios = function(idComentario,idmomento) {
    var params = {msg:idmomento};
    $scope.idComentario = idComentario;
    $scope.showModalComentarios('comentarios.html');
    $scope.idmomento = idmomento;
    $scope.comentario = null;
    $scope.cargando = "Cargando..."; // sin comentario
     MainService.postService('comentariosM.php',params).success(function(response){
         if (response == "null"){
             $scope.cargando="Sin comentarios"
         }else{
           $scope.cargando = "";
           $scope.comentario = response;
         }
     });
   };

   $scope.showModalComentarios = function(templateUrl) {
    $ionicModal.fromTemplateUrl(templateUrl, {
     scope: $scope
     }).then(function(modal) {
       $scope.modal = modal;
       $scope.modal.show();
    });
   }
  
    $scope.closeModalComentarios = function() {
     $scope.user = {comentario:""};
     $scope.modal.hide();
     $scope.modal.remove()
  };


  $scope.sendMsg= function (comentario){
    var params = {
       fk_momento:$scope.idmomento,
       comment:comentario,
       fk_user:window.localStorage['idclient']
     };
   
   if (window.localStorage['usuario'] == 1){
    if(comentario.length > 1){
     MainService.postService('agregarComentario.php',params).success(function(response){
         $scope.comentario = response;
         $scope.items[$scope.idComentario].contador = parseInt($scope.items[$scope.idComentario].contador)+1;
     });
         $scope.closeModalComentarios();
     }else{
        $cordovaToast.showShortBottom('Escribe un comentario');
     }
     }else{
      $cordovaToast.showShortBottom('No haz iniciado sesion');
    }
  };

  $scope.like = function (index,idmomento){
   if (window.localStorage['usuario'] == 1 ){
     $http.post("http://www.newdifusion.com/androidDevelopers/app/likesM.php",{fk_momento:idmomento,fk_user:window.localStorage['idclient']}).success(function(response){
          if(response.trim()=="LIKE"){
             $scope.items[index].likeCount = parseInt($scope.items[index].likeCount)+1;
             $scope.items[index].color = ""; //añadir positive para cambiar color
          }else{
             $scope.items[index].likeCount = parseInt($scope.items[index].likeCount)-1;
             $scope.items[index].color = "";
          }
     });
     }else{
        $cordovaToast.showShortBottom('No haz iniciado sesion');
    }
  }

 $scope.doRefresh = function() {
     $state.go($state.current, {}, {reload: true});
  };

  $scope.moreDataCanBeLoaded = function (){
     if(PersonService.GetLoading()=="0"){
              return false;
      }else{
              return true;
      }
  }

//IMAGENES ZOOM

$scope.zoomMin = 1;
$scope.showImages = function(carpeta,imagen) {
   $scope.showModal('templates/momento/momento_zoom.html');
   carpeta =  carpeta.trim().replace(/ /g,'%20');
   $scope.url = 'http://www.newdifusion.com/androidDevelopers/system/'+carpeta+'/momento/'+imagen;
};
 
$scope.showModal = function(templateUrl) {
  $ionicModal.fromTemplateUrl(templateUrl, {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
    $scope.modal.show();
  });
}
 
 $scope.closeModal = function() {
   $scope.modal.hide();
   $scope.modal.remove()
 };
 
 $scope.updateSlideStatus = function(slide) {
    $ionicSlideBoxDelegate.enableSlide(false); //when you do zoom and you slide , this doesn't slide to another image
 };


});








