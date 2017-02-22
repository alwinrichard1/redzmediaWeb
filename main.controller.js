var app = angular.module('myApp', []);

app.controller('main.controller', function ($scope, mainService) {
    $scope.sendMail = function () {
         var input = {
            "name":$scope.name,
            "email":$scope.email,
            "mobile":$scope.mobile,
            "message":$scope.message
        }
        $scope.sendLoadinStatus = true;
        mainService.sendMail(input).then(function (response) {

            if(response==1){
                alert('message sent successfully!');
                $scope.sendLoadinStatus = false;
            }
            else if(response==0){
                alert('Something went wrong, try again after some time!');
                $scope.sendLoadinStatus = false;
            }
            else{
                alert('Something went wrong, contact developer!');
                $scope.sendLoadinStatus = false;
            }

            console.log(response);
        });


    }
})