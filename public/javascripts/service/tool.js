/**
 * Created by Administrator on 2016/2/1.
 */
angular.module('Birthday')
    .service('excelTool', function() {

        var that = this;

        function generateArray (row, col) {
            var result = [];
            for(var i = 0; i < row; ++i) {
                var temp = [];
                for(var j = 0; j < col; ++j) {
                    temp.push(undefined);
                }
                result.push(temp);
            }
            return result;
        }

        that.getDefaultValue = function(settings) {
            return {
                data : generateArray(settings.minRows, settings.minCols)
            };
        };

        that.getSelectedRange = function(row, col, row2, col2, table1SelectArea) {
            table1SelectArea.start = {};
            table1SelectArea.end = {};
            table1SelectArea.start.row = row < row2 ? row : row2;
            table1SelectArea.start.col = col < col2 ? col : col2;
            table1SelectArea.end.row = row > row2 ? row : row2;
            table1SelectArea.end.col = col > col2 ? col : col2;
        }

    })
    .service('alertService', function() {
        var that = this;

        that.addDanger = function(alerts, message) {
           alerts.push( { type: 'danger', msg: message});
        };

        that.addSuccess = function(alerts, message) {
            alerts.push( { type: 'success', msg: message});
        };

        that.addWarning = function(alerts, message) {
            alerts.push({type:'warning', msg:message});
        };

        that.closeAlert = function(index, alerts) {
            console.log(index + alerts);
            alerts.splice(index, 1);
        };
    })
;