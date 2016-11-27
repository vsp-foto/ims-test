(function(window, ng) {
    'use strict';

    ng.module('BackendMock', [
        'ngMockE2E',
        'LocalStorageModule'
    ])
    .run(Run);
    
    Run.$inject = [
        '$httpBackend',
        'localStorageService'
    ];
    function Run($httpBackend, localStorageService) {
        var STORAGE_KEY = 'storedItems';
        var items = getItemsFromLocalStorage();
        
        $httpBackend.whenGET('/items').respond(items);
        
        $httpBackend.whenPOST('/items').respond(function(method, url, data) {
            var item = ng.fromJson(data);
            // TODO: create unique id for new item
            items.push(item);
            saveItemsToLocalStorage(items);
            return [200, items, {}];
        });
        
        // Don't mock requests to HTML files
        $httpBackend.whenGET(/.+\.html$/).passThrough();
        
        
        function getItemsFromLocalStorage() {
            var result = localStorageService.get(STORAGE_KEY);
            if (!result) {
                // First time run
                result = getInitialItemsList();
                localStorageService.set(STORAGE_KEY, result);
            }
            return result;
        }
        
        function saveItemsToLocalStorage(items) {
            localStorageService.set(STORAGE_KEY, items);
        }
    }
    
    function getInitialItemsList() {
        console.log('Generating list for the first time...');
        return [{
            id: '1',
            title: 'Item 1',
            prop1: '54224',
            prop2: 42,
            description: 'Test item 1.',
            img_url: ''
        }, {
            id: '2',
            title: 'Item 2',
            prop1: '872142',
            prop2: 422,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            img_url: ''
        }];
    }
})(this, this.angular);
