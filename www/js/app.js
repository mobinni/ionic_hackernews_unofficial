// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('hackerNewsApp',
    [
        'ionic',
        'ngResource'
    ])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
            if (window.Connection) {
                if (navigator.connection.type == Connection.NONE) {
                    $ionicPopup.confirm({
                        title: "Disconnected from the internet",
                        content: "This application requires an internet connection to function properly"
                    }).then(function (result) {
                        if (!result) {
                            //  ionic.Platform.exitApp();
                        }
                    });
                }
            }
        });
    })

    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('app', {
                url: "/app",
                abstract: true,
                templateUrl: "templates/menu.html",
                controller: 'AppCtrl'
            })
            .state('app.top', {
                url: "/top",
                views: {
                    'menuContent': {
                        templateUrl: "templates/stories.html",
                        controller: 'StoriesCtrl'
                    }
                }
            })
            .state('app.new', {
                url: "/new",
                views: {
                    'menuContent': {
                        templateUrl: "templates/stories.html",
                        controller: 'StoriesCtrl'
                    }
                }
            });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/top');
    });
