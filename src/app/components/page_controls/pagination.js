(function(window, ng) {
    'use strict';

    ng.module('ImsTest').component('pagination', {
        templateUrl: 'app/components/page_controls/pagination.html',
        controller: 'PaginationController'
    });
    
    ng.module('ImsTest').controller('PaginationController', PaginationController);
    PaginationController.$inject = [
        '$scope',
        '$element',
        '$attrs',
        '$state',
        '$stateParams',
        'localStorageService'
    ];
    function PaginationController($scope, $element, $attrs, $state, $stateParams, localStorageService) {
        var ctrl = this;
        
        ctrl.itemsPerPageValues = ['10', '20', '30'];
        ctrl.itemsPerPage = $stateParams.itemsPerPage || localStorageService.get('itemsPerPage') || ctrl.itemsPerPageValues[0];
        ctrl.page = 1;
        
        ctrl.changeItemsPerPage = changeItemsPerPage;
        
        function changeItemsPerPage() {
            localStorageService.set('itemsPerPage', ctrl.itemsPerPage);
            reload();
        }
        
        function reload() {
            $state.go($state.current.name, { page: ctrl.page, itemsPerPage: ctrl.itemsPerPage });
        }
    };
})(this, this.angular);
