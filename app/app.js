'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
  'ui.router',
  'myApp.view1',
  'myApp.view2',
   'ngAnimate',
    'resolveImages'
])

    .constant("myConfig", {
        "bannerUrl":"img/banner.jpg",
        "filmsUrl": "json/vancouver.json",
        "posterProperty": "Poster"
    })

.run(['$rootScope',function($rootScope){

    $rootScope.stateIsLoading = false;
    $rootScope.$on('$stateChangeStart', function() {
        console.log("$stateChangeStart");
        $rootScope.stateIsLoading = true;
    });
    $rootScope.$on('$stateChangeSuccess', function() {
        console.log("stateChangeSuccess");
        $rootScope.stateIsLoading = false;
    });
    $rootScope.$on('$stateChangeError', function() {
        console.log("stateChangeError");
        //catch error
    });

}])



.config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/resolveimages");
}]);





myApp.factory('FilmService',['$http','$q', function ($http, $q) {
    return {



        getFilmsWithoutCaching:function(url) {
        var def = $q.defer();

        $http.get(url)
            .success(function(response) {

                angular.forEach( response, function(value){
                    value.Poster = value.Poster+"?cache=" + Math.random();
                    console.log('value.Poster: '+value.Poster);
                });

                def.resolve(response);
            })
            .error(function() {
                def.reject("Failed to get albums");
            });
        return def.promise;
       }
    }



}]);


