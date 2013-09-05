YUI.add('yojs-cg-javascript', function (Y) {

	var TEMPLATES = {
			MODULE: "YUI.add('o7-{{name}}', function (Y) {\n/**\n * {{desc}}\n */\n{{code}}\n\n}, '0.1', {\n{{imps}}\n});"
		};

	function JSGen (config) {
//		Y.log(config);
	};

	JSGen.prototype = {
		toJavascript: function () {
			var template,
				obj = this.get('objId');

			switch (obj) {
				case 'module':
					template = Y.Handlebars.compile(TEMPLATES.MODULE);
					return template({
						name: this.get('name').toLocaleLowerCase(),
						desc: this.get('description'),
						code: 'xx',
						imps: 'xxx'
					});

				default:
					return '';
			}
		}
	};

	Y.namespace('YOJS.Codegen').Javascript = JSGen;

}, '1.0', {
	requires: [
		'handlebars'
	]
});