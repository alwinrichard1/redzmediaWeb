app.controller('main.controller', function ($rootScope, mainservice) {

    $rootScope.logedInStatus = false;

    mainservice.checkSession().then(function (response) {
        if (response == 1) {
            console.log("Session Exist!");
            window.location.href = '#/home';
        } else {
            console.log("Session not Exist");
            window.location.href = '#/login';
        }
    })

});


/*FILE UPLOAD DIRECTIVE*/
app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function () {
                scope.$apply(function () {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);
