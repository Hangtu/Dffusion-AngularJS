var app = angular.module('dffusion');

app.service('MainService',function($http){


  window.localStorage['zona']; // Zona inicial (TEPIC)
  window.localStorage['ciudad'];
  window.localStorage['usuario'] = 0; // Sesion no iniciada 0 - 1 iniciada
  window.localStorage['idclient']; //

	var APP_KEY ='3FB7A4912A797F6BC3D14D79D2145';
	var BASE_URL ='http://www.newdifusion.com/androidDevelopers/app/';
  var UUID;
	
  var star = [
     {value:1, icon:'ion-ios-star-outline'},
     {value:2, icon:'ion-ios-star-outline'},
     {value:3, icon:'ion-ios-star-outline'},
     {value:4, icon:'ion-ios-star-outline'},
     {value:5, icon:'ion-ios-star-outline'}];
	
	this.postService = function (source, params) {
	    return $http.post(BASE_URL+source,{
			params:params,
			KEY:APP_KEY
	    });
	}
    
	this.makeString = function () {  // STRING ALEATORIO
		var string = '';
		var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		for( var i=0; i < 5; i++ ){
			string += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		return string;
	}


	this.setRaiting = function (val) {  
       for (var i = 0; i < star.length; i++) {
            if(i < val) {
               star[i].icon = "ion-ios-star";
            }
            else{
               star[i].icon = "ion-ios-star-outline";
            }
       }
        return star;
   }

   this.setUUID = function (uuid){
        UUID = uuid;
   }

    this.getUUID = function (){
        return UUID;
    }

});


app.service('OneService', function($http, $ionicLoading, $cordovaSocialSharing, MainService){
	 
	 var APP_KEY ='3FB7A4912A797F6BC3D14D79D2145';   
     this.showLoading = function (source, params){
     	$ionicLoading.show({
           template: '<ion-spinner icon="android"></ion-spinner><br>Cargando...',
           duration: 5000
         });
         return $http.post(source,{
            params:params,
			KEY:APP_KEY
	     }).success(function(){
	     	 $ionicLoading.hide();
	     });
      }

     //MOMENTO
     this.shareByFacebook = function (text, folder, image) {
      folder =  folder.trim().replace(/ /g,'%20');
      var version = ionic.Platform.version();
      var platform = ionic.Platform.platform();
       if (platform == 'android'){
         if(version < 5){
           $cordovaSocialSharing.share(text, 'Dffusion', null, "http://www.newdifusion.com/androidDevelopers/system/"+folder+"/momento/"+image);
          }
          else{
            $cordovaSocialSharing.share(text, 'Dffusion', "http://www.newdifusion.com/androidDevelopers/system/"+folder+"/momento/"+image);
          }
        }else{
            $cordovaSocialSharing.share(text, 'Dffusion', "http://www.newdifusion.com/androidDevelopers/system/"+folder+"/momento/"+image);
        }
     }
      
});



















