app.factory('loginservice', function ($http) {
    var loginservice = {};

    loginservice.checkUser = function (input) {
        return $http.post("app/pages/login/login.php", input)
            .then(function (response) {
                return response.data;
            });
    };

    return loginservice;
});