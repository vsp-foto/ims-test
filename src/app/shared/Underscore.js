(function (window, ng) {
    'use strict';

    angular.module('ImsTest').factory('_', ['$window', function ($window) {
        return $window._.noConflict();
    }]);

})(window, window.angular);
