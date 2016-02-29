/**
 * Created by Administrator on 2016/2/4.
 */
angular.module('Birthday')
    .controller('SearchAndCopyCtrl', function (searchAndCopyService, tableReadService, tableWriteService, alertService) {

        var vm = this;

        searchAndCopyService.initialize(vm);

        vm.processResourceFile = function(file) {

            tableReadService.getAllCellsFromFile(file, vm.resourceTable);

        };

        vm.processTargetFile = function(file) {

            tableReadService.getAllCellsFromFile(file, vm.targetTable);
        };

        vm.closeAlert = alertService.closeAlert;

        var selectedCol = -1;
        var selectedResourceCol = -1;
        //key是搜索时关键词所在的列
        var key = -1;
        var resourceKey = -1;
        var selectedArea;

        vm.onAfterSelection = function(startRow, startCol, endRow, endCol) {
            if(key == -1) {
                if(endCol != startCol)  {
                    selectedCol = -1;
                } else {
                    selectedCol = startCol;
                }
            } else {
                if(startRow == endRow) {
                    selectedArea = {
                        startCol:startCol < endCol ? startCol : endCol,
                        endCol : startCol > endCol ? startCol : endCol,
                        row : startRow
                    };
                } else {
                    selectedArea = undefined;
                }
            }
        };

        vm.onAfterResourceSelection = function (startRow, startCol, endRow, endCol) {
            if(endCol != startCol) {
                selectedResourceCol = -1;
            } else {
                selectedResourceCol = startCol;
            }
        };

        vm.getResourceKey = function() {
          if(selectedResourceCol == -1) {
              resourceKey = -1;
              vm.tips = "请选择表1中的关键字所在列";
          } else {
              resourceKey = selectedResourceCol;
              selectedResourceCol = -1;
              vm.tips = "请选择表2中关键字所在的列";
          }
        };

        //获得搜索关键词
        vm.getKey = function () {
            if(selectedCol == -1) {
                vm.tips = "请选择同一列";
                key = -1;
            } else {
                vm.tips = "请选择需要拷贝的列";
                key = selectedCol;
            }
        };


        vm.getResult = function() {
            if(key == -1) {
                alertService.addWarning(vm.alerts, '表二关键字未选择');
            } else if (resourceKey == -1) {
                alertService.addWarning(vm.alerts, '表一关键字未选择');
            } else if (selectedArea == undefined) {
                alertService.addWarning(vm.alerts, '未选择需要搜索的区域');
            } else {
                searchAndCopyService.searchFromTargetTable(vm.resourceTable.data, vm.targetTable.data, key, resourceKey ,selectedArea);
            }
        };
        
        vm.save = function () {
            tableWriteService.save(vm.targetTable.data);
        }

    });