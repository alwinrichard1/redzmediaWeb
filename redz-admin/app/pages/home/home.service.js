app.factory('homeservice', function ($http) {
    var homeservice = {};
    homeservice.fetchImages = function () {
        return $http.post("app/pages/home/model/fetchImages.php")
            .then(function (response) {
                return response.data;
            });
    };
    homeservice.fetchCategory = function () {
        return $http.post("app/pages/home/model/fetchCategory.php")
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
    homeservice.addCategory = function (input) {
        return $http.post("app/pages/home/model/addCategory.php",input)
            .then(function (response) {
                return response.data;
            });
    };
    homeservice.editCategory = function (input) {
        return $http.post("app/pages/home/model/editCategory.php",input)
            .then(function (response) {
                return response.data;
            });
    };
    return homeservice;
});