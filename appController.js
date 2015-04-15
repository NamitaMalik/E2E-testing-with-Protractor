/**
 * Created by namita on 12/4/15.
 */

var creditCardApp = angular.module('creditCardApp', []);

creditCardApp.controller('CardController', ['$scope', function($scope) {
    $scope.data = {checkCard:"", cardNumber:""};
    $scope.alert = function(text){
        if(isNaN($scope.data.cardNumber)|| !$scope.data.cardNumber){
            $scope.errorMessage="Please enter a valid credit card number";
            $scope.successMessage="";
        }
        else{
            $scope.successMessage = "Your credit card number" + " " + text + " has been saved with us.";
            $scope.errorMessage = "";
        }
    };
    $scope.checkClicked = function(){
        if($scope.data.checkCard==="No"){
            $scope.data.cardNumber="";
        }
    };


}]);