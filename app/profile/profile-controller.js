(function(){
    angular.module('TimeWaste')
.controller('ProfileController', ['$scope', '$state', '$http','$window','$stateParams','$q', function($scope, $state, $http, $window,$stateParams, $q){

	 var userInfo = {};
	 var userWastes = {};
   var userFollowerInfo = {};
   var userFollowerArray = {};

	
  function getUserInfo(){
    var promises = [];
    var followerObj = {};
    var followerObjArray = [];

    $http.get('api/users/getUserInfo/'+$stateParams.id, userInfo).success(function (response){

      $scope.userInfo = response;

      //console.log($scope.userInfo);


      for(var i = 0, len = $scope.userInfo.following.length; i < len; i++){
        //console.log($scope.userInfo.following[i]);

        promises.push($http.get('api/users/getUserInfo/'+$scope.userInfo.following[i].userId, userFollowerInfo).then(function(followerInfo){

          followerObj = {username:followerInfo.data.username,
                         image: followerInfo.data.image,
                         id: followerInfo.data._id};
          followerObjArray.push(followerObj);
          
        },function(status){
          console.log(status);
        }));

      }

      $q.all(promises).then(function(){
        $scope.followerObjArray = followerObjArray;
        //console.log(followerObjArray);
      });
      
    });

    

  }		

  function getUserWastes(){

      $http.get('api/waste/getUserWastes/'+$stateParams.id, userWastes).success(function (response){
          $scope.userWastes = response;
       });

  }

   
  //Init
  getUserInfo(true);
  getUserWastes(true);
    
    
		
    }]);
}());