(function(){
    angular.module('TimeWaste')
.controller('SignupController', ['$scope', '$state', '$http','md5', function($scope, $state, $http,md5){
        
        $scope.createUser = function(){
        	
            $http.post('api/user/signup', $scope.newUser).success(function(response){
            
            }).error(function(error){
                console.log(error);
            })
        }


        
    }]);
}());