app.factory('mainService', function($http) {
    var mainService = {};

    mainService.sendMail = function(input) {

        
        return $http.post("sendmail.php",input)
            .then(function(response) {
                return response.data;
            });
    };
    return mainService;
});