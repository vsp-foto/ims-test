(function(window, ng) {
    'use strict';

    ng.module('ImsTest', [
        'BackendMock',
        'LocalStorageModule',
        'ngAnimate',
        'ui.bootstrap',
        'ui.router'
    ])
    .config(Config);
    
    Config.$inject = [
        '$locationProvider',
        'localStorageServiceProvider',
        '$urlRouterProvider'
    ];
    function Config($locationProvider, localStorageServiceProvider, $urlRouterProvider) {
        $locationProvider.html5Mode(true).hashPrefix('!');
        
        localStorageServiceProvider.setPrefix('ImsTest');
        
        $urlRouterProvider
                .when('/',  '/items/table')
                .when('/items',  '/items/table')
                .otherwise(function($injector, $location) {
                    // Prevent the UI Router from going into infinite loop
                    $injector.get('$state').go('pageNotFound');
                });
    }
})(this, this.angular);
