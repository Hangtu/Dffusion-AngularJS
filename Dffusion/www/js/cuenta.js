var app = angular.module('dffusion');


app.controller('LoginCtrl',function($scope, $http ,$state , $cordovaToast, $ionicPopup, MainService){

     var sesion = window.localStorage['usuario'];
     $scope.dato = MainService.makeString();
     $scope.user = {email:window.localStorage['gmail']};

     if(sesion == '0'){
        $scope.view = false;  //view login
        $scope.view2 = true;  //view success
      }else{
        $scope.view = true;
        $scope.view2 = false;  
        paramsSession = {iduser:window.localStorage['idclient']};
        MainService.postService('login/companies.php', paramsSession).success(function(empresas){
           $scope.items = empresas;
        });
      }

     $scope.signIn = function (user){
        if ((typeof user.email != "undefined") && (typeof user.password != "undefined")){        
           params = { email:user.email,password:user.password,device:MainService.getUUID()}       
           MainService.postService('login/login.php',params).success(function(response){
             if(response=="invalid"){
                  $cordovaToast.showShortBottom("Usuario o contraseña incorrectos");
              }else{
                   $scope.view = true;
                   $scope.view2 = false;
                   window.localStorage['gmail'] = user.email;
                   window.localStorage['usuario'] = 1 ;
                   window.localStorage['idclient'] = response;
                   params1 = {iduser:response};
                   MainService.postService('login/companies.php', params1).success(function(empresas){
                      $scope.items = empresas;
                   });
                }//end else
            });
         }else{
             $cordovaToast.showShortBottom("Rellene todos los campos");
         }
     }// end signIn function 


    $scope.exit = function(){
      var confirmPopup = $ionicPopup.confirm({
          title: 'Cerrar Sesion',
          template: '<b>¿Estas seguro que quieres salir?</b>',
          cancelText: 'Cancelar', 
          okText: 'Aceptar'
        });
       confirmPopup.then(function(res) {
       if(res) {
        params = {iduser:window.localStorage['idclient']};
        MainService.postService('login/exit.php',params).success(function(response){
          window.localStorage['usuario'] = 0 ;
          $scope.view = false;  //hide false
          $scope.view2 = true;  //hide true
        });
       }
     });
    }

  $scope.onHold = function (IDempresa){
    var confirmPopup = $ionicPopup.confirm({
       title: 'Eliminar empresa',
       template: '<b>Esta seguro que quiere eliminar esta empresa?</b>',
       cancelText: 'Cancelar', 
       okText: 'Eliminar'
      });
     confirmPopup.then(function(res) {
       if(res) {
         $http.post('http://www.newdifusion.com/androidDevelopers/app/login/deleteEmpresa.php',{
          idempresa:IDempresa
         }).success(function(response){
           $state.go($state.current, {}, {reload: true});
           $cordovaToast.showShortBottom('Empresa eliminada').then(function(success) {
             }, function (error) {
            });
         });
       }//end if 
     });
    }
});


app.controller('RegistroCtrl',function($scope,$state,$http,$cordovaToast){  
     
     $scope.registrar = function (user){
          var firstName  = user.firstName;
          var lastName = user.lastName;
          var email = user.email;
          var password = user.password;
          var password2 = user.password2;

        if(password != password2){
            $cordovaToast.showLongBottom("Las contraseñas no coinciden").then(function(success) {
                      }, function (error) {
            });

            return;
        }

        if (typeof email != "undefined" && typeof password != "undefined" && firstName != "" && lastName != "" && password != ""){
            $http.post('http://www.newdifusion.com/androidDevelopers/app/login/registrar.php',{
              name:firstName,
              lastName:lastName,
              email:email,
              password:password
            }).success(function(response){
                if(response=="1"){
                   $cordovaToast.showLongBottom("Tu cuenta fue creada").then(function(success) {
                      }, function (error) {
                    });
                     $state.go("tabs.account");
                }else{
                  $cordovaToast.showShortBottom(response).then(function(success) {
                      }, function (error) {
                    });
                }
            });
         }else{
            $cordovaToast.showLongBottom("Rellena todos los campos correctamente").then(function(success) {
                      }, function (error) {
            });
         }
     }
});




app.controller('CreateCtrl',function($scope, $http , $cordovaToast ,$state ,$ionicPopup, MainService){

  params ={};
    MainService.postService('ciudad.php',params).success(function(response){
     $scope.items = response
   });
  
  $scope.guardar = function (empresa){     

    var timeOpen = empresa.open.getHours()+":"+empresa.open.getMinutes();
    var timeClose = empresa.close.getHours()+":"+empresa.close.getMinutes();

    $http.post('http://www.newdifusion.com/androidDevelopers/app/login/agregarEmpresa.php',{    
      fk_user:window.localStorage['idclient'],
      object: empresa,
      timeOpen: timeOpen,
      timeClose: timeClose
    }).success(function(response){
     $state.go("tabs.account");

     $ionicPopup.alert({
       title: 'Felicitaciones',
       template: 'Vuelve a iniciar sesion para ver tu empresa'
     });

     $cordovaToast.showShortBottom('Empresa creada').then(function(success) {
     }, function (error) {
     });
   });
  }
});


