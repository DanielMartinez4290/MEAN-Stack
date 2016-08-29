(function(){
    angular.module('TimeWaste')
.controller('SignupController', ['$scope', '$state', '$http','$location', function($scope, $state, $http, $location){
        
        $scope.createUser = function(){

            $http.post('api/user/signup', $scope.newUser).success(function(response){
            	localStorage.setItem('User-Data', JSON.stringify(response));
                $scope.loggedIn = true;
                $location.path('/#');
            }).error(function(error){
                console.log(error);
            })
        }


        
    }]);
}());