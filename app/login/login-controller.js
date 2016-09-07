(function(){
    angular.module('TimeWaste')
.controller('LoginController', ['$scope', '$state', '$http','$window','$location','md5', function($scope, $state, $http, $window, $location,md5){

		if (localStorage['User-Data']){
            $scope.loggedIn = true;
        } else {
            $scope.loggedIn = false;
        }
        
        $scope.logUserIn = function(){
            

            $scope.user.password = md5.createHash($scope.user.passUn || '');
            
            $http.post('api/user/login', $scope.user).success(function(response){

                
                if(response.error=="Wrong Login Info"){
                    $scope.errorMessage = true;
                }
                else{
                    $scope.errorMessage = false;
                    localStorage.setItem('User-Data', JSON.stringify(response));
                    $scope.loggedIn = true;
                    $location.path('/#');

                }
            	
            	
            }).error(function(error){
                console.log(error);
            })
        }

    }]);
}());