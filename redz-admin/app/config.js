var app = angular.module('supportApp', ["ngRoute"]);

app.config(function($routeProvider,$locationProvider) {
    $routeProvider.when("/login", {
        templateUrl: "app/pages/login/login.html",
        controller: "login.controller"
    }).when("/home", {
        templateUrl: "app/pages/home/home.html",
        controller: "home.controller"
    }).otherwise({
        redirectTo: '/login'
    });
});