app.controller('ChangesCtrl',function($scope,$http, $state ,$cordovaToast,$ionicLoading){
   $ionicLoading.show({
    template: '<ion-spinner icon="android"></ion-spinner><br>Cargando...',
     duration: 10000
   });
   $http.post('http://www.newdifusion.com/androidDevelopers/app/login/getCompanyData.php',{
       msg:$state.params.id
    }).success(function(response){
         $ionicLoading.hide();
         $scope.empresa = {
            name:response[0].nombre,
            address:response[0].domicilio,
            tel:response[0].telefono,
            desc:response[0].descripcion,
            open:new Date("2015 "+response[0].open),
            close:new Date("2015 "+response[0].close),
            mon:response[0].mon,
            tue:response[0].tue,
            wen:response[0].wen,
            thu:response[0].thu,
            fri:response[0].fri,
            sat:response[0].sat,
            sun:response[0].sun,
         }
    });
     
      $scope.guardar = function (empresa){
      var timeOpen = empresa.open.getHours()+":"+empresa.open.getMinutes();
      var timeClose = empresa.close.getHours()+":"+empresa.close.getMinutes();

        $http.post('http://www.newdifusion.com/androidDevelopers/app/login/changes.php',{    
            idempresa:$state.params.id,
            object : empresa,
            timeOpen: timeOpen,
            timeClose: timeClose
        }).success(function(response){
             $cordovaToast.showLongBottom('Cambios guardados').then(function(success) {
             }, function (error) {
             });
        });
     }
});


