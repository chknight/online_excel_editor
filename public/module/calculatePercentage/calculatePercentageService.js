/**
 * Created by Administrator on 2016/1/29.
 */
angular.module('Birthday')
    .service('calculatePercentageService', function(DefaultSetting, excelTool) {

        var that = this;


        this.initialize = function(vm) {
            var width = ($('#table-area')[0].clientWidth / 3) * 0.9;
            var height = $('#table-area')[0].clientHeight;



            vm.settings = JSON.parse(JSON.stringify(DefaultSetting.tableSetting));

            vm.settings.width = width;
            vm.settings.height = height;

            vm.tableItems1 = excelTool.getDefaultValue(vm.settings);
            vm.tableItems2 = excelTool.getDefaultValue(vm.settings);
            vm.result = excelTool.getDefaultValue(vm.settings);


            vm.tips = "请选择要计算百分比的区域";
            vm.alerts = [];

        };

        this.calculateNumerator = function(data, start, end) {
            var result = [];
            for (var row = start.row; row <= end.row; row++) {
                var total = 0;
                for(var col = start.col; col <= end.col; col++) {
                    total = total + data[row][col];
                }
                result.push(total);
            }
            return result;
        };

        function getHeader(allSet) {
            var result = [];
            allSet.forEach(function(element, index, array) {
                var temp = [];
                element.forEach(function(element, index, array) {
                    temp.push(XLSX.utils.encode_col(element));
                });
                result.push("第" + temp.reverse().join(",") + "列所占比例");
            });
            return result;
        }

        //算法，获得所有的真子集
        //todo 进一步理解该算法
        function getAllSet(array) {
            var allSet = [];
            allSet.push([]);
            for(var i = 0; i < array.length; ++i) {
                var subSet = [];
                for(var j = 0; j < allSet.length; ++j) {
                    var element = [];
                    element.push(array[i]);
                    element = element.concat(allSet[j]);
                    subSet.push(element);
                }
                allSet = allSet.concat(subSet);
            }
            allSet.shift();
            return allSet;
        }

        //获得每一行的各种百分率的结果
        function getRowResult(data, allSet, numerator) {
            var result = [];
            allSet.forEach(function(element) {
                var total = 0;
                element.forEach(function(col) {
                    total = total + data[col];
                });
                result.push(total / numerator);
            });
            return result;
        }


        //获得总的结果
        this.getResult = function(data, start, end) {
            var numerator = that.calculateNumerator(data, start, end);
            var result = [];
            var array = [];
            var col;
            for(col = start.col; col <= end.col; col++) {
                array.push(col);
            }
            var allSet = getAllSet(array);
            result.push(getHeader(allSet));
            var index = 0;
            for(var row = start.row; row <= end.row; ++row) {
                var rowResult = getRowResult(data[row], allSet, numerator[index]);
                result.push(rowResult);
                index++;
            }
            return result;
        };

        this.excelTool = excelTool;


    })
;