YUI.add('yojs-rtl', function (Y) {
	
	Y.namespace('YOJS').RTL = (function () {
		var _abs = function (x) {
				return Math.abs(x);
			},
			_odd = function (x) {
				return x & 1;
			},
			_len = function (v) {
				return v.length;
			},
			_lsl = function (x, n) {
				return x << n;
			},
			_asr = function (x, n) {
				return x >> n;
			},
			_ror = function (x, n) {
				return x >>> n;
			},
			_floor = function (x) {
				return Math.floor(x);
			},
			_flt = function (x) {
				return x;
			},
			_ord = function (x) {
				if (Y.Lang.isBoolean(x)) {
					return x ? 1 : 0;
				}
				return x;
			},
			_chr = function (x) {
				return x;
			},
			_long = function (x) {
				return x;
			},
			_short = function (x) {
				return x;
			},
			_inc = function (v, n) {
				return v + (n ? n : 1);
			},
			_dec = function (v, n) {
				return v - (n ? n : 1);
			},
			_incl = function (v, x) {},
			_excl = function (v, x) {},
			_copy = function (x, v) {},
			_new = function (v) {},
			_assert = function (b, n) {},
			_pack = function (x, y) {
				y *= Math.Pow(2, x);
			},
			_unpk = function (x, y) {};

		return {
			ABS 	: _abs,
			ODD 	: _odd,
			LEN 	: _len,
			LSL 	: _lsl,
			ASR 	: _asr,
			ROR 	: _ror,
			FLOOR 	: _floor,
			FLT 	: _flt,
			ORD 	: _ord,
			CHR 	: _chr,
			LONG 	: _long,
			SHORT 	: _short,
			INC 	: _inc,
			DEC 	: _dec,
			INCL 	: _incl,
			EXCL 	: _excl,
			COPY 	: _copy,
			NEW 	: _new,
			ASSERT 	: _assert,
			PACK 	: _pack,
			UNPK 	: _unpk
		};
	})();

}, '0.1', {});