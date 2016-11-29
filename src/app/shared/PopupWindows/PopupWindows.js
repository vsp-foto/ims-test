(function(window, ng) {
    'use strict';
    
    var defaults = {
        yesBtnTxt: 'Yes',
        noBtnText: 'No',
        windowClass: '',
        header: ''
    };
    
    
    ng.module('ImsTest').factory('PopupWindows', PopupWindows);
    
    PopupWindows.$inject = [
        '$uibModal'
    ];
    function PopupWindows($uibModal) {
        var PopupWindows = {};
        
        PopupWindows.ask = function (text, userOptions) {
            var options = ng.extend({}, defaults, userOptions);
            return $uibModal.open({
                templateUrl: 'app/shared/PopupWindows/ask.html',
                size: 'sm',
                controller: ['$scope', '$sce', function($scope, $sce) {
                    $scope.text = $sce.trustAsHtml(text);
                    $scope.header = options.header;
                    $scope.yesBtnTxt = options.yesBtnTxt;
                    $scope.noBtnText = options.noBtnText;
                }],
                windowClass: options.windowClass
            }).result;
        };
        
        return PopupWindows;
    };
})(this, this.angular);
