app.controller('login.controller', function($scope,loginservice,$rootScope) {
    
    $scope.login = function(){
        var input = {
            "username":$scope.username,
            "password":$scope.password
        }

        loginservice.checkUser(input).then(function(response) {
            console.log(response);
            if(response==0){
                alert("Dont try to hack redzmedia!");
            }
            else{
                alert("Welcome back "+response.name);
                setTimeout(function() {
                    $scope.$apply(function() {
                        $rootScope.logedInStatus = true;
                    });

                }, 100);
            }
        });

    }

});