app.controller('CompanyCtrl',function($scope,$http ,$ionicLoading, $state, EmpresaService2, $ionicModal, $cordovaSocialSharing ,$cordovaFileTransfer,$cordovaCamera,$cordovaToast, $ionicPopup, MainService, OneService){
     
     
    $http.post("http://www.newdifusion.com/androidDevelopers/app/empresa.php",{  // CARPETA DE LA EMPRESA
       msg:$state.params.id
    }).success(function(response) {
      $scope.carpeta = response[0].carpeta;
      $scope.nombre = response[0].nombre;
    });

     $scope.idempresa=$state.params.id;
     EmpresaService2.setLoading();
     EmpresaService2.setEmpresa($state.params.id);
     $scope.user = {comentario:""};

     
     $scope.items = [];
    

     EmpresaService2.GetFeed().then(function(items){
      if(EmpresaService2.getLoading()!="0"){
         $scope.items = items;
        }
    });

  
  $scope.loadMore = function(){
       EmpresaService2.GetContador();
       EmpresaService2.GetNewUsers().then(function(items) {
        if(EmpresaService2.getLoading()!="0"){
          $scope.items = $scope.items.concat(items);
         }
      $scope.$broadcast('scroll.infiniteScrollComplete');
    });
  };

  $scope.moreDataCanBeLoaded = function (){
     if(EmpresaService2.getLoading()=="0"){
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



  $scope.makeid = function(){
    text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
   }

      $scope.dato = $scope.makeid();
      $scope.dato2 = $scope.makeid();
  



  $scope.empresaPhoto = function (){  
    var options = {
            quality: 75,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            correctOrientation: true,
            allowEdit: true
   };
    $cordovaCamera.getPicture(options).then(
        function(imageURI) {
         $scope.imagens = imageURI;
         var fileURL = imageURI;

         var params = {};
         params.folder = $scope.carpeta;
         params.iduser = window.localStorage['idclient'];

         var headers = {};
         headers.Connection = "close";

       var options = {
            fileKey: "foto1", // clave para ser recibida en php
            //fileName: "imagen.png",  // nombre de la imagen que se manda
            chunkedMode: false,
            mimeType: "image/png",
            params: params,
            chunkedMode:false,
            headers:headers
        };

    $cordovaFileTransfer.upload("http://www.newdifusion.com/androidDevelopers/system/companyPhoto.php", fileURL , options , true)
      .then(function(result) {
          $scope.dato2 = $scope.makeid();
          $cordovaToast.showLongBottom("Imagen de perfil cambiada");
      }, function(err) {
         $cordovaToast.show("Ocurrio un error", 'long', 'center');
      }, function (progress) {
         // $ionicLoading.show((100 / 300 )* 100);
      });
           // });
          $ionicLoading.show({template: 'Cargando imagen...', duration:1500});
        },
        function(err){
           //$ionicLoading.show({template: 'Errore di caricamento...', duration:500});
        });
   }  // fin de la funcion 


  $scope.uploadPhoto = function (){  
    var options = {
            quality: 75,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            correctOrientation: true,
            allowEdit: true
   };
    $cordovaCamera.getPicture(options).then(
        function(imageURI) {
         $scope.imagens = imageURI;
         var fileURL = imageURI;

         var params = {};
         params.folder = $scope.carpeta;
         params.iduser = window.localStorage['idclient'];

         var headers = {};
         headers.Connection = "close";

       var options = {
            fileKey: "foto1", // clave para ser recibida en php
            //fileName: "imagen.png",  // nombre de la imagen que se manda
            chunkedMode: false,
            mimeType: "image/png",
            params: params,
            chunkedMode:false,
            headers:headers
        };

    $cordovaFileTransfer.upload("http://www.newdifusion.com/androidDevelopers/system/uploadImage.php", fileURL , options , true)
      .then(function(result) {
          $scope.dato = $scope.makeid();
          $cordovaToast.showLongBottom("Imagen agregada a galeria").then(function(success) {
                     }, function (error) {
          });
      }, function(err) {
         $cordovaToast.show("Ocurrio un error", 'long', 'center');
      }, function (progress) {
          //$ionicLoading.show((progress.loaded / progress.total )* 100);
      });
           // });
         $ionicLoading.show({template: 'Subiendo imagen', duration:1500});
        },
        function(err){
         // $ionicLoading.show({template: 'Errore di caricamento...', duration:500});
        });
   }  // fin de la funcion 

    




    $scope.escoger = function (){      
       var options = {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            correctOrientation: true,
            allowEdit: true
      };

    
      $cordovaCamera.getPicture(options).then(function(imageURI) {
          $scope.dato = $scope.makeid();
          $scope.imagens = imageURI;
          $scope.show = true;
          var fileURL = imageURI;
      },
         function(err){
         // $ionicLoading.show({template: 'Errore di caricamento...', duration:500});
        });

      $scope.dato = MainService.makeString();
      $scope.dato2 = MainService.makeString();
    }









  $scope.subirMomento = function(moment){
       


    if(typeof moment === 'undefined'){
         $cordovaToast.showShortBottom('Agrega un comentario').then(function(success) {
             }, function (error) {
          });
      }else if(moment.momento.length >0){

         if (typeof $scope.imagens === 'undefined'){
           $http.post('http://www.newdifusion.com/androidDevelopers/app/login/agregarMomento.php',{
              descripcionM:moment.momento,
              fk_empresa:$state.params.id
           }).success(function(response){
              $scope.moment = { momento: "" };
              $state.go($state.current, {}, {reload: true});
              $cordovaToast.showLongBottom("Publicacion agregada").then(function(success) {
               }, function (error) {
              });
           });
         }else{
         var params = {};
         params.folder = $scope.carpeta;
         params.momento = moment.momento;
         params.fk_empresa = $state.params.id;

         var headers = {};
         headers.Connection = "close";

         var options = {
            fileKey: "foto1",
            mimeType: "image/png",
            params: params,
            chunkedMode:false,
            headers:headers
         };

      $cordovaFileTransfer.upload("http://www.newdifusion.com/androidDevelopers/system/agregarMomento.php", $scope.imagens , options , true)
      .then(function(result) {
          $scope.show = false;
          $scope.imagens = undefined
          $state.go($state.current, {}, {reload: true});
          $cordovaToast.showLongBottom("Publicacion agregada").then(function(success) {
          }, function (error) {
          });
     }, function(err) {
         $cordovaToast.show("Ocurrio un error", 'long', 'center');
      }, function (progress) {
          //$ionicLoading.show((100 / 300 )* 100);
      });


      $ionicLoading.show({template: 'La publicacion se agregara en breve', duration:2000});
       }
     }else{
       $cordovaToast.showShortBottom('Agrega un comentario').then(function(success) {
             }, function (error) {
        });     
     }
       $scope.moment = { momento: "" };
  }//function end
  
  $scope.moment = { momento: "" };



  $scope.eliminarMomento = function(IDmomento) {
    var confirmPopup = $ionicPopup.confirm({
       title: 'Eliminar Publicacion',
       template: '<b>Esta seguro que quiere eliminar esta publicacion?</b>',
       cancelText: 'Cancelar', 
       okText: 'Eliminar'
     });
     confirmPopup.then(function(res) {
       if(res) {
         $http.post('http://www.newdifusion.com/androidDevelopers/app/login/deleteMomento.php',{
          idmomento:IDmomento
         }).success(function(response){
           $state.go($state.current, {}, {reload: true});
           $cordovaToast.showShortBottom('Publicacion eliminada').then(function(success) {
             }, function (error) {
            });
         });
       }//end if 
     });
   };
});








