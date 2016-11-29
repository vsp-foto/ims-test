(function(window, ng) {
    'use strict';

    ng.module('ImsTest').factory('ItemsService', ItemsService);

    ItemsService.$inject = [
        '$http'
    ];

    function ItemsService($http) {
        var ItemsService = {};
        
        ItemsService.list = function () {
            return $http.get('/items').then(prepareResponse); 
        };

        ItemsService.one = function (itemId) {
            return $http.get('/items/' + itemId).then(prepareResponse); 
        };
        
        ItemsService.save = function (item) {
            return $http.put('/items/' + item.id, item);
        };
        
        ItemsService.create = function (item) {
            return $http.post('/items', item);
        };
        
        ItemsService.delete = function (itemId) {
            return $http.delete('/items/' + itemId);
        };
        
        return ItemsService;
        
        function prepareResponse(response) {
            return response.data;
        }
    }
})(this, this.angular);
