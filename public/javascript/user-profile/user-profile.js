app.controller('userProfileController', ['$scope', '$http', '$location', 'AssetTrackingService', function ($scope, $http, $location, AssetTrackingService) {
    $scope.userProducts = [];
    $scope.userProductsPresent = true;
    $scope.ctr = 0;
    $scope.productsCount = 0;
    $scope.hideSpinner = false;

    $scope.getUserProfile = function () {

        $http.get("/user-products-list").then(function (data, status) {

            if (data.data.status === "success") {
                if (data.data.trackedProducts) {
                    $scope.ctr = 0;
                    $scope.productsCount = 0;
                    $scope.userProductsPresent = true;
                    var trackedProducts = data.data.trackedProducts;

                    for (productId in trackedProducts) {
                        $scope.productsCount++;
                        $scope.getProductDetails(trackedProducts[productId]);
                    }
                } else {
                    $scope.userProductsPresent = false;
                }
            } else {
                $scope.registerErr = data.data;
            }
        });

    };

    $scope.getProductDetails = function (productId) {
        //  AssetTrackingService.getAssetDetails($scope.searchTerm);
        // Test it with Qr Code 3fdsf-324-234-fdsf
        var url = '/track/' + productId;
        $http.get(url).then(function (response) {
            if (response.data.status === "success" && !$scope.userProducts.contains(response.data.product)) {

                $scope.userProducts.push(response.data.product);
                $scope.getPaymentHistory(response.data.product.productId);
            } else {
                console.log(response.data.err ? response.data.err : response.data);
            }
            $scope.ctr++;
            if ($scope.productsCount === $scope.ctr) {
                if ($scope.userProducts.length === 0) {
                    $scope.hideSpinner = true;
                    $scope.userProductsPresent = false;
                }
            }
        });
    };

    $scope.getPaymentHistory = function (productId) {
        var url = 'payment-history/' + productId;
        $http.get(url).then(function (response) {
            if (response.data.transaction) {
                for (idx in $scope.userProducts) {
                    if ($scope.userProducts[idx].productId === response.data.transaction.productId) {
                        $scope.userProducts[idx].transaction = response.data.transaction;
                        console.log($scope.userProducts[idx]);
                    }
                }
            }
        });
    };

    $scope.trackProduct = function (product) {
        AssetTrackingService.assetData.product = product;
        $location.path("/asset-tracking");
    };

    $scope.getUserProfile();
}]);


Array.prototype.contains = function (obj) {

    var i = this.length;
    if (i == 0)
        return false;
    while (i--) {
        if (this[i].productId === obj.productId) {
            return true;
        }
    }
    return false;
}
