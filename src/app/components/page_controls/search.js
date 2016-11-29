(function(window, ng) {
    'use strict';

    ng.module('ImsTest').component('search', {
        templateUrl: 'app/components/page_controls/search.html',
        controller: 'SearchController'
    });
    
    ng.module('ImsTest').controller('SearchController', SearchController);
    function SearchController() {
        var ctrl = this;
        
        ctrl.q = '';
        ctrl.search = search;
        
        function search() {
            
        }
    }
})(this, this.angular);
