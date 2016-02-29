/**
 * Created by Administrator on 2016/1/29.
 */
angular.module('Birthday')
    .controller('CalculatePercentageCtrl', function($state, tableReadService, calculatePercentageService, tableWriteService, TableResource){
        var vm = this;

        calculatePercentageService.initialize(vm);

        var table1SelectArea = {};
        var numerator;
        var result;


        //当文件上传时能够处理数据
        vm.processFile1 = function(file) {
            tableReadService.getAllCellsFromFile(file, vm.tableItems1);
        };

        //处理上传的第二个文件
        vm.processResultFile = function(file) {
            tableReadService.getAllCellsFromFile(file, vm.result);
        };

        //回调函数，用于处理选择的事件
        vm.onAfterSelection = function(row, col, row2, col2) {
            calculatePercentageService.excelTool.getSelectedRange(row, col, row2, col2, table1SelectArea);
            if(vm.tips != "点击获得结果获得所选区域的各种比例") {
                vm.tips = "点击获得结果获得所选区域的各种比例";
            }
        };

        //回调函数，用于数据改变后的事件
        vm.afterChange = function(changes, source) {
            if(source != 'loadData') {
            }
        };

        vm.getNumerator = function () {
            numerator =  calculatePercentageService.calculateNumerator(vm.tableItems1.data, table1SelectArea.start, table1SelectArea.end);
        };

        vm.getResult = function() {
            try {
                if(vm.tableItems1.data == undefined) {
                    vm.alerts.push({type:'warning', msg:"请选择文件"});
                } else {
                    result = calculatePercentageService.getResult(vm.tableItems1.data, table1SelectArea.start, table1SelectArea.end);
                    vm.tableItems2.data = result;
                }
            } catch (err) {
                vm.alerts.push({type:'warning', msg:"请选择需要计算百分率的区域"});
            }
        };

        vm.closeAlert = function(index) {
            vm.alerts.splice(index, 1);
        };

        vm.save = function() {;
            tableWriteService.save(vm.result.data);
        };

    });