YUI.add('o7-system', function (Y) {

	Y.namespace('O7').SYSTEM = (function () {
		var _version = function () {
				Y.log('YOberon 0.1a')
			},
			_adr = function (x) {
				Y.log(x);
			},
			_size = function (x) {
				return 0;
			},
			_bit = function (a, n) {
				return true;
			},
			_get = function (a, v) {},
			_put = function (a, x) {};

		return {
			VERSION : _version,
			ADR 	: _adr,
			SIZE 	: _size,
			BIT 	: _bit,
			GET 	: _get,
			PUT 	: _put
		};
	})();

}, '0.1', {});