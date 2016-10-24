(function(){
    angular.module('TimeWaste')
.controller('LoginController', ['$scope', '$state', '$http','$window','$location','md5', function($scope, $state, $http, $window, $location,md5){

		if (localStorage['User-Id']){
            $scope.loggedIn = true;
        } else {
            $scope.loggedIn = false;
        }
        
        $scope.logUserIn = function(){
            

            $scope.user.password = md5.createHash($scope.user.passUn || '');
            console.log($scope.user.password);
            
            $http.post('api/user/login', $scope.user).success(function(response){
                console.log(response);

                
                if(response.error=="Wrong Login Info"){
                    $scope.errorMessage = true;
                }
                else{
                    $scope.errorMessage = false;
                    localStorage.setItem('User-Id', response._id);
                    localStorage.setItem('User-Email', response.email);
                    localStorage.setItem('User-Username', response.username);
                    localStorage.setItem('User-Password', response.password);
                    localStorage.setItem('User-Email', response.email);
                    localStorage.setItem('User-Bio', response.bio);
                    localStorage.setItem('User-Followers', JSON.stringify(response.followers));
                    localStorage.setItem('User-Following', JSON.stringify(response.following));
                    localStorage.setItem('User-Image', response.image);
                    $scope.loggedIn = true;
                    $location.path('/#');

                }
            	
            	
            }).error(function(error){
                console.log(error);
            })
        }

    }]);
}());