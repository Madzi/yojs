YUI.add('yojs-parser', function (Y) {

	Y.namespace('YOJS').Parser = Y.Base.create('yojs-parser', Y.Model, [], {
		parse: function () {
			return '';
		}
	}, {
		ATTRS: {
			scanner: {
				value		: null,
				validator	: Y.YOJS.isScanner
			}
		}
	});

	Y.namespace('YOJS').isParser = function (val) {
		return val instanceof Y.YOJS.Parser;
	};

}, '0.1', {
	requires: [
		'model',
		'yojs-scanner'
	]
});