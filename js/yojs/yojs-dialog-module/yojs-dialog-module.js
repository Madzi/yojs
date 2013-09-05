YUI.add('yojs-dialog-module', function (Y) {

	Y.namespace('YOJS.Dialog').Module = (function () {
		var _module,
			_panel = new Y.Panel({}),
			_show = function (module, callback) {
				_module = module;
				_panel.callback = callback;
			};

		return {
			show: _show
		};
	})();

}, '0.1', {
	requires: [
		'panel'
	]
});