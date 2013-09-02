YUI.add('yojs-stream', function (Y) {

	var STREAM 	= 'stream';

	Y.namespace('YOJS').Stream = Y.Base.create('yojs-stream', Y.Model, [], {
		_line	: 0,
		_col	: 0,
		_pos	: 0,
		initializer: function () {
			this.after('valueChange', this.reset, this);
		},
		reset: function () {
			this._line = 1;
			this._col = 0;
			this._pos = 0;
		},
		setPos: function (pos) {
			var buf = this.get(STREAM);

			if (Y.Lang.isNull) {
				this._pos = 0;
			} else {
				this._pos = (pos < buf.length) ? pos : buf.length;
			}
		},
		get: function () {
			var ch,
				buf = this.get(STREAM);

			if (!Y.Lang.isNull(buf)) {
				if (this._pos < buf.length) {
					ch = buf.charAt(this._pos);
					this._pos += 1;
					if (ch == '\n') {
						this._line += 1;
						this._col = 0;
					} else {
						this._col += 1;
					}
					return ch;
				}
			}
			return null;
		},
		eof: function () {
			var buf = this.get(STREAM);

			return Y.Lang.isNull(buf) || this._pos >= buf.length;
		},
	}, {
		ATTRS: {
			stream: {
				value		: null,
				validator	: Y.Lang.isString
			}
		}
	});

	Y.namespace('YOJS.Validator').isStream = function (val) {
		return val instanceof Y.YOJS.Stream;
	};

}, '0.1', {
	requires: [
		'model'
	]
});