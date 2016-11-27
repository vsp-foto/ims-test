(function(window, ng) {
    'use strict';

    ng.module('BackendMock', [
        'ngMockE2E'
    ])
    .run(Run);
    
    Run.$inject = [
        '$httpBackend'
    ];
    function Run($httpBackend) {
        var items = getItemsFromLocalStorage();
        
        $httpBackend.whenGET('/items').respond(items);
        
        $httpBackend.whenPOST('/items').respond(function(method, url, data) {
            var item = ng.fromJson(data);
            items.push(item);
            return [200, items, {}];
        });
        
        // Don't mock requests to HTML files
        $httpBackend.whenGET(/.+\.html$/).passThrough();
        
        function getItemsFromLocalStorage() {
            // TODO:
            return [];
        }
    }
})(this, this.angular);
