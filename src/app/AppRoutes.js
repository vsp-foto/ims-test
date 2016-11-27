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
                        'navbar@': {
                            templateUrl: 'app/shared/navbar/navbar.html',
                            controller: 'NavbarController',
                            controllerAs: 'nav'
                        }
                    }
                })

                .state('pageNotFound', {
                    url: '/notfound',
                    parent: 'root',
                    templateUrl: 'app/shared/notfound.html',
//                    controller: ['AppTitle', function(AppTitle) {
//                        AppTitle.set('Page not found');
//                    }]
                })

                .state('items', {
                    url: '/items',
                    parent: 'root',
                    template: '<div ui-view></div>',
                    abstract: true
                })
                
                .state('items.table', {
                    url: '/table',
                    templateUrl: 'app/components/items/table.html'
                })
                
                .state('items.tile', {
                    url: '/tile',
                    templateUrl: 'app/components/items/tile.html'
                })
                
                .state('add', {
                    url: '/add',
                    parent: 'root',
                    templateUrl: 'app/components/edit/index.html',
                    controller: 'EditController'
                })
                
                .state('edit', {
                    url: '/edit/:itemId',
                    parent: 'root',
                    templateUrl: 'app/components/edit/index.html'
                });
    }]);
})(this, this.angular);
