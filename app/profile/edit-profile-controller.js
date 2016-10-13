(function(){
    angular.module('TimeWaste')
    .controller('EditProfileController', ['Upload', '$scope', '$state', '$http','$location',               
                            function(      Upload,   $scope,   $state,   $http, $location){
    
                //$scope.user = JSON.parse(localStorage['User-Data']) || undefined;
                //$scope.userImage = JSON.parse(localStorage['User-Image']) || undefined;
                
                $scope.user = {"userId":localStorage['User-Id']};
                $scope.user.userImage = localStorage['User-Image'];
                $scope.user.userEmail = localStorage['User-Email'];
                $scope.user.userUsername = localStorage['User-Username'];
                $scope.user.userPassword = localStorage['User-Password'];
                $scope.user.userBio = localStorage['User-Bio'];
                $scope.user.userFollowers = localStorage['User-Followers'];
                $scope.user.userFollowing = localStorage['User-Following'];
            
                                
                $scope.$watch(function(){
                    return $scope.file
                }, function (){
                   $scope.upload($scope.file); 
                });
                                
                console.log($scope.user);
                
                
                $scope.upload = function (file) {
                    if (file){
                        Upload.upload({
                            url: 'api/profile/editPhoto',
                            method: 'POST',
                            data: {userId: $scope.user.userId},
                            file: file
                        }).progress(function(evt){
                            console.log("Image currently being uploaded");
                        }).success(function(data){
                            console.log("Image Uploaded");
                            localStorage.setItem('User-Image', data.image);
                            $scope.user.userImage = data.image;
                        }).error(function(error){
                            console.log(error);
                        })
                    }
                };
                

                $scope.updateUserInfo = function(){
                    //console.log($scope.user);

                    var request = {
                        userId: $scope.user.userId,
                        bio: $scope.user.userBio,
                        email: $scope.user.userEmail,
                        username: $scope.user.userUsername
                    }
                    
                    console.log(request);
                    $http.post('api/profile/updateUserInfo', request).success(function(response){
                        //localStorage.setItem('User-Data', JSON.stringify(response));
                        localStorage.setItem('User-Email', response.email);
                        localStorage.setItem('User-Username', response.username);
                        localStorage.setItem('User-Bio', response.bio);
                        console.log("Profile Updated");
                        $location.path('/');
                    }).error(function(error){
                        console.log(error);
                    });

                }
                            
                            }]);
}());