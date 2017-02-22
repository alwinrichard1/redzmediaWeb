var app = angular.module('myApp', []);

app.controller('main.controller', function ($scope, mainService) {
    $scope.sendBtn = "Send message"
    $scope.sendMail = function () {
         var input = {
            "name":$scope.name,
            "email":$scope.email,
            "mobile":$scope.mobile,
            "message":$scope.message
        }
        $scope.sendLoadinStatus = true;
        $scope.sendBtn = "Sending message! Please wait..."
        mainService.sendMail(input).then(function (response) {
            console.log(response);
            if(response==1){
                alert('message sent successfully!');
                $scope.sendLoadinStatus = false;
                $scope.name = '';
                $scope.email = '';
                $scope.mobile = '';
                $scope.message = '';
                $scope.sendBtn = "Send message"
            }
            else if(response==0){
                alert('Something went wrong, try again after some time!');
                $scope.sendLoadinStatus = false;
                $scope.sendBtn = "Send message"
            }
            else{
                alert('Something went wrong, contact developer!');
                $scope.sendLoadinStatus = false;
                $scope.sendBtn = "Send message"
            }
        });


    }
})