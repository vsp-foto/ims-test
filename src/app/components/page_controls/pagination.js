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
        'localStorageService',
        'PopupWindows'
    ];
    function PaginationController($scope, $element, $attrs, $state, $stateParams, localStorageService, PopupWindows) {
        var ctrl = this;
        
        ctrl.itemsPerPageValues = ['10', '20', '30'];
        ctrl.itemsPerPage = $stateParams.itemsPerPage || localStorageService.get('itemsPerPage') || ctrl.itemsPerPageValues[0];
        ctrl.page = 1;
        
        ctrl.changeItemsPerPage = changeItemsPerPage;
        ctrl.underConstruction = underConstruction;
        
        function changeItemsPerPage() {
            localStorageService.set('itemsPerPage', ctrl.itemsPerPage);
            reload();
        }
        
        function reload() {
            $state.go($state.current.name, { page: ctrl.page, itemsPerPage: ctrl.itemsPerPage });
        }
        
        function underConstruction() {
            PopupWindows.ask('This feature is under construction', { yesBtnTxt: 'OK', noBtnText: null });
        }
    };
})(this, this.angular);
