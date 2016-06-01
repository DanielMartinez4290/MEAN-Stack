(function(){
    angular.module('TimeWaste')
.controller('ProfileController', ['$scope', '$state', '$http','$window','$stateParams', function($scope, $state, $http, $window,$stateParams){

	var userInfo = {};
	var userWastes = {};
			
   $http.get('api/users/getUserInfo/'+$stateParams.id, userInfo).success(function (response){
      $scope.userInfo = response;
   });

   $http.get('api/waste/getUserWastes/'+$stateParams.id, userWastes).success(function (response){
      $scope.userWastes = response;
   });
    
    
		
    }]);
}());