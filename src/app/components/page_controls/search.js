(function(window, ng) {
    'use strict';

    ng.module('ImsTest').component('search', {
        templateUrl: 'app/components/page_controls/search.html',
        controller: 'SearchController'
    });
    
    ng.module('ImsTest').controller('SearchController', SearchController);
    SearchController.$inject = [
        'PopupWindows'
    ];
    function SearchController(PopupWindows) {
        var ctrl = this;
        
        ctrl.q = '';
        ctrl.search = search;
        
        function search() {
            PopupWindows.ask('This feature is under construction', { yesBtnTxt: 'OK', noBtnText: null });
        }
    }
})(this, this.angular);
