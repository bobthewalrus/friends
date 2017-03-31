var app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider){
    $routeProvider
    .when('/friends', {templateUrl: '/partials/showall.html'})
    .when('/showfriend/:id', {templateUrl: '/partials/showone.html'})
    .when('/edit/:id', {templateUrl: '/partials/edit.html'})
    .when('/new', {templateUrl: '/partials/new.html'})
    .when('/', {templateUrl:'/partials/main.html'})
    .otherwise({redirectTo: '/friends'})
})

app.factory('friendsFactory', function($http, $routeParams){
    var factory = {};

    factory.showFriends = function(callback){
        $http.get('/friends').then(function(data){
            callback(data.data);
        })
    }
    factory.showOne = function(callback){
        id=$routeParams.id
        $http.get('/showfriend/'+id).then(function(data){
            callback(data);
        })

    }
    factory.createFriend= function(newFriend, callback){
        $http.post('/friend/new', newFriend).then(function(res){
            console.log(res.data);
            callback(res.data);
        })
    }
    factory.updateFriend = function(friend, callback){
        id=$routeParams.id
        $http.put('/updatefriend/'+id, friend).then(function(data){
            callback(data);
        })
    }
    factory.edit = function(callback){
        id=$routeParams.id
        $http.get('/friend/edit/'+id).then(function(data){
            callback(data);
        })
    }
    factory.delete = function(friend, callback){
        $http.delete('/delete/'+friend._id).then(function(res){
            console.log(res.data);
            callback(res.data);

        })
    }
    return factory;
});

app.controller('friendsController', ['friendsFactory', '$scope', '$routeParams', '$location', function(friendsFactory, $scope, $routeParams, $location){
    $scope.friends = [];

    $scope.createFriend = function(){
        $scope.errors = {};
        var friend = $scope.newbie;

        friendsFactory.createFriend(friend, function(data){
            if(data.errors){
                $scope.errors = data.errors;
                return;
            } else{
                friend = {};
                $location.url('/friend')
            }

        });
    }
    $scope.updateFriend = function(){
        var friend = $scope.newbie;
        friendsFactory.updateFriend(friend, function(data){
            $location.url('/friends');

        });
    }
    $scope.delete = function(friend){
        friendsFactory.delete(friend, function(data){
            friendsFactory.showFriends(function(data){
                $scope.friends = data;
            })
        });
    }
    friendsFactory.showFriends(function(data){
        $scope.friends=data;
    })
    friendsFactory.showOne(function(data){
        $scope.friend=data;
    })
    friendsFactory.edit(function(data){
        $scope.friend=data;
    })

}])
