YUI.add('yojs-cg-oberon', function (Y) {

	var TEMPLATES = {
			MODULE: "MODULE {{name}};\n(**\n * {{desc}}\n *)\n\n{{imps}}\n\n{{code}}\n\nEND {{name}}."
		};

	function OGen (config) {
		// Y.log(config);
	};

	OGen.prototype = {
		toOberon: function () {
			var template,
				obj = this.get('objId');

			switch (obj) {
				case 'module':
					template = Y.Handlebars.compile(TEMPLATES.MODULE);
					return template({
						name: this.get('name'),
						desc: this.get('description'),
						code: 'xxx',
						imps: 'xx'
					});

				default:
					return '';
			}
		}
	};

	Y.namespace('YOJS.Codegen').Oberon = OGen;

}, '0.1', {
	requires: [
		'handlebars'
	]
});