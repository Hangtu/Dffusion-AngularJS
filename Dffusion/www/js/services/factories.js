var app = angular.module('dffusion');





app.factory('EmpresaService2', function($http){ //MOMENTO DE LA EMPRESA
  
  var BASE_URL = "http://www.newdifusion.com/androidDevelopers/app/momentoE.php";
  var items = [];
  var count=0;
  var empresa;
  var loading=1;
   

  return {
    GetFeed: function(){
      count=0;
      return $http.post(BASE_URL,{
        contador:count,
        idempresa:empresa
      }).then(function(response){
        items = response.data;
        loading = items[0].loading;
        return items;
      });
    },
     GetNewUsers: function(){
      return $http.post(BASE_URL,{
        contador:count,
        idempresa:empresa
      }).then(function(response){
        items = response.data;
        loading = items[0].loading;
        return items;
      });
    },
     GetContador: function (){
         return count++;
     },
     setEmpresa: function(idempresa){
         empresa = idempresa;
     },
     getLoading: function (){
         return loading;
     },
     setLoading: function (){
          loading=1;
     }
  }
});

app.factory('CategoriaService', function($http){
  var BASE_URL = "http://www.newdifusion.com/androidDevelopers/app/categoria.php";
  var items = [];
  var count=0;
  var categoria; // categoria
  var loading=1;
   

  return {
    GetFeed: function(){
      count=0;
      return $http.post(BASE_URL,{
        contador:count,
        idcategoria:categoria,
        zona:window.localStorage['zona']
      }).then(function(response){
        items = response.data;
        loading=items[0].loading;
        return items;
      });
    },
     GetNewUsers: function(){
      return $http.post(BASE_URL,{
        contador:count,
        idcategoria:categoria,
        zona:window.localStorage['zona']
      }).then(function(response){
        items = response.data;
        loading=items[0].loading;
        return items;
      });
    },
     GetContador: function (){
         return count++;
     },
     setCategoria: function(idcategoria){
         categoria = idcategoria;
     },
     getLoading: function (){
         return loading;
     },
     setLoading: function (){
          loading=1;
     }
  }
});


  

























// EMPRESA EMPRESA EMPRESA EMPRESA EMPRESA EMPRESA


app.factory('EmpresaService', function($http){
  
  var BASE_URL = "http://www.newdifusion.com/androidDevelopers/app/momentoE.php";
  var items = [];
  var count=0;
  var empresa;
  var loading=1;
   

  return {
    GetFeed: function(){
      count=0;
      return $http.post(BASE_URL,{
        contador:count,
        idempresa:empresa
      }).then(function(response){
        items = response.data;
        loading=items[0].loading;
        return items;
      });
    },
     GetNewUsers: function(){
      return $http.post(BASE_URL,{
        contador:count,
        idempresa:empresa
      }).then(function(response){
        items = response.data;
        loading=items[0].loading;
        return items;
      });
    },
     GetContador: function (){
         return count++;
     },
     setEmpresa: function(idempresa){
         empresa = idempresa;
     },
     getLoading: function (){
         return loading;
     },
     setLoading: function (){
          loading=1;
     }
  }
});


app.factory('PersonService', function($http){
  var BASE_URL = "http://www.newdifusion.com/androidDevelopers/app/momento.php";
  var items = [];
  var count=0;
  var loading=1;
   

  return {
    GetFeed: function(){
      count=0;
      return $http.post(BASE_URL,{
        contador:count,
        city:window.localStorage['zona']
      }).then(function(response){
        items = response.data;
        loading=items[0].loading;
        return items;
      });
    },
     GetNewUsers: function(){
      return $http.post(BASE_URL,{
        contador:count,
        city:window.localStorage['zona']
      }).then(function(response){
        items = response.data;
        loading=items[0].loading;
        return items;
      });
    },
     GetContador: function (){
         return count++;
     },
     GetLoading: function (){
         return loading;
     },
     SetLoading: function (){
          loading=1;
     }
  }
});





