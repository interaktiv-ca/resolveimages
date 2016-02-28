var resolveImages = angular.module('resolveImages', []);

resolveImages.factory('ImageService',['$http','$q','$timeout', function ($http, $q,$timeout) {
    return {

        preloadImage: preloadImage,
        preloadImages:preloadImages

    }

    // Load single image
    function preloadImage(url){


        var defer = $q.defer();

        angular.element(new Image()).bind('load', function () {
            defer.resolve(url);
        }).bind('error', function () {
            defer.reject("Failed to load cover");
        }).attr('src', url);

        return defer.promise;
    }


// load multiple images from array of objects
    function preloadImages(data,path) {

        var defer = $q.defer();
        var promises = [];

        function lastTask(){
            defer.resolve(data);
        }

        angular.forEach( data, function(value){
            promises.push(preloadImage(value[path]));
        });

        $q.all(promises).then(lastTask);

        return defer.promise;
    }




}]);

