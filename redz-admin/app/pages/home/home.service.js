app.factory('homeservice', function ($http) {
    var homeservice = {};
    homeservice.fetchImages = function () {
        return $http.post("app/pages/home/model/fetchImages.php")
            .then(function (response) {
                return response.data;
            });
    };
    homeservice.fetchCategory = function () {
        return $http.post("app/pages/home/model/fetchCategory.php")
            .then(function (response) {
                return response.data;
            });
    };
    homeservice.logoutUser = function () {
        return $http.post("app/pages/home/model/logoutUser.php")
            .then(function (response) {
                return response.data;
            });
    };
    homeservice.addCategory = function (input) {
        return $http.post("app/pages/home/model/addCategory.php", input)
            .then(function (response) {
                return response.data;
            });
    };
    homeservice.editCategory = function (input) {
        return $http.post("app/pages/home/model/editCategory.php", input)
            .then(function (response) {
                return response.data;
            });
    };
    homeservice.uploadImage = function (input) {
        return $http.post("app/pages/home/model/uploadImage.php", input)
            .then(function (response) {
                return response.data;
            });
    };
    homeservice.deleteImage = function (input) {
        return $http.post("app/pages/home/model/deleteImage.php", input)
            .then(function (response) {
                return response.data;
            });
    };
    homeservice.categoryChange = function (input) {
        return $http.post("app/pages/home/model/categoryChange.php", input)
            .then(function (response) {
                return response.data;
            });
    };
    homeservice.uploadFileToUrl = function (file, uploadUrl, image_category, image_name, current_date) {
        var fd = new FormData();
        fd.append('file', file);
        fd.append('image_category', image_category);
        fd.append('image_name', image_name);
        fd.append('current_date', current_date);
        return $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {
                'Content-Type': undefined,
                'Process-Data': false
            }
        }).success(function (response) {
            return response.data;
        }).error(function () {
            alert("error");
        });
    };
    return homeservice;
});