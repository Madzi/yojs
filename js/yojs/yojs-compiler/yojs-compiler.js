YUI.add('yojs-compiler', function (Y) {

	Y.namespace('YOJS').compiler = (function () {
		var _item,
			_create_module = function (name) {
				return {
					type: 'module',
					name: name,
					imports: [],
					types: []
					vars: [],
					procs: [],
					code: []
				};
			},

			_make_module = function (module) {
				var body 		= {},
					imps 		= [],
					template 	= Y.Handlebars.compile("YUI.add('o7-{{name}}', function (Y) { {{code}} }, '0.1a', { requires: [{{#imports}}'{{name}}', {{/imports}} 'yojs-rtl'] });");

				if (module.type === 'module' && module.name.length > 0) {
					body.name = module.name.toLowerCase();
					body.imports = body.imports;
					return template(body);
				}
				return '';
			},

			_run_module = function (module) {
				Y.add();
			},

			_parse = function () {
				return null; // ast
			},

			_generate = function (ast) {};

		return {
			parse 	: _parse,
			generate: _generate
		};
	})();

}, '0.1', {
	requires: [
		'handlebars'
	]
});