app.controller('home.controller', function ($scope, $rootScope, homeservice, $mdDialog, $mdToast, mainservice) {

    /*FETCH IMAGES FROM DB */
    homeservice.fetchImages().then(function (response) {
        $scope.images = response;
    });
    

    $scope.photosTab = function () {
        setTimeout(function () {
            $scope.$apply(function () {
                $rootScope.selectedTab = 0;
                console.log($rootScope.selectedTab);
            });
        }, 50);

    }

    $scope.categoryTab = function () {
        setTimeout(function () {
            $scope.$apply(function () {
                $rootScope.selectedTab = 1;
                console.log($rootScope.selectedTab);
            });
        }, 50);
    }

    /*FETCH CATEGORY FROM DB */
    $rootScope.fetchCategory = function () {
        homeservice.fetchCategory().then(function (response) {
            $scope.categories = response;
        });
    }
    $rootScope.fetchCategory();


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
    /**------------------------------------ADD IMAGE-------------------------------------- */
    /**ADD IMAGE DIALOG */
    $scope.addImage = function (ev) {
        $mdDialog.show({
                controller: addImageController,
                templateUrl: 'app/pages/home/templates/addImage.template.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false
            })
            .then(function (answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function () {
                $scope.status = 'You cancelled the dialog.';
            });
    }

    /**ADD IMAGE DIALOGE CONTROLLER */
    function addImageController($scope, $mdDialog) {
        $scope.hide = function () {
            $mdDialog.hide();
        };
    }

    /**------------------------------------ADD CATEGORY-------------------------------------- */
    $scope.addCategory = function (ev) {
        $mdDialog.show({
                controller: addCategoryController,
                templateUrl: 'app/pages/home/templates/addCategory.template.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false
            })
            .then(function (answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function () {
                $scope.status = 'You cancelled the dialog.';
            });
    }

    /**ADD CATEGORY DIALOGE CONTROLLER */
    function addCategoryController($scope, $mdDialog) {
        $rootScope.selectedTab = 1;
        $scope.submitBtnLabel = "Add Category"
        $scope.hide = function () {
            $mdDialog.hide();
        };
        $scope.uploadCategory = function () {
            var current_date = new Date();


            var input = {
                "category": $scope.new_category,
                "date": current_date
            }
            homeservice.addCategory(input).then(function (response) {
                if (response == 1) {
                    $mdDialog.hide();
                    setTimeout(function () {
                        $scope.$apply(function () {
                            $rootScope.fetchCategory();
                        });
                    }, 50);
                    var message = "Category added successfully";
                    var logouttoast = $mdToast.simple()
                        .content(message)
                        .action('X')
                        .highlightAction(true)
                        .hideDelay(5000)
                        .position('bottom right')
                    $mdToast.show(logouttoast);
                    $rootScope.selectedTab = 1;
                } else {
                    alert("something went wrong");
                }
            })
        }
    }

    /**----------------------EDIT CATEGORY------------------------------------------ */
    $scope.editCategory = function (category, ev) {
        $rootScope.selectedTab = 1;
        $rootScope.new_category = category.category;
        $rootScope.id = category.category_id;
        $mdDialog.show({
                controller: editCategoryController,
                templateUrl: 'app/pages/home/templates/editCategory.template.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false
            })
            .then(function (answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function () {
                $scope.status = 'You cancelled the dialog.';
            });
    }

    /**EDIT CATEGORY DIALOGE CONTROLLER */
    function editCategoryController($scope, $mdDialog) {
        $scope.new_category = $rootScope.new_category;
        $scope.submitBtnLabel = "Edit Category"
        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.updateCategory = function () {
            var input = {
                "new_category": $scope.new_category,
                "id": $rootScope.id
            }
            homeservice.editCategory(input).then(function (response) {
                if (response == 1) {
                    setTimeout(function () {
                        $scope.$apply(function () {
                            $rootScope.fetchCategory();
                        });
                    }, 50);
                    $mdDialog.hide();
                    var message = "Category updated successfully";
                    var logouttoast = $mdToast.simple()
                        .content(message)
                        .action('X')
                        .highlightAction(true)
                        .hideDelay(5000)
                        .position('bottom right')
                    $mdToast.show(logouttoast);
                    $rootScope.selectedTab = 1;
                } else {
                    alert("something went wrong");
                }
            });
        }
    }

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