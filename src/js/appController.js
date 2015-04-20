/**
 * Created by namita on 12/4/15.
 */

var creditCardApp = angular.module('creditCardApp', []);

creditCardApp.controller('CardController', ['$scope', function ($scope) {
    $scope.data = {checkCard: "", cardNumber: ""};
    $scope.save = function () {
        $scope.successMessage = "";
        $scope.errorMessage = "";
        if (!$scope.data.cardNumber) {
            $scope.errorMessage = "Please enter valid credit card number";
        } else if (isNaN($scope.data.cardNumber)) {
            $scope.errorMessage = "Credit card number can have only Numbers(0-9)";
        } else {
            $scope.successMessage = "Your credit card number" + $scope.data.cardNumber + " has been saved with us.";
            $scope.data.cardNumber = "";
        }
    };
    $scope.checkClicked = function () {
        if ($scope.data.checkCard === "No") {
            $scope.data.cardNumber = "";
        }
    };
}]);