var app = angular.module('dffusion', ['ionic','ngCordova'])

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
  if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
   }
    
   if(window.StatusBar) {
      StatusBar.styleDefault();
   }
            
  });

})

.config(function($ionicConfigProvider) {
  $ionicConfigProvider.tabs.style('standard'); //Makes them all look the same across all OS
  $ionicConfigProvider.tabs.position('bottom')
  $ionicConfigProvider.navBar.alignTitle('center');
  $ionicConfigProvider.views.transition('none');
})
.config(function($stateProvider, $urlRouterProvider) {
    
  $stateProvider
  .state('tabs', {  //Clase Padre Del Contenido
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html",
    controller:'TablesCtrl'
  })
  .state('tabs.categorias', { // hijos
    url: '/categorias',
    views: {
      'categorias-tab': {
        templateUrl: 'templates/categorias/categorias.html'
      }
    }
  })
  .state('tabs.buscar', { // hijos
    url: '/buscar',
    views: {
      'categorias-tab': {
        templateUrl: 'templates/categorias/buscar.html',
        controller: 'SearchCtrl'
      }
    }
  })
    .state('tabs.categorias_detail', { // hijos
    url: '/categorias/:id',
    views: {
      'categorias-tab': {
        templateUrl: 'templates/categorias/categorias_detail.html',
        controller: 'CategoriaDetailCtrl'
      }
    }
  })
  .state('tabs.premium', { // hijos
    url: '/premium',
    views: {
      'categorias-tab': {
        templateUrl: 'templates/categorias/categorias_detail.html',
        controller: 'PremiumCtrl'
      }
    }
  })
  .state('tabs.empresa', { // hijos
    url: '/empresa/:id',
    views: {
      'categorias-tab': {
        templateUrl: 'templates/categorias/empresa.html',
        controller: 'EmpresaCtrl'
      }
    }
  })
  .state('tabs.galeria', { // hijos
    url: '/galeria/:id',
    views: {
      'categorias-tab': {
        templateUrl: 'templates/categorias/categorias_gallery.html',
        controller: 'GalleryCtrl'
      }
    }
  }).state('tabs.momento', { // hijos
    url: '/momento',
    views: {
      'momento-tab': {
        templateUrl: 'templates/momento/momento.html',
        controller: 'MomentoCtrl'
      }
    }
  })
  .state('tabs.momento_detail', { // hijos
    url: '/momento/:id',
    views: {
      'momento-tab': {
        templateUrl: 'templates/momento/empresa_momento.html',
        controller: 'EmpresaCtrl'
      }
    }
  })
  .state('tabs.galeria_momento', { // hijos
    url: '/galeria_momento/:id',
    views: {
      'momento-tab': {
        templateUrl: 'templates/momento/gallery_momento.html',
        controller: 'GalleryCtrl'
      }
   }
  })
  .state('tabs.more', {  // MAS TAB
    url: '/more',
    views: {
      'more-tab': {
        templateUrl: 'templates/opciones/more.html'
      }
    }
  })
  .state('tabs.ciudad', { // hijos
    url: '/ciudad',
    views: {
      'more-tab': {
        templateUrl: 'templates/opciones/more_ciudad.html',
        controller: 'CiudadCtrl'
      }
    }
  })
  .state('tabs.fastNumber', { // hijos
    url: '/fastNumber',
    views: {
      'more-tab': {
        templateUrl: 'templates/opciones/more_fastNumber.html',
        controller: 'FastNumberCtrl'
      }
    }
  }).state('tabs.about', { // hijos
    url: '/about',
    views: {
      'more-tab': {
        templateUrl: 'templates/opciones/more_about.html'
      }
    }
  }).state('tabs.account', { // ACCOUNT TAB
    url: '/account',
    views: {
      'account-tab': {
        templateUrl: 'templates/login/sign-in.html',
        controller: 'LoginCtrl'
      }
    }
  }).
  state('tabs.create', {
    url: '/create',
    views: {
      'account-tab': {
        templateUrl: 'templates/login/newCompany.html',
        controller: 'CreateCtrl'
      }
    }
  }).state('tabs.company', {
    url: '/company/:id',
     views: {
      'account-tab': {
        templateUrl: 'templates/login/company.html',
        controller: 'CompanyCtrl'
      }
    }
  }).state('tabs.changes', {
    url: '/changes/:id',
     views: {
      'account-tab': {
        templateUrl: 'templates/login/changes.html',
        controller: 'ChangesCtrl'
      }
    }
  }).state('tabs.registro', { // ACCOUNT TAB
    url: '/registro',
    views: {
      'account-tab': {
        templateUrl: 'templates/login/registro.html',
        controller: 'RegistroCtrl'
      }
    }
  })
  $urlRouterProvider.otherwise('tab/momento');
});

app.controller('TablesCtrl',function($cordovaDevice, MainService){ 
    ionic.Platform.ready(function(){
        var uuid = $cordovaDevice.getUUID();
        MainService.setUUID(uuid);
        params = {uuid:uuid};
        MainService.postService('getSesion.php', params).success(function(response){
              if(response != 'empty'){
                   window.localStorage['usuario'] = 1 ;
                   window.localStorage['idclient'] = response[0].fk_user;
                   window.localStorage['zona'] = response[0].idzona; // Zona inicial (TEPIC)
                   window.localStorage['ciudad'] =response[0].nombreZona;
               }
          });
    });
});

app.filter('tel', function () {
    return function (tel) {
        if (!tel) { return ''; }

        var value = tel.toString().trim().replace(/^\+/, '');

        if (value.match(/[^0-9]/)) {
            return tel;
        }

        var country, city, number;

        switch (value.length) {
            case 10: // +1PPP####### -> C (PPP) ###-####
                country = 1;
                city = value.slice(0, 3);
                number = value.slice(3);
                break;

            case 11: // +CPPP####### -> CCC (PP) ###-####
                country = value[0];
                city = value.slice(1, 4);
                number = value.slice(4);
                break;

            case 12: // +CCCPP####### -> CCC (PP) ###-####
                country = value.slice(0, 3);
                city = value.slice(3, 5);
                number = value.slice(5);
                break;

            default:
                return tel;
        }

        if (country == 1) {
            country = "";
        }

        number = number.slice(0, 3) + '-' + number.slice(3);

        return (country + " (" + city + ") " + number).trim();
    };
});



























