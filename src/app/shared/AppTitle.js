(function(window, ng) {
    'use strict';
    
    ng.module('ImsTest')
    
    .constant('UPDATE_TITLE_EVENT_NAME', 'updateAppTitle')
    
    .factory('AppTitle', ['$rootScope', 'UPDATE_TITLE_EVENT_NAME', function($rootScope, UPDATE_TITLE_EVENT_NAME) {
        var appName = 'Test project';
        var AppTitle = {};
        
        AppTitle.set = function(title) {
            if (ng.isNumber(title)) {
                title = title + '';
            }
            if (ng.isString(title)) {
                title = [title];
            }
            title.push(appName);
            $rootScope.$broadcast(UPDATE_TITLE_EVENT_NAME, title.join(' - '));
        };
        
        return AppTitle;
    }])

    .directive('appTitle', ['$rootScope', 'UPDATE_TITLE_EVENT_NAME', function($rootScope, UPDATE_TITLE_EVENT_NAME) {
        return {
            scope: {},
            link: function(scope, el) {
                $rootScope.$on(UPDATE_TITLE_EVENT_NAME, function(e, newTitle) {
                    el.text(newTitle);
                });
            }
        };
    }]);
})(this, this.angular);
