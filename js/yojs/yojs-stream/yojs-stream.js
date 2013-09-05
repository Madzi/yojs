YUI.add('yojs-stream', function (Y) {

	Y.namespace('YOJS').Stream = Y.Base.create('yojs-stream', Y.Model, [], {
		_line 	: 1,
		_col 	: 0,
		_pos 	: 0,

		initializer: function (config) {
			this.after('bufferChange', this.reset, this);
		},

		reset: function () {
			this._line = 1;
			this._col = 0;
			this._pos = 0; 
		},

		setPos: function (pos) {
			var buf = this.get('buffer');

			if (Y.Lang.isNull(buf)) {
				this._pos = 0;
			} else {
				this._pos = (pos < buf.length) ? pos : buf.length;
			}
		},

		getCh: function () {
			var ch,
				buf = this.get('buffer');

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
			var buf = this.get('buffer');

			return Y.Lang.isNull(buf) || this._pos >= buf.length;
		},

		getBuffer: function () {
			return this.get('buffer');
		},

		setBuffer: function (buffer) {
			buffer = (buffer || '').replace('<br>', '\n').replace(/<\/?[^>]+(>|$)/g, '');
			return this.set('buffer', buffer);
		}
	}, {
		ATTRS: {
			buffer: {
				value 		: null,
				validator 	: Y.Lang.isString
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