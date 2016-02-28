'use strict';

angular.module('myApp.view2', ['ui.router'])

    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

        $stateProvider.state('view2', {
            url: "/resolvedataonly",
            templateUrl: 'resolvedataonly/resolvedataonly.html',
            controller: 'View2Ctrl',
            resolve: {

                // Call api to get list of films, url provided in app config object
                filmsList: ['FilmService', 'myConfig', function (FilmService, myConfig) {

                    return FilmService.getFilmsWithoutCaching(myConfig.filmsUrl);
                }]
            }
        });
    }])

    .controller('View2Ctrl', ['$scope', 'filmsList', function ($scope, filmsList) {
        $scope.banner = 'img/banner.jpg' + "?cache=" + Math.random();
        $scope.filmsList = filmsList;
    }]);