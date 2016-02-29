/**
 * Created by Administrator on 2016/1/28.
 */
angular.module('Birthday')
    .service('indexService', function(tableReadService) {

        var width = (window.screen.width / 3) * 0.8;
        this.initialize = function(vm) {
            vm.settings = {
                contextMenu: true,
                contextMenuCopyPaste: {
                    swfPath: '/component/handsontable/dist/zeroclipboard/zeroclipboard.swf'
                },
                height : 500,
                width  : width
            };

            vm.tableItems1 = {};
            vm.tableItems2 = {};
            vm.items = {};
            vm.rowHeaders = true;
            vm.colHeaders = true;
        };
    })
;