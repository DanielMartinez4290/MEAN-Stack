(function(){
    angular.module('TimeWaste')
.controller('LoginController', ['$scope', '$state', '$http','$window', function($scope, $state, $http, $window){

		if (localStorage['User-Data']){
            $scope.loggedIn = true;
        } else {
            $scope.loggedIn = false;
        }
        
        $scope.logUserIn = function(){
            
            $http.post('api/user/login', $scope.user).success(function(response){
            	localStorage.setItem('User-Data', JSON.stringify(response));
                $scope.loggedIn = true;
                $window.location.href='/#';
            	
            }).error(function(error){
                console.log(error);
            })
        }
    }]);
}());