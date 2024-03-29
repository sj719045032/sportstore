angular.module("sportsStoreAdmin")
    .constant("authUrl", "http://localhost:4444/users/login")
    .constant("ordersUrl", "http://localhost:4444/orders")
    .controller("authCtrl", function ($scope, $http, $location, authUrl) {
        $scope.authenticate = function (username, password) {
            $http.post(authUrl, {
                username: username,
                password: password
            }).success(function (data) {
                $location.path("/main");
            }).error(function (error) {
                $scope.authenticationError = error;
            });
        }
    })
    .controller("mainCtrl", function ($scope) {
        $scope.screens = ["Products", "Orders"];
        $scope.current = $scope.screens[0];
        $scope.setScreen = function (index) {
            $scope.current = $scope.screens[index];
        };
        $scope.getScreen = function () {
            return $scope.current == "Products" ? "views/adminProducts.html" : "views/adminOrders.html";

        }
    })
    .controller("ordersCtrl", function ($scope, $http, ordersUrl) {
        $http.get(ordersUrl).success(function (data) {
            $scope.orders = data;
        }).error(function (err) {
            $scope.error=err;
        });

        $scope.selectedOrder;
        $scope.selectOrder= function (order) {
            $scope.selectedOrder=order;
        };
        $scope.calculateTotal= function (order) {
            var total=0;
            for(var i=0;i<order.products.length;i++){
                total+=order.products[i].price*order.products[i].count;
            }
            return total;
        }
    });