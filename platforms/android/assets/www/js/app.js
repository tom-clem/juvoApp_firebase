// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js



var example = angular.module('starter', ['ionic']);

var newTodoDom = document.getElementById('new-todo');

var localDB = new PouchDB("thomas2");
var remoteDB = new PouchDB("https://10767134:12345678@10767134.iriscouch.com/thomas2");

example.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    localDB.sync(remoteDB, {live: true});
  });
})




example.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html'
      }
    }
  })

  .state('app.todo', {
      url: '/todo',
      views: {
        'menuContent': {
          templateUrl: 'templates/todo.html',
          controller: 'ExampleController'
        }
      }
    })
    .state('app.chores', {
      url: '/chores',
      views: {
        'menuContent': {
          templateUrl: 'templates/chores.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.calendar', {
    url: '/calendar',
    views: {
      'menuContent': {
        templateUrl: 'templates/calendar.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
