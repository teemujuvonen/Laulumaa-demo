// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform, $state) {
  $ionicPlatform.ready(function() {
    window.localStorage.removeItem("base64image");
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    
    /*
    if (window.ezar) {
      ezar.initializeVideoOverlay(
        function () {
          ezar.getBackCamera().start();
        },
        function (err) {
          alert('unable to init ezar: ' + err);
        });
        
    }*/
  });
  $ionicPlatform.registerBackButtonAction(function() {
    $state.go("landing");
  }, 100);
})

.filter('trustUrl', function ($sce) {
    return function(url) {
      return $sce.trustAsResourceUrl(url);
    };
  })

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $compileProvider) {
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|blob|content):|data:image\//);
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $ionicConfigProvider.scrolling.jsScrolling(!(ionic.Platform.isAndroid() && ionic.Platform.version() > 5));
  $stateProvider

  // setup an abstract state for the tabs directive
    //.state('tab', {
    //url: '/tab',
    //abstract: true,
    //templateUrl: 'templates/tabs.html'
  //})

  // Each tab has its own nav history stack:
	//signup-> login
    .state('main', {
      url: '/main',
      templateUrl: 'templates/main.html',
      controller: 'MainCtrl'
    })
    .state('landing', {
      url: '/landing',
      templateUrl: 'templates/landing.html',
      controller: 'LandingCtrl'
    })
    .state('edit', {
      url: '/edit',
      templateUrl: 'templates/edit.html',
      controller: 'EditCtrl'
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/landing');
});

