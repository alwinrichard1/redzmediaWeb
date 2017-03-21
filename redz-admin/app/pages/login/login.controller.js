app.controller('login.controller', function ($scope, loginservice, $rootScope,$mdToast,mainservice) {

     /**CHECK SESSION */
    mainservice.checkSession().then(function (response) {
        if (response == 1) {
            console.log("Session Exist!");
            window.location.href = '#/home';
        } else {
            console.log("Session not Exist");
            window.location.href = '#/login';
        }
    })


    /**LOGIN USER */
    $scope.login = function () {
        var input = {
            "username": $scope.username,
            "password": $scope.password
        }

        loginservice.checkUser(input).then(function (response) {
            console.log(response);
            if (response == 0) {
                alert("Dont try to hack redzmedia!");
            } else {
                var message = "Welcome back " + response.name;
                var logouttoast = $mdToast.simple()
                    .content(message)
                    .action('X')
                    .highlightAction(true)
                    .hideDelay(5000)
                    .position('bottom right')
                $mdToast.show(logouttoast);
                window.location.href = '#/home';
                setTimeout(function () {
                    $scope.$apply(function () {
                        $rootScope.logedInStatus = true;
                    });

                }, 100);
            }
        });

    }

});