angular.module('Birthday')
    .service('TableResource', function($resource) {

		var url = "/saveExcel";

		return $resource(url, {}, {
					save: {
							method:'POST',
							url:url
					}
		});
    })
	.service('tableReadService', function($q){
		var vm = this;


		//从文件中出内容
		this.readTable= function(file) {

			return $q(function(resolve, reject) {
				var fileReader = new FileReader();
				//回调函数,当读入文件成功时能够进行
				fileReader.onload = function(binary) {
					var data = binary.target.result;
					var workbook = XLSX.read(data, {type: 'binary'});
				    if (workbook) {
				      resolve(workbook);
				    } else {
				      reject(undefined);
				    }
				};

				fileReader.readAsBinaryString(file);
			});

		};

		this.readAllRowsFromTable = function(excel, sheetIndex) {
			var first_sheet_name = excel.SheetNames[0];

			var sheet = excel.Sheets[first_sheet_name];

			var rangeStr = sheet["!ref"];
			var range = XLSX.utils.decode_range(rangeStr)

			var allCells = [];

			//获得表格的大小
			var rowHeight = range.e.r - range.s.r;
			var colWidth = range.e.c - range.s.c;

			//获得表格内容
			for(var row = range.s.r; row < range.e.r; ++row) {
				var rowCells = [];
				for(var col = range.s.c; col < range.e.c; ++ col) {
					var cell_address = {c:col, r:row};
					var temp = XLSX.utils.encode_cell(cell_address);
					
					if (sheet[temp] == undefined) {
						rowCells.push(" ");
					} else {
						rowCells.push(sheet[temp].v);
					}
				}
				allCells.push(rowCells);
			}

			return {
				rowHeight : rowHeight,
				colWidth  : colWidth,
				cells     : allCells
			}
		};

		this.getAllCellsFromFile = function(file, items) {
			vm.readTable(file).then(function(data) {

				var table = vm.readAllRowsFromTable(data);
				items.data = table.cells;

			}, function(resp) {
				console.log(resp);
			});
		}
	})
	.service('tableWriteService', function(TableResource) {
		var writeOptions = { bookType:'xlsx', bookSST:false, type:'binary' };

		/**
		 * 当没有表时需要建立一个新表
		 * @constructor
         */
		function Workbook () {
			this.SheetNames = [];
			this.Sheets = {};
		}

		/**
		 * 获得当前数组所对应的sheet的大小
		 * @param data
		 * @returns {{s: {c: number, r: number}, e: {}}}
         */
		function getRange(data) {
			var range = {
				s:{
					c : 0,
					r : 0
				},
				e:{}
			};
			var endRow = data.length;
			var endCol;
			if(data[0] != undefined) {
				endCol = data[0].length;
			} else {
				endCol = 100;
			}
			range.e = {
				c : endCol,
				r : endRow
			};
			return range;
		}

		/**
		 * 把数组元素写入一个sheet中
		 * @param data 二维数组，代表需要写入的内容
         * @returns sheet 写入后的sheet
         */
		function writeToSheet(data) {
			var sheet = {};
			//获得单元格的大小
			var range = getRange(data);
			for(var row = range.s.r; row < range.e.r; row++) {
				for(var col = range.s.c; col < range.e.c; col++) {

					var cell = {v:data[row][col]};

					var cellAddress = XLSX.utils.encode_cell({c:col, r:row});
					if(cell.v == undefined) {
						continue;
					}
					//设置单元格的类型
					if (typeof cell.v === 'number') {
						cell.t = 'n';
					} else if (typeof cell.v === 'boolean') {
						cell.t = 'b';
					} else if (cell.v instanceof Date) {

					} else {
						cell.t = 's';
					}

					sheet[cellAddress] = cell;
				}
			}
			sheet['!ref'] = XLSX.utils.encode_range(range);
			return sheet;
		}

		function checkAndCreateNewWorkbook(workbook) {
			if (workbook == undefined) {
				workbook = new Workbook();
			}
			return workbook;
		}

		function checkSheetName(sheetName) {
			if(sheetName == undefined) {
				sheetName = "sheet1";
			}
			return sheetName;
		}

		function checkSheetExist(workbook, sheetName) {
			if(workbook.SheetNames.indexOf(sheetName) == -1) {
				workbook.SheetNames.push(sheetName);
			}
			return workbook;
		}

		function changeWorkbookToBase64(output) {

			var buf = new ArrayBuffer(output.length);
			var view = new Uint8Array(buf);

			for(var i = 0; i < output.length; ++i) {
				view[i] = output.charCodeAt(i) & 0xFF;
			}
			return buf;
		}

		/**
		 * 保存数据库到本地
		 * @param data
		 * @param sheetName
         * @param workbook
         */
		this.save = function(data, sheetName, workbook) {

			workbook = checkAndCreateNewWorkbook(workbook);

			sheetName = checkSheetName(sheetName);

			workbook = checkSheetExist(workbook, sheetName);

			workbook.Sheets[sheetName] = writeToSheet(data);

			var wbout = XLSX.write(workbook, writeOptions);

			//保存数据库到服务器，需要的时候开启
         	//TableResource.save({workbook : workbook});

			var fileName = "result_" + new　Date() + ".xlsx";
			saveAs(new Blob([changeWorkbookToBase64(wbout)],{type:""}), fileName);

		};
	})
;