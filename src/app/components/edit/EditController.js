(function(window, ng) {
    'use strict';

    ng.module('ImsTest').controller('EditController', EditController);

    EditController.$inject = [
        '$scope',
        '$state',
        'item',
        'isEditMode',
        'ItemsService',
        'PopupWindows'
    ];

    function EditController($scope, $state, item, isEditMode, ItemsService, PopupWindows) {
        var vmEdit = this;
        var initialState = ng.copy(item);
        
        vmEdit.item = item;
        vmEdit.isEditMode = isEditMode;
        
        vmEdit.deleteItem = deleteItem;
        vmEdit.resetChanges = resetChanges;
        vmEdit.save = save;
        vmEdit.showValidations = showValidations;
        
        $scope.$applyAsync(function() {
            $scope.$broadcast('focus.title');
        });
        
        function deleteItem() {
            var msg = 'Are you sure you want to delete <b>' + vmEdit.item.title + '</b>?';
            var options = {header: 'Are you sure?'};
            PopupWindows.ask(msg, options)
                    .then(function () {
                        return ItemsService.delete(vmEdit.item.id);
                    })
                    .then(redirectToList);
        }
        
        function resetChanges() {
            $scope.editItemForm.$setPristine();
            vmEdit.item = ng.copy(initialState);
        }
        
        function save() {
            var promise;
            if ($scope.editItemForm.$invalid) return;
            
            if (vmEdit.isEditMode) {
                promise = ItemsService.save(vmEdit.item);
            } else {
                promise = ItemsService.create(vmEdit.item);
            }
            promise.then(redirectToList);
        }
        
        function showValidations() {
            return $scope.editItemForm.$submitted && $scope.editItemForm.$invalid;
        }
        
        function redirectToList() {
            $state.go('items.table');
        }
    }
})(this, this.angular);
