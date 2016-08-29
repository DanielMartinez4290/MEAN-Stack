(function(){
    angular.module('TimeWaste')
.controller('LoginController', ['$scope', '$state', '$http','$window','$location', function($scope, $state, $http, $window, $location){

		if (localStorage['User-Data']){
            $scope.loggedIn = true;
        } else {
            $scope.loggedIn = false;
        }
        
        $scope.logUserIn = function(){
            
            $http.post('api/user/login', $scope.user).success(function(response){
            	localStorage.setItem('User-Data', JSON.stringify(response));
                $scope.loggedIn = true;
                //$window.location.href='/#';
                $location.path('/#');
            	
            }).error(function(error){
                console.log(error);
            })
        }

    }]);
}());