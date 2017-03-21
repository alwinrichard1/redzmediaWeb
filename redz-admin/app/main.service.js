app.factory('mainservice', function ($http) {
    var mainservice = {};

    mainservice.checkSession = function () {
        return $http.post("app/checkSession.php")
            .then(function (response) {
                return response.data;
            });
    };

    return mainservice;
});