(function(){
    angular.module('TimeWaste')
    .controller('MainController', ['$scope', '$http', '$interval', '$window','$location', 
                        function (  $scope,   $http,   $interval, $window, $location){
    
        if (localStorage['User-Email'] !== undefined){
            //$scope.user = JSON.parse(localStorage['User-Data']);
            $scope.userId = localStorage['User-Id'];
            $scope.userImage = localStorage['User-Image'];
            $scope.userEmail = localStorage['User-Email'];
            $scope.userUsername = localStorage['User-Username'];
            $scope.userPassword = localStorage['User-Password'];
            $scope.userBio = localStorage['User-Bio'];
            $scope.userFollowers = localStorage['User-Followers'];
            $scope.userFollowing = localStorage['User-Following'];
            //$scope.userImage = {"image":'https://www.dropbox.com/s/6aosv3i1gk2m3er/gravatar-60-grey-300x300.jpg?raw=1'};
            //$scope.userImage = JSON.parse(localStorage['User-Image']) || undefined;
        }
        else{
            $window.location.href='/#/login';
            //$location.path('/login');
        }



        $http.get('api/users/get').then(function(response){
            $scope.users = response.data;
            //console.log($scope.users);
            
            
            var notFollowedUsers = [];
            var flag = 0;

            for(var i = 0, len = $scope.users.length; i < len; i++){
                //console.log($scope.users[i]._id);
                flag = 0;
                
                
                    for(var j = 0, len2 = $scope.userFollowing.length; j < len2; j++){
                        //console.log($scope.userFollowing[j]._id);

                        if($scope.userFollowing[j].userId==$scope.users[i]._id){
                            flag = 1;
                            //console.log("tripped");
                        }
                    }

                
                

                if(flag==0){
                    //console.log($scope.users[i]._id);
                    notFollowedUsers.push($scope.users[i]);
                }
                
            }
            $scope.notFollowed = notFollowedUsers;
            //console.log(notFollowedUsers);
            

        })

        
        
        $scope.follow = function(userId, wasterId) {
            console.log("follow tripped");
            request = { userId: userId,
                     wasterId: wasterId};
                     //console.log(request);
            $http.post('api/users/follow', request).then(function(response){
                console.log(response.data);
                console.log(response.data.following);
                //localStorage.setItem('User-Following', JSON.stringify(response.data.following[0]));
                localStorage.setItem('User-Following', JSON.stringify(response.data.following));
                //localStorage.clear();
                //localStorage.setItem('User-Data', JSON.stringify(response.data));
                //$scope.userImage = JSON.parse(localStorage['User-Image']) || undefined;
                //$location.path('/');
                //$window.location.reload();
            })
        }
        
                            
        $scope.updateStatus = function(){
            //console.log($scope.userId);
            
               var request = {
                    user: $scope.userUsername || $scope.userEmail,
                    userId: $scope.userId,
                    content: $scope.newWaste
               }
               //console.log(request);
               
               $http.post('api/waste/post', request).success(function(response){
                    //console.log(response);
                    //$scope.wastes = response;
                    $window.location.reload();
               }).error(function(error){
                    console.log("Error in Update Status");
                    console.error(error);
               })
            
        };
        

        function getWastes (initial){
			var data = {};
            data.following = [];

            
			if ($scope.userFollowing==""){
                data.following.push({userId:$scope.userId});
				//data.following = {userId: $scope.userId};
                //data.following = angular.copy($scope.user._id);
			}
            else{
                
                data.following = JSON.parse(angular.copy($scope.userFollowing));
                data.following.push({userId:$scope.userId});
                
                console.log(data.following);
                //data.following = {userId: $scope.userId};
                //data.following.push($scope.userFollowing);
                //data.following = angular.copy($scope.userFollowing);
                
                
                
            }
            
			//console.log(data);
            
           $http.post('api/waste/get', data).success(function (response){
                if (initial){
                    $scope.wastes = response;
                    //console.log($scope.wastes);
                } else {
                    if (response.length > $scope.wastes.length){
                    $scope.incomingWastes = response;
                    }
                }
           })


            
        };
/*

        $interval(function(){
            getWastes(false);
            if ($scope.incomingWastes){
            $scope.difference = $scope.incomingWastes.length - $scope.wastes.length;
            }
            //console.log("this is working")
        }, 5000);
*/
                            
        $scope.setNewWastes = function () {
            $scope.wastes = angular.copy($scope.incomingWastes);
            $scope.incomingWastes = undefined;
        }
                            
       //Init
        getWastes(true);
                            
        
    }]);
}());