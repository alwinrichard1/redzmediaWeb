app.controller('main.controller', function($rootScope,mainservice) {
    
    $rootScope.logedInStatus = false;

    mainservice.checkSession().then(function(response){
        if(response==1){
            console.log("Session Exist!");
            window.location.href = '#/home';
        }
        else{
            console.log("Session not Exist");
            window.location.href = '#/login';
        }
    })

});