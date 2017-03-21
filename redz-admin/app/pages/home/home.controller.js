app.controller('home.controller', function ($scope, $rootScope, homeservice, $mdDialog, $mdToast, mainservice) {

    /*FETCH IMAGES FROM DB */
    homeservice.fetchImages().then(function (response) {
        $scope.images = response;
    });

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

    /**LOGOUT */
    $scope.logout = function (ev) {
        var confirm = $mdDialog.confirm()
            .title('Would you like to logout?')
            .ariaLabel('Lucky day')
            .targetEvent(ev)
            .ok('Logout')
            .cancel('Cancel');

        $mdDialog.show(confirm).then(function () {
            homeservice.logoutUser().then(function (response) {
                if (response == 1) {
                    var message = "Logout successfull!";
                    var logouttoast = $mdToast.simple()
                        .content(message)
                        .action('X')
                        .highlightAction(true)
                        .hideDelay(5000)
                        .position('bottom right')
                    $mdToast.show(logouttoast);
                    window.location.href = '#/login';
                }
            })
        }, function () {

        });
    }


});