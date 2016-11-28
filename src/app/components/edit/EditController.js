(function(window, ng) {
    'use strict';

    ng.module('ImsTest').controller('EditController', EditController);

    EditController.$inject = [
        '$scope',
        '$state',
        'item',
        'isEditMode',
        'ItemsService'
    ];

    function EditController($scope, $state, item, isEditMode, ItemsService) {
        var vmEdit = this;
        var initialState = ng.copy(item);
        
        vmEdit.item = item;
        vmEdit.isEditMode = isEditMode;
        
        vmEdit.resetChanges = resetChanges;
        vmEdit.save = save;
        
        function resetChanges() {
            $scope.editItemForm.$setPristine();
            vmEdit.item = ng.copy(initialState);
        }
        
        function save() {
            var promise;
            if (vmEdit.isEditMode) {
                promise = ItemsService.save(vmEdit.item);
            } else {
                promise = ItemsService.create(vmEdit.item);
            }
            promise.then(function () {
                $state.go('items.table');
            });
        }
    }
})(this, this.angular);
