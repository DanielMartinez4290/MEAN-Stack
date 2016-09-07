(function(){

        angular.module('TimeWaste')

    .controller('SignupController', ['$scope', '$state', '$http','$location','md5', function($scope, $state, $http, $location,md5){
                    
            $scope.createUser = function(){

                $scope.newUser.username = $scope.newUser.firstName + " " + $scope.newUser.lastName;
                
                $scope.newUser.password = md5.createHash($scope.newUser.password || '');

                //console.log($scope.newUser.password);

                $http.post('api/user/signup', $scope.newUser).success(function(response){
                    localStorage.setItem('User-Data', JSON.stringify(response));
                    $scope.loggedIn = true;
                    $location.path('/');
                }).error(function(error){
                    console.log(error);
                })            
                

            }


            
        }]);
        
}());