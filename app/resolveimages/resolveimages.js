'use strict';

angular.module('myApp.view1', ['ui.router'])

    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

        $stateProvider.state('view1', {
            url: "/resolveimages",
            templateUrl: 'resolveimages/resolveimages.html',
            controller: 'View1Ctrl',
            resolve: {

                // Preload single image
                // cache var is added to url to prevent caching
                banner: ['ImageService', 'myConfig', function (ImageService, myConfig) {

                    return ImageService.preloadImage(myConfig.bannerUrl + "?cache=" + Math.random());
                }],
                // Call api to get list of films, url provided in app config object
                filmsList: ['FilmService', 'myConfig', function (FilmService, myConfig) {

                    return FilmService.getFilmsWithoutCaching(myConfig.filmsUrl+ "?cache=" + Math.random());
                }],
                // Preload list of images , filmsList must be loaded for this to be resolved,
                // path to image url provided in app config object
                posterImages: ['ImageService', 'myConfig', 'filmsList', function (ImageService, myConfig, filmsList) {
                    return filmsList.length ? ImageService.preloadImages(filmsList, myConfig.posterProperty) : '';
                }]
            }
        })
    }])


myApp.controller('View1Ctrl', ['$scope', 'banner', 'filmsList', 'myConfig', function ($scope, banner, filmsList, myConfig) {
    $scope.banner = banner;
    $scope.filmsList = filmsList;


}]);