var app = angular.module('dffusion');

app.controller('CiudadCtrl', function($scope, $cordovaToast, MainService, OneService){
   OneService.showLoading('http://www.newdifusion.com/androidDevelopers/app/ciudad.php').success(function(response){
        $scope.ciudades = response;
   });
    $scope.selecionarCiudad = function(idzona, nombreZona){
      window.localStorage['zona'] = idzona;
        var name = window.localStorage['zona'];
         $cordovaToast.showShortBottom("Haz seleccionado el estado de "+nombreZona);
         window.localStorage['ciudad'] = nombreZona; 
         params = {idzona:idzona, zona:nombreZona, iduser:window.localStorage['idclient']};
            MainService.postService('insertCity.php',params).success(function(response){    
         });
      };
});

app.controller('FastNumberCtrl',function($scope, OneService){  
     OneService.showLoading('json/fastNumbers.json').success(function(response){
        $scope.fastNumber = response;
     });
});












