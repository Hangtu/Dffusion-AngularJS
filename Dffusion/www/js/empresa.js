var app = angular.module('dffusion');

app.controller('EmpresaCtrl',function($scope, $http ,$state, MainService, EmpresaService, OneService, $cordovaSocialSharing,$cordovaToast,$cordovaInAppBrowser,$ionicBackdrop, $ionicModal, $ionicSlideBoxDelegate, $ionicScrollDelegate){ 
   
    EmpresaService.setLoading();
    $scope.idempresa = $state.params.id;
    EmpresaService.setEmpresa($state.params.id);
    
    $http.post("http://www.newdifusion.com/androidDevelopers/app/empresa.php",{
      msg:$scope.idempresa
    }).success(function(response) {
       
       $scope.empresa = response;

       var horario = response[0].horarios.split("-");
         
       var open = horario[0].split(":");
       var close = horario[1].split(":");

        if (open[1]<10){  
          horario[0]=open[0]+":0"+open[1];       
        }
        if (close[1]<10){  
          horario[1]=close[0]+":0"+close[1];       
        }


       $scope.abierto = horario[0];
       $scope.cerrado = horario [1];

       $scope.dias = horario[2]+" "+horario[3]+" "+horario[4]+" "+horario[5]+" "+horario[6]+" "+horario[7]+" "+horario[8];

      window.localStorage['empresa'] = $scope.empresa[0].idempresa; // datos para enviar a opciones.
      window.localStorage['carpeta'] = $scope.empresa[0].carpeta;  // Imagenes y Mapa.
      
      $scope.folder = $scope.empresa[0].carpeta;
   
  });


  $scope.items = [];
  EmpresaService.GetFeed().then(function(items){
   if(EmpresaService.getLoading()!="0"){
    $scope.items = items;
   }
  });

  
  $scope.loadMore = function(){
      EmpresaService.GetContador();
      EmpresaService.GetNewUsers().then(function(items) {
     if(EmpresaService.getLoading()!="0"){
      $scope.items = $scope.items.concat(items);
       }
      $scope.$broadcast('scroll.infiniteScrollComplete');
    });
  };
      
  $scope.moreDataCanBeLoaded = function (){
     if(EmpresaService.getLoading()=="0"){
              return false;
      }else{
              return true;
      }
  }


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
             $scope.items[index].color = "";
          }else{
             $scope.items[index].likeCount = parseInt($scope.items[index].likeCount)-1;
             $scope.items[index].color = "";
          }
     });
   }else{
        $cordovaToast.showShortBottom('No haz iniciado sesion').then(function(success) {
        }, function (error) {
        });
   }
  }

  $scope.compartir = function(text, folder,image){
      OneService.shareByFacebook(text,folder,image);
  }


   $scope.dato = MainService.makeString();

//ZOOM PROFILE IMAGE

$scope.zoomMin = 1;

$scope.showImagesProfile = function() {
  $scope.showModalProfile('templates/momento/momento_zoom.html');
  var folder = $scope.folder.trim().replace(/ /g,'%20');
  $scope.url = 'http://www.newdifusion.com/androidDevelopers/system/'+folder+'/img/profile.png';
};
 
$scope.showModalProfile = function(templateUrl) {
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
    $ionicSlideBoxDelegate.enableSlide(false);
 };


 //ZOOM MOMENTO IMAGES

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
   
});
