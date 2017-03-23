app.factory('mainService', function($http) {
    var mainService = {};

    mainService.sendMail = function(input) {
        return $http.post("model/sendmail.php",input)
            .then(function(response) {
                return response.data;
            });
    };

    mainService.fetchCategory = function () {
        return $http.post("model/fetchCategory.php")
            .then(function (response) {
                return response.data;
            });
    };

    mainService.fetchImages = function () {
        return $http.post("model/fetchImages.php")
            .then(function (response) {
                return response.data;
            });
    };


    return mainService;
});