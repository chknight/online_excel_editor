/**
 * Created by Administrator on 2016/1/29.
 */
angular.module('Birthday')
    .controller('EditExcelCtrl', function(EditExcelService, tableReadService, tableWriteService) {
        var vm = this;
        EditExcelService.initialize(vm);

        vm.processFile = function(file) {
          tableReadService.getAllCellsFromFile(file, vm.items);
        };

        vm.save = function() {
            tableWriteService.save(vm.items.data);
        }
    });