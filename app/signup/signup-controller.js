(function(){

        angular.module('TimeWaste')

    .controller('SignupController', ['$scope', '$state', '$http','$location','md5', function($scope, $state, $http, $location,md5){
                    
            $scope.createUser = function(){

                $scope.newUser.username = $scope.newUser.firstName + " " + $scope.newUser.lastName;
                $scope.newUser.password = md5.createHash($scope.newUser.password || '');

                $scope.newUser.image = 'https://www.dropbox.com/s/6aosv3i1gk2m3er/gravatar-60-grey-300x300.jpg?raw=1';
                //localStorage.setItem('User-Image', JSON.stringify({"image":$scope.newUser.image}));
                localStorage.setItem('User-Image', $scope.newUser.image);
                

                //console.log($scope.newUser.password);

                $http.post('api/user/signup', $scope.newUser).success(function(response){
                    localStorage.setItem('User-Id', response._id);
                    localStorage.setItem('User-Email', response.email);
                    localStorage.setItem('User-Username', response.username);
                    localStorage.setItem('User-Password', response.password);
                    localStorage.setItem('User-Email', response.email);
                    localStorage.setItem('User-Bio', response.bio);
                    localStorage.setItem('User-Followers', response.followers);
                    localStorage.setItem('User-Following', response.following);
                    
                    //localStorage.setItem('User-Data', JSON.stringify(response));
                    $scope.loggedIn = true;
                    $location.path('/');
                }).error(function(error){
                    console.log(error);
                })            
                

            }


            
        }]);
        
}());