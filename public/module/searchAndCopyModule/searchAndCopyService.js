/**
 * Created by Administrator on 2016/2/4.
 */
angular.module('Birthday')
    .service('searchAndCopyService', function(excelTool, DefaultSetting) {
        var that = this;

        that.initialize = function(vm) {

            var width = ( $('#table-area')[0].clientWidth / 2) * 0.9;
            var height = $('#table-area')[0].clientHeight;

            vm.settings = JSON.parse(JSON.stringify(DefaultSetting.tableSetting));

            vm.settings.width = width;
            vm.settings.height = height;

            vm.resourceTable = excelTool.getDefaultValue(vm.settings);
            vm.targetTable = excelTool.getDefaultValue(vm.settings);

            vm.tips = "上传两个文件后，请选择搜索的关键词所在列(如名字)";
            vm.alerts = [];
        };

        //从表头中得到对应的列的下标
        function getFieldInTarget(target, fields) {
            var result = {};
            var header = target[fields.row];
            for(var index = fields.startCol; index <= fields.endCol; index++) {
                result[header[index]] = index;
            }
            return result;
        }

        function getFieldInResource(resource, target, fields) {
            var result = {};
            var header = resource[0];
            var targetHeader = target[fields.row];
            for(var i = fields.startCol; i <= fields.endCol; i++) {
                for(var j = 0; j < header.length; ++j) {
                    if(targetHeader[i] == header[j]) {
                        result[header[j]] = j;
                    }
                }
            }
            return result;
        }

        function searchAndCopy(resource, target, key, resourceKey, fieldInTarget, fieldInResource) {
            for(var i = 0; i < target.length; ++i) {
                for(var j = 0; j < resource.length; ++j) {

                    if(target[i][key] == resource[j][resourceKey]) {
                        for(var field in fieldInTarget) {
                            target[i][fieldInTarget[field]] = resource[j][fieldInResource[field]];
                        }
                    }

                }
            }
        }

        that.searchFromTargetTable = function(resource, target, key, resourceKey, fields) {
            var fieldInTarget = getFieldInTarget(target, fields);
            var fieldInResource = getFieldInResource(resource, target, fields);
            searchAndCopy(resource, target, key, resourceKey, fieldInTarget, fieldInResource);
        }
    })
;
