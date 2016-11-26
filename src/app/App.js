(function(window, ng) {
    'use strict';

    ng.module('ImsTest', [
        'ngAnimate',
        'ui.bootstrap',
        'ui.router'
    ])
    .config(Config);
    
    Config.$inject = [
        '$urlRouterProvider'
    ];
    function Config($urlRouterProvider) {
        $urlRouterProvider
                .when('',  '/items/table')
                .when('/items',  '/items/table')
                .otherwise(function($injector, $location) {
                    // Prevent the UI Router from going into infinite loop
                    $injector.get('$state').go('pageNotFound');
                });
    }
})(this, this.angular);
