// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', [
  'ionic', 
  'firebase',
  'starter.controllers'
  ])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "tabs.html"
  })

  // Each tab has its own nav history stack:

  // Welcome tab
  .state('tab.home', {
    url: '/home',
    views: {
      'home': {
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl'
      }
    }
  })

  // Ionic User tab
  .state('tab.snaps', {
    url: '/snaps',
    views: {
      'snaps': {
        templateUrl: 'templates/snaps.html',
        controller: 'SnapsCtrl'
      }
    }
  })

  // Ionic Push tab
  .state('tab.experiment', {
    url: '/experiment',
    views: {
      'experiment': {
        templateUrl: 'templates/experiment.html',
        controller: 'ExperimentCtrl'
      }
    }
  })

  // Ionic Deploy tab
  .state('tab.analytics', {
    url: '/analytics',
    views: {
      'analytics': {
        templateUrl: 'templates/analytics.html',
        controller: 'AnalyticsCtrl'
      }
    }
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/home');

});

