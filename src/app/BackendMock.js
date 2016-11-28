(function(window, ng) {
    'use strict';

    ng.module('BackendMock', [
        'ngMockE2E',
        'LocalStorageModule'
    ])
    .config(Config)
    .run(Run);
    
    
    Config.$inject = [
        'localStorageServiceProvider'
    ];
    function Config(localStorageServiceProvider) {
        localStorageServiceProvider.setPrefix('ImsTest');
    }
    
    
    Run.$inject = [
        '$httpBackend',
        'localStorageService',
        '_'
    ];
    function Run($httpBackend, localStorageService, _) {
        var STORAGE_KEY = 'storedItems';
        var items = getItemsFromLocalStorage();
        
        // Don't mock requests to HTML files
        $httpBackend.whenGET(/.+\.html$/).passThrough();
        
        $httpBackend.whenGET(/\/items\/\w+/).respond(function (method, url, params) {
            var itemId = getItemIdFromUrl(url);
            return [200, getItemById(itemId), {}];
        });
        
        $httpBackend.whenGET('/items').respond(items);
        
        $httpBackend.whenPOST('/items').respond(function(method, url, data) {
            var item = ng.fromJson(data);
            item.id = _.uniqueId();
            items.push(item);
            saveItemsToLocalStorage(items);
            return [200, item, {}];
        });
        
        $httpBackend.whenPUT(/\/items\/\w+/).respond(function (method, url, data) {
            var itemId = getItemIdFromUrl(url);
            var modifiedItem = ng.fromJson(data);
            items.some(function (anItem, i) {
                if (anItem.id !== itemId) return;
                items[i] = modifiedItem;
                return true;
            });
            saveItemsToLocalStorage(items);
            return [200, modifiedItem, {}];
        });
        
        
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
        
        function getItemById(itemId) {
            return _.findWhere(items, { id: itemId });
        }
        
        function getItemIdFromUrl(url) {
            return url.match(/\/items\/(\w+)$/)[1];
        }
    }
    
    function getInitialItemsList() {
        console.log('Generating list for the first time...');
        return [{
            id: '1',
            title: 'Item 1',
            prop1: '54224',
            prop2: 42,
            prop3: 'Test item 1.',
            img_url: ''
        }, {
            id: '2',
            title: 'Item 2',
            prop1: '872142',
            prop2: 422,
            prop3: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            img_url: ''
        }];
    }
})(this, this.angular);
