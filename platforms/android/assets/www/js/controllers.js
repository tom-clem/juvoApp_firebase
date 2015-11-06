angular.module('starter.controllers', [])

example.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

example.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})


example.controller('TodoCtrl', function($scope) {

  $scope.devList = [
    { text: "Go to school", checked: false },
    { text: "Do the homework", checked: false },
    { text: "Drink water", checked: false },
    { text: "Sleep enough", checked: false},
    { text: "Learn ionic framewrok", checked: false},
    { text: "Learn angular framewrok", checked: false}
  ];


})


example.controller('PlaylistCtrl', function($scope, $stateParams) {
});


example.controller("ExampleController", function($scope, $ionicPopup, PouchDBListener) {

    $scope.todos = [];

    $scope.result = [];


    $scope.create = function() {
        $ionicPopup.prompt({
            title: 'Enter a new TODO item',
            inputType: 'text'


        })
        .then(function(result) {
            if(result !== "") {
                if($scope.hasOwnProperty("todos") !== true) {
                    $scope.todos = [];
                }
                localDB.post({_id: result});


            } else {
                console.log("Action not completed");
            }
        });
    };

    $scope.addtodo = function(text) {
            if(text !== "") {


                if($scope.hasOwnProperty("todos") !== true) {
                    $scope.todos = [];
                }
                localDB.post({
                  _id: text,
                  completed: false});


            } else {
                console.log("Action not completed");
            }


        };

        $scope.deleteTodo = function(todo){
          localDB.remove(todo);


        }

    $scope.get = function(query){

      remoteDB.get(query).then(function (result) {
        $scope.result = result;

      });


    }

    $scope.toggleCompleted = function(todo){
    todo.completed = !todo.completed;

  }

    $scope.$on('add', function(event, todo) {
        $scope.todos.push(todo);

    });

    $scope.$on('delete', function(event, id) {
        for(var i = 0; i < $scope.todos.length; i++) {
            if($scope.todos[i]._id === id) {
                $scope.todos.splice(i, 1);
            }
        }
    });

});

example.factory('PouchDBListener', ['$rootScope', function($rootScope) {

    localDB.changes({
        continuous: true,
        onChange: function(change) {
            if (!change.deleted) {
                $rootScope.$apply(function() {
                    localDB.get(change.id, function(err, doc) {
                        $rootScope.$apply(function() {
                            if (err) console.log(err);
                            $rootScope.$broadcast('add', doc);
                        })
                    });
                })
            } else {
                $rootScope.$apply(function() {
                    $rootScope.$broadcast('delete', change.id);
                });
            }
        }
    });

    return true;

}]);
