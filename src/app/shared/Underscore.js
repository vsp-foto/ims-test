(function (window, ng) {
    'use strict';

    ng.module('ImsTest').factory('_', ['$window', function ($window) {
        return $window._.noConflict();
    }]);

})(window, window.angular);
