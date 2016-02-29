/**
 * Created by Administrator on 2016/1/29.
 */
/*这个文件中的服务用语储存常量*/
angular.module('Birthday')
    .service('DefaultSetting', function() {
        return {
            tableSetting :
                {
                    contextMenu: true,
                    contextMenuCopyPaste: {
                        swfPath: '/component/handsontable/dist/zeroclipboard/zeroClipboard.swf'
                    },
                    height : 450,  //高度
                    fixedRowsTop : 1, //冻结某一行
                    rowHeaders : true, //是否需要列头
                    colHeaders : true,  //是否需要表头,可设置不同表头的内容
                    columnSorting : true, //是否支持排序
                    sortIndicator: true,
                    search : true,
                    autoWrapCol : true,
                    autoWrapRow : true,
                    multiSelect:true, //是否支持多选
                    minSpareRows : 10, //拉到最下添加的行的数量
                    minSpareCols : 10, //拉到最右后添加的列的数量
                    minRows : 100, //最小的行的数量
                    minCols : 100 //最小的列的数量
                }
        };
    })
;