(function(window, ng) {
    'use strict';
    
    ng.module('utils', [])
    
    /**
     * Set focus on element on specified event.
     * Multiple space-separated events names may be specified.
     * Attribute: focusOnEvent - Events list
     */
    .directive('focusOnEvent', ['$timeout', function($timeout) {
        return {
            restrict: 'A',
            link: function(scope, el, attrs) {
                ng.forEach(attrs.focusOnEvent.split(' '), function(eventName) {
                    scope.$on(eventName, function() {
                        $timeout(function() {
                            el[0].focus();
                        });
                    });
                });
            }
        };
    }]);
})(this, this.angular);