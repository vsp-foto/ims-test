(function(window, ng) {
    'use strict';

    ng.module('ImsTest').controller('ItemsListController', ItemsListController);

    ItemsListController.$inject = [
        'itemsList'
    ];

    function ItemsListController(itemsList) {
        var vmItems = this;     // This is exposed in the view under the same name
        vmItems.list = itemsList;
    }
})(this, this.angular);
