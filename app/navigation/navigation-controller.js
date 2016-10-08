(function(){
    angular.module('TimeWaste')
    .controller('NavigationController', ['$scope', '$http', "$state","$window", function($scope, $http, $state, $window){
        

        setInterval(function(){
            if (localStorage['User-Email']){
                $scope.loggedIn = true;
            } else {
                $scope.loggedIn = false;
            }
        },10);
    
        
        $scope.logOut = function () {
            localStorage.clear();
            $scope.loggedIn = false;
            $window.location.href='/#/login';
        }
    }]);
}());