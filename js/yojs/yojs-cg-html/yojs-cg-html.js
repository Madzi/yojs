YUI.add('yojs-cg-html', function (Y) {

	var TEMPLATES = {
			MODULE: '<span class="keyword">MODULE</span> {{name}}<span class="delimiter">;</span>'
		};

	function HtmlGen (config) {
//		Y.log(config);
	};

	HtmlGen.prototype = {
		toHtml: function () {
			var template,
				obj = this.get('objId');

			switch (obj) {
				case 'module':
					template = Y.Handlebars.compile(TEMPLATES.MODULE);
					return template({
						name: this.get('name'),
						desc: this.get('description'),
						code: 'xx',
						imps: 'xxx'
					});

				default:
					return '';
			}
		}
	};

	Y.namespace('YOJS.Codegen').Html = HtmlGen;

}, '1.0', {
	requires: [
		'handlebars'
	]
});