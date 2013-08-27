YUI.add('o7-system', function (Y) {

	Y.namespace('O7').SYSTEM = (function () {
		var _version = '0.1a',
			_write = function (x) {
				Y.log(x);
			};

		return {
			write: _write
		};
	})();

}, '0.1', {});