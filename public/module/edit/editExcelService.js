/**
 * Created by Administrator on 2016/1/29.
 */

angular.module('Birthday')
    .service('EditExcelService', function(DefaultSetting, excelTool) {
        var that = this;

        this.initialize = function (vm) {

            var width = window.screen.width;
            var height = jQuery.find("#table-area:first")[0].clientHeight;

            vm.settings = JSON.parse(JSON.stringify(DefaultSetting.tableSetting));
            vm.settings.width = width;
            vm.settings.height = height;

            vm.items = excelTool.getDefaultValue(vm.settings);
        };
    });