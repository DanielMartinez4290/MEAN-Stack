(function(){
    angular.module('TimeWaste')
    .controller('MainController', ['$scope', '$http', '$interval', '$window','$location', 
                        function (  $scope,   $http,   $interval, $window, $location){
    
        if (localStorage['User-Data'] !== undefined){
            $scope.user = JSON.parse(localStorage['User-Data']);
            console.log($scope.user);
        }
        else{
            $window.location.href='/#/login';
        }


        $http.get('api/users/get').then(function(response){
            $scope.users = response.data;
            
            var notFollowedUsers = [];
            var flag = 0;

            for(var i = 0, len = $scope.users.length; i < len; i++){
                //console.log($scope.users[i]._id);
                flag = 0;
                for(var j = 0, len2 = $scope.user.following.length; j < len2; j++){
                    //console.log($scope.user.following[j]._id);
                    if($scope.user.following[j].userId==$scope.users[i]._id){
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
                localStorage.clear();
                localStorage.setItem('User-Data', JSON.stringify(response.data));
                //$location.path('/');
                $window.location.reload();
            })
        }
        
        $scope.checkIsFollowing = function(wasterId){
            /*
            for(var i = 0, len = $scope.user.following.length; i < len; i++){
                if ($scope.user.following[i].userId === wasterId){
                    return true;
                }
            }
            return false;
            */
        }
                            
        $scope.updateStatus = function(){
            
               var request = {
                    user: $scope.user.username || $scope.user.email,
                    userId: $scope.user._id,
                    userImage: $scope.user.image,
                    content: $scope.newWaste
               }
               
               $http.post('api/waste/post', request).success(function(response){
                    //console.log(response);
                    $scope.wastes = response;
                    $window.location.reload();
               }).error(function(error){
                    console.error(error);
               })
            
        };
        
        function getWastes (initial){
			var data = {};
            
			if ($scope.user.following===undefined){
				data.following = {userId: $scope.user._id};
                //data.following = angular.copy($scope.user._id);
			}
            else{
                data.following = angular.copy($scope.user.following);
                data.following.push({userId: $scope.user._id});
            }
            
			//console.log(data);
           $http.post('api/waste/get', data).success(function (response){
                if (initial){
                    $scope.wastes = response;
                } else {
                    if (response.length > $scope.wastes.length){
                    $scope.incomingWastes = response;
                    }
                }
           })
        };
        
        $interval(function(){
            getWastes(false);
            if ($scope.incomingWastes){
            $scope.difference = $scope.incomingWastes.length - $scope.wastes.length;
            }
            //console.log("this is working")
        }, 5000);
                            
        $scope.setNewWastes = function () {
            $scope.wastes = angular.copy($scope.incomingWastes);
            $scope.incomingWastes = undefined;
        }
                            
       //Init
        getWastes(true);
                            
        
    }]);
}());