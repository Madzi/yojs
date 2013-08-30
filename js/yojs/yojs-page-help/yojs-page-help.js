YUI.add('yojs-page-help', function (Y) {

	var CONTAINER 	= 'container',
		STRINGS 	= 'strings';

	Y.namespace('YOJS.Page').Help = Y.Base.create('yojs-page-help', Y.View, [], {
		template: '<h1>{{help}}</h1>' +
				'<p>{{string1}}</p>',

		initializer: function () {},

		render: function (parentNode) {
			var content		= Y.Handlebars.compile(this.template),
				container 	= this.getContainer(),
				strings 	= this.getStrings();

			if (parentNode instanceof Y.Node && container.get('parent') != parentNode) {
				parentNode.appendChild(container);
			}

			container.setHTML(content(strings));

			return this;
		},

		getContainer: function () {
			return this.get(CONTAINER);
		},

		getStrings: function () {
			return this.get(STRINGS);
		}
	}, {
		ATTRS: {
			strings: {
				value: {
					help 	: 'Help',
					string1	: 'This is Oberon-07 to javascript translator.'
				}
			}
		}
	});

}, '0.1', {
	requires: [
		'view',
		'handlebars',
		'cssbutton'
	]
});