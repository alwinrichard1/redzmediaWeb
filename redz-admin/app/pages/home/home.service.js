app.factory('homeservice', function ($http) {
    var homeservice = {};

    homeservice.fetchImages = function () {
        return $http.post("app/pages/home/model/fetchImages.php")
            .then(function (response) {
                return response.data;
            });
    };

    homeservice.logoutUser = function () {
        return $http.post("app/pages/home/model/logoutUser.php")
            .then(function (response) {
                return response.data;
            });
    };

    return homeservice;
});