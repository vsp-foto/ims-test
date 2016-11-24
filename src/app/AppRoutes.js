(function(window, ng) {
    'use strict';

    ng.module('ImsTest')
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
                .state('root', {
                    abstract: true,
                    views: {
                        'content@': {
                            template: '<div ui-view></div>'
                        },
                        'header@': {
                            templateUrl: 'app/shared/header/header.html'
                        },
                        'navigation@': {
                            templateUrl: 'app/shared/navigation/navigation.html',
                            controller: 'NavigationController',
                            controllerAs: 'nav'
                        }
                    }
                })

                .state('pageNotFound', {
                    url: '/notfound',
                    parent: 'root',
                    templateUrl: 'app/shared/notfound.html',
                    controller: ['AppTitle', function(AppTitle) {
                        AppTitle.set('Page not found');
                    }]
                })




                .state('units', {
                    url: '/units',
                    parent: 'root',
                    templateUrl: 'app/components/units/index.html',
                    controller: 'Units.IndexController',
                    controllerAs: 'units',
                    resolve: {
                        items: function() {
                            return getMockUnits();
                        }
                    }
                })
                ;
    }]);
})(this, this.angular);
