/**
 * Created by namita on 12/4/15.
 */

var creditCardApp = angular.module('creditCardApp', []);

creditCardApp.controller('CardController', ['$scope', function ($scope) {
    $scope.data = {checkCard: "", cardNumber: ""};
    $scope.save = function (text) {
        $scope.successMessage = "";
        $scope.errorMessage = "";
        if (!$scope.data.cardNumber) {
            $scope.errorMessage = "Please enter valid credit card number";
        } else {
            $scope.successMessage = "Your credit card number" + text + " has been saved with us.";
        }
    };
    $scope.checkClicked = function () {
        if ($scope.data.checkCard === "No") {
            $scope.data.cardNumber = "";
        }
    };
}]);