angular.module('Birthday')
	.controller('IndexCtrl', function(tableReadService, indexService){
		var vm = this;

		var table1SelectArea = {};

        indexService.initialize(vm);

		//当文件上传时能够处理数据
		vm.processFile1 = function(file) {
			tableReadService.getAllCellsFromFile(file, vm.tableItems1);
		};

		//处理上传的第二个文件
		vm.processFile2 = function(file) {
			tableReadService.getAllCellsFromFile(file, vm.tableItems2);
		};

		//回调函数，用于处理选择的事件
		vm.onAfterSelection = function(row, col, row2, col2) {
			table1SelectArea.start = {};
			table1SelectArea.end = {};
			table1SelectArea.start.row = row;
			table1SelectArea.start.col = col;
			table1SelectArea.end.row = row2;
			table1SelectArea.end.col = col2;
		};

        //回调函数，用于数据改变后的事件
        vm.afterChange = function(changes, source) {
            if(source != 'loadData') {

            }
        };

        vm.afterLoadData = function() {

        };


	});