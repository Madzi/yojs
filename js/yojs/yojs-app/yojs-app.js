YUI.add('yojs-app', function (Y) {

	var URL_ROOT	= '/',
		URL_HELP 	= '/help/',
		URL_PROJECT	= '/project/:id/',

		CONTAINER	= 'container',
		STRINGS 	= 'strings',
		PROJECTS 	= 'projects',
		USER 		= 'user';

	Y.namespace('YOJS').App = Y.Base.create('yojs-app', Y.App, [], {
		views: {
			dashboard 	: { type: Y.YOJS.Page.Dashboard },
			help 		: { type: Y.YOJS.Page.Help },
			project 	: { type: Y.YOJS.Page.Project, parent: 'dashboard' }
		},

		_preLoader: function () {
			var projects = new Y.YOJS.Model.List.Project(),
				storage = Y.one('#storage');

			storage.all('project').each(function (project) {
				var modules = new Y.YOJS.Model.List.Module(),
					model = new Y.YOJS.Model.Project({
						id 			: project.getAttribute('id'),
						name 		: project.getAttribute('name'),
						date		: project.getAttribute('date'),
						description : project.getAttribute('description'),
						modules		: modules
					});

				project.all('module').each(function (module) {
					modules.add(new Y.YOJS.Model.Module({
						id 			: module.getAttribute('id'),
						name 		: module.getAttribute('name'),
						date 		: module.getAttribute('date'),
						description	: module.getAttribute('description'),
						code		: module.getHTML()
					}));
				});

				projects.add(model);
			});

			this.setProjects(projects);
		},

		template: '<div id="app_menu"></div><div id="app_page"></div>',

		initializer: function () {
			var self 		= this,
				content 	= self.template, // Y.Handlebars.compile(self.template),
				container 	= self.getContainer();

			self._preLoader();

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

		getProjects: function () {
			return this.get(PROJECTS);
		},

		setProjects: function (projects) {
			return this.set(PROJECTS, projects);
		},

		getUser: function () {
			return this.get(USER);
		},

		showDashboard: function (req, res) {
			this.showView('dashboard', {
				user 	: this.getUser(),
				projects: this.getProjects()
			});
		},

		showHelp: function (req, res) {
			this.showView('help', {});
		},

		showProject: function (req, res) {
			var projects 	= this.getProjects(),
				id 			= req.params.id;

			this.showView('project', {
				project: projects.getById(id)
			});
		}
	}, {
		ATTRS: {
			routes: {
				value: [
					{ path: URL_ROOT, 		callbacks: 'showDashboard' },
					{ path: URL_HELP, 		callbacks: 'showHelp' },
					{ path: URL_PROJECT,	callbacks: 'showProject' }
				]
			},
			strings: {
				value: {}
			},
			projects: {
				value		: null,
				validator	: Y.YOJS.Validator.Model.List.Project
			},
			user: {
				value: null
			}
		}
	});

}, '0.1', {
	requires: [
		'app',
		'yojs-model-project',
		'yojs-page-dashboard',
		'yojs-page-help',
		'yojs-page-project'
	]
});