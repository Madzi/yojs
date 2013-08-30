YUI.add('yojs-page-dashboard', function (Y) {

	var CONTAINER	= 'container',
		STRINGS		= 'strings',
		PROJECTS 	= 'projects';

	Y.namespace('YOJS.Page').Dashboard = Y.Base.create('yojs-page-dashboard', Y.View, [], {
		template: '<h1>{{dashboard}}</h1>' +
				'<div id="prj_tools">' +
				'<button id="btnAdd" class="pure-button pure-button-success">{{btnAdd}}</button>' +
				'</div>' +
				'<div id="prj_table"></div>',

		initializer: function () {},

		render: function (parentNode) {
			var self		= this,
				content		= Y.Handlebars.compile(self.template),
				container 	= self.getContainer(),
				strings 	= self.getStrings(),
				table 		= new Y.DataTable({
					columns: [
						{
							key			: 'num',
							label		: strings.numColumn,
							formatter	: function (cell) {
								return cell.rowIndex + 1;
							}
						},
						{
							key			: 'name',
							label		: strings.nameColumn,
							allowHTML	: true,
							formatter	: function (cell) {
								return Y.Lang.sub('<a href="#/project/{id}/">{name}</a>', cell.record.toJSON());
							}
						},
						{
							key			: 'date',
							label		: strings.dateColumn,
							formatter	: function (cell) {
								return Y.Date.format(cell.value, { format: strings.dateFormat });
							}
						}
					],
					data: self.getProjects(),
					width: '100%',
					strings: {
						emptyMessage: strings.noProjects
					}
				});

			if (parentNode instanceof Y.Node && container.get('parent') != parentNode) {
				parentNode.appendChild(container);
			}

			container.setHTML(content(strings));

			table.render(container.one('#prj_table'));

			return self;
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
		}
	}, {
		ATTRS: {
			strings: {
				value: {
					dashboard 	: 'Projects',
					btnAdd		: 'Add',
					noProjects	: 'No projects to show',
					numColumn	: '#',
					nameColumn	: 'Name',
					dateColumn	: 'Date',
					dateFormat	: '%d.%m.%Y'
				}
			},
			projects: {
				value: null,
				validator: Y.YOJS.Validator.Model.List.Project
			}
		}
	});

}, '0.1', {
	requires: [
		'view',
		'handlebars',
		'datatable',
		'datatype',
		'cssbutton',
		'yojs-model-project'
	]
});