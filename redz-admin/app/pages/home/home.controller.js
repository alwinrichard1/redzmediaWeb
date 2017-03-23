app.controller('home.controller', function ($scope, $rootScope, homeservice, $mdDialog, $mdToast, mainservice) {

    /*FETCH IMAGES FROM DB */

    $rootScope.fetchImages = function () {
        homeservice.fetchImages().then(function (response) {
            $scope.images = response;
        });
    }
    $rootScope.fetchImages();

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
        homeservice.fetchCategory().then(function (response) {
            $scope.categories = response;
        });
        $scope.submitBtnLabel = "Upload Image";
        $scope.submitBtnStatus = false;
        /**UPLOAD FILE */
        $scope.uploadFile = function () {
            var file = $scope.myFile;
            if (file == undefined) {
                var message = "Please select image file";
                var alerttoast = $mdToast.simple()
                    .content(message)
                    .action('X')
                    .highlightAction(true)
                    .hideDelay(5000)
                    .position('bottom right')
                $mdToast.show(alerttoast);
            } else {
                var file_type = file.type.toLowerCase();
                if (file_type == 'image/png' || file_type == 'image/jpg' || file_type == 'image/jpeg' || file_type == 'image/gif') {

                    var file = $scope.myFile;
                    var uploadUrl = "app/pages/home/model/uploadImage.php";
                    var image_category = $scope.image_category;
                    var image_name = 'IMG_' + Math.floor((Math.random() * 1000000) + 1);
                    var current_date = new Date();
                    $scope.submitBtnLabel = "Uploading image. Please wait...";
                    $scope.submitBtnStatus = true;
                    var waitMessage = "Uploading image. Please wait...";
                    var alerttoast = $mdToast.simple()
                        .content(waitMessage)
                        .action('X')
                        .highlightAction(true)
                        .hideDelay(5000)
                        .position('bottom right')
                    $mdToast.show(alerttoast);
                    homeservice.uploadFileToUrl(file, uploadUrl, image_category, image_name, current_date).then(function (response) {
                        if (response.data == 1) {
                            $mdDialog.hide();
                            setTimeout(function () {
                                $scope.$apply(function () {
                                    $rootScope.fetchImages();
                                });
                            }, 50);
                            var message = "Image Updloaded successfully";
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
                } else {
                    var message = "Please select a image file. This is '" + file_type + "' file";
                    var alerttoast = $mdToast.simple()
                        .content(message)
                        .action('X')
                        .highlightAction(true)
                        .hideDelay(5000)
                        .position('bottom right')
                    $mdToast.show(alerttoast);
                }
            }
        };


        $scope.hide = function () {
            $mdDialog.hide();
        };
    }


    /**--------------------------------------------DELETE IMAGE----------------------*/
    $scope.deleteImage = function (image, ev) {
        var confirm = $mdDialog.confirm()
            .title('Would you like to delete ' + image.image_name + '?')
            .textContent('All of the details related to this image will be deleted')
            .ariaLabel('Lucky day')
            .targetEvent(ev)
            .ok('Delete')
            .cancel('Cancel');
        $mdDialog.show(confirm).then(function () {
            var input = {
                "image_id": image.image_id
            }
            var waitMessage = "Deleting image. Please wait...";
            var alerttoast = $mdToast.simple()
                .content(waitMessage)
                .action('X')
                .highlightAction(true)
                .hideDelay(5000)
                .position('bottom right')
            $mdToast.show(alerttoast);
            homeservice.deleteImage(input).then(function (response) {
                if (response == 1) {
                    $mdDialog.hide();
                    setTimeout(function () {
                        $scope.$apply(function () {
                            $rootScope.fetchImages();
                        });
                    }, 50);
                    var message = "Image Deleted successfully";
                    var alerttoast = $mdToast.simple()
                        .content(message)
                        .action('X')
                        .highlightAction(true)
                        .hideDelay(5000)
                        .position('bottom right')
                    $mdToast.show(alerttoast);
                    $rootScope.selectedTab = 1;
                } else {
                    alert("something went wrong");
                }
            })
        }, function () {

        });
    }

    /**-----------------------CHANGE IMAGE CATEGORY------------------------------*/
    $scope.categoryChange = function (category_id, image_id) {
        var input = {
            "category_id": category_id,
            "image_id": image_id
        }
        var message = "Changing image category. Please wait...";
        var alerttoast = $mdToast.simple()
            .content(message)
            .action('X')
            .highlightAction(true)
            .hideDelay(5000)
            .position('bottom right')
        $mdToast.show(alerttoast);
        homeservice.categoryChange(input).then(function (response) {
            if (response == 1) {
                $mdDialog.hide();
                setTimeout(function () {
                    $scope.$apply(function () {
                        $rootScope.fetchImages();
                    });
                }, 50);
                var message = "Category changed successfully";
                var alerttoast = $mdToast.simple()
                    .content(message)
                    .action('X')
                    .highlightAction(true)
                    .hideDelay(5000)
                    .position('bottom right')
                $mdToast.show(alerttoast);
                $rootScope.selectedTab = 1;
            } else {
                alert("something went wrong");
            }
        })
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
            var waitMessage = "Uploading categoty. Please wait...";
            var alerttoast = $mdToast.simple()
                .content(waitMessage)
                .action('X')
                .highlightAction(true)
                .hideDelay(5000)
                .position('bottom right')
            $mdToast.show(alerttoast);
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
            var waitMessage = "Updating Category. Please wait...";
            var alerttoast = $mdToast.simple()
                .content(waitMessage)
                .action('X')
                .highlightAction(true)
                .hideDelay(5000)
                .position('bottom right')
            $mdToast.show(alerttoast);
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
            var waitMessage = "Please wait...";
            var alerttoast = $mdToast.simple()
                .content(waitMessage)
                .action('X')
                .highlightAction(true)
                .hideDelay(5000)
                .position('bottom right')
            $mdToast.show(alerttoast);
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