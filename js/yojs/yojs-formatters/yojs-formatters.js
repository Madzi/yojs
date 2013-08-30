YUI.add('yojs-formatters', function (Y) {
	
	var strings = {
			shortDate	: '%d.%m.%Y'
		};

	Y.namespace('YOJS').Formatters = (function () {
		var _x,
			_rowNum = function (cell) {
				return cell.rowIndex + 1;
			},
			_date = function (cell) {
				var val = Y.Lang.isDate(cell.value) ? cell.value : Y.Date.Parse(cell.value);

				return Y.Date.format(val, { format: strings.shortDate });
			};

		return {
			rowNum	: _rowNum,
			date 	: _date
		};
	})();

}, '0.1', {
	requires: [
		'datatype'
	]
});