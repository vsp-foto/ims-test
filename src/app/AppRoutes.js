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
                    url: '/table?page&itemsPerPage',
                    templateUrl: 'app/components/items/table.html',
                    controller: 'ItemsListController',
                    controllerAs: 'vmItems',
                    resolve: {
                        itemsList: ['ItemsService', function (ItemsService) {
                            return ItemsService.list();
                        }]
                    }
                })
                
                .state('items.tile', {
                    url: '/tile',
                    templateUrl: 'app/components/items/tile.html',
                    controller: 'ItemsListController',
                    controllerAs: 'vmItems',
                    resolve: {
                        itemsList: ['ItemsService', function (ItemsService) {
                            return ItemsService.list();
                        }]
                    }
                })
                
                .state('add', {
                    url: '/add',
                    parent: 'root',
                    templateUrl: 'app/components/edit/index.html',
                    controller: 'EditController',
                    controllerAs: 'vmEdit',
                    resolve: {
                        item: function () {
                            return {};
                        },
                        isEditMode: function () {
                            return false;
                        }
                    }
                })
                
                .state('edit', {
                    url: '/edit/:itemId',
                    parent: 'root',
                    templateUrl: 'app/components/edit/index.html',
                    controller: 'EditController',
                    controllerAs: 'vmEdit',
                    resolve: {
                        item: ['ItemsService', '$stateParams', function (ItemsService, $stateParams) {
                            return ItemsService.one($stateParams.itemId);
                        }],
                        isEditMode: function () {
                            return true;
                        }
                    }
                });
    }]);
})(this, this.angular);
