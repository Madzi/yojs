YUI.add('yojs-app', function (Y) {

	var URL_ROOT	= '/',

		CONTAINER	= 'container',
		STRINGS 	= 'strings',
		USER 		= 'user';

	Y.namespace('YOJS').App = Y.Base.create('yojs-app', Y.App, [], {
		views: {
			dashboard: { type: Y.YOJS.Page.Dashboard }
		},

		template: '<div id="app_page"></div>',

		initializer: function () {
			var self 		= this,
				content 	= self.template, // Y.Handlebars.compile(self.template),
				container 	= self.getContainer();

			container.setHTML(content);
			self.set('viewContainer', container.one('#app_page'));

			self.once('ready', function (event) {
				if (self.hasRoute(self.getPath())) {
					self.dispatch();
				} else {
					self.showDashboard();
				}
			});
		},

		getContainer: function () {
			return this.get(CONTAINER);
		},

		getStrings: function () {
			return this.get(STRINGS);
		},

		getUser: function () {
			return this.get(USER);
		},

		showDashboard: function (req, res) {
			this.showView('dashboard', {});
		}
	}, {
		ATTRS: {
			routes: {
				value: [
					{ path: URL_ROOT, callbacks: 'showDashboard' }
				]
			},
			strings: {
				value: {}
			},
			user: {
				value: null
			}
		}
	});

}, '0.1', {
	requires: [
		'app',
		'yojs-page-dashboard'
	]
});