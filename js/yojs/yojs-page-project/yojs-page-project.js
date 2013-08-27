YUI.add('yojs-page-project', function (Y) {

	var CONTAINER	= 'container',
		STRINGS		= 'strings',
		PROJECT 	= 'project';

	Y.namespace('YOJS.Page').Project = Y.Base.create('yojs-page-project', Y.View, [], {
		template: '<h1>{{project}}: {{name}}</h1>',

		initializer: function () {},

		render: function (parentNode) {
			var self		= this,
				content		= Y.Handlebars.compile(self.template),
				container 	= self.getContainer(),
				strings 	= self.getStrings(),
				project 	= self.getProject();

			if (parentNode instanceof Y.Node && container.get('parent') != parentNode) {
				parentNode.appendChild(container);
			}

			container.setHTML(content({
				project : strings.project,
				name 	: project && project.getName()
			}));

			return self;
		},

		getContainer: function () {
			return this.get(CONTAINER);
		},

		getStrings: function () {
			return this.get(STRINGS);
		},

		getProject: function () {
			return this.get(PROJECT);
		},

		setProject: function (project) {
			return this.set(PROJECT, project);
		}
	}, {
		ATTRS: {
			strings: {
				value: {
					project 	: 'Project',
					noModules	: 'No modules in project.',
					numColumn	: 'num',
					nameColumn	: 'name',
					dateColumn	: 'date'
				}
			},
			project: {
				value		: null,
				validator	: Y.YOJS.Validator.Model.Project
			}
		}
	});

}, '0.1', {
	requires: [
		'view',
		'handlebars',
		'datatable',
		'datatype',
		'yojs-model-project'
	]
});