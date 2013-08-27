YUI.add('yojs-page-dashboard', function (Y) {

	var CONTAINER	= 'container',
		STRINGS		= 'strings';

	Y.namespace('YOJS.Page').Dashboard = Y.Base.create('yojs-page-dashboard', Y.View, [], {
		template: '<h1>{{dashboard}}</h1>',

		initializer: function () {},

		render: function (parentNode) {
			var self		= this,
				content		= Y.Handlebars.compile(self.template),
				container 	= self.getContainer(),
				strings 	= self.getStrings();

			if (parentNode instanceof Y.Node && container.get('parent') != parentNode) {
				parentNode.appendChild(container);
			}

			container.setHTML(content(strings));

			return self;
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
					dashboard: 'Рабочий стол'
				}
			}
		}
	});

}, '0.1', {
	requires: [
		'view',
		'handlebars'
	]
});