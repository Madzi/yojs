YUI.add('yojs-page-project', function (Y) {

	var CONTAINER	= 'container',
		STRINGS		= 'strings',
		PROJECT 	= 'project';

	Y.namespace('YOJS.Page').Project = Y.Base.create('yojs-page-project', Y.View, [], {
		template: '<h1>{{project}}: {{name}}</h1>' +
				'<div id="mod_tools">' +
				'<button id="btnNewModule" class="pure-button">{{btnNewModule}}</button>' +
				'<button id="btnCompile" class="pure-button">{{btnCompile}}</button>' +
				'<button id="btnRun" class="pure-button">{{btnRun}}</button>' +
				'</div>' +
				'<table class="pure-table" width="100%">' +
				'<thead><tr><th width="200px">{{modulesSection}}</th><th>{{codeSection}}</th></tr></thead>'+
				'<tbody><tr><td valign="top">' +
				'<div id="mod_list" class="modpanel"></div></td><td validgn="top">' +
				'<div id="mod_edit" class="modpanel"></div>' +
				'</td></tr></tbody></table>' +
				'<textarea id="temp"></textarea>',

		_simplifyString: function (str) {
			return str.replace('<br>', '\n').replace(/<\/?[^>]+(>|$)/g, '');
		},

		initializer: function (config) {
			config = config || {};

			if (!config.stream) {
				this.set('stream', new Y.YOJS.Stream());
			} 
		},

		render: function (parentNode) {
			var self		= this,
				content		= Y.Handlebars.compile(self.template),
				container 	= self.getContainer(),
				strings 	= self.getStrings(),
				project 	= self.getProject(),
				modules 	= project.getModules(),
				editor		= new Y.EditorBase({
					extracss: '.keyword { font-weight: bold; color: #008; } .delimiter { color: #088; }'
				}),
				table		= new Y.DataTable({
					columns: [
						{
							key			: 'num',
							label		: strings.numColumn,
							formatter	: Y.YOJS.Formatters.rowNum
						},
						{
							key			: 'name',
							label		: strings.nameColumn
						},
						{
							key			: 'date',
							label		: strings.dateColumn,
							formatter	: Y.YOJS.Formatters.date
						},
						{
							key 		: 'loaded',
							label 		: strings.loadedColumn,
							allowHTML 	: true,
							formatter 	: function (cell) {
								var modules = Y.O7 || {};

								return modules[cell.record.getName()] ? strings.yes : strings.no;
							}
						}
					],
					width: '100%',
					data: modules,
					strings: {
						emptyMessage: strings.noModules
					}
				});

			if (parentNode instanceof Y.Node && container.get('parent') != parentNode) {
				parentNode.appendChild(container);
			}

			strings.name = project && project.getName();
			container.setHTML(content(strings));

			editor.plug(Y.Plugin.EditorBR);

			table.render(container.one('#mod_list'));

			table.addAttr('selectedRow', { value: null });

			table.delegate('click', function (event) {
				this.set('selectedRow', event.currentTarget);
			}, '.yui3-datatable-data tr', table);

			table.after('selectedRowChange', function (event) {
				if (event.prevVal) {
					table.getRecord(event.prevVal).setCode(self._simplifyString(editor.getContent()));
				}
				editor.set('content', table.getRecord(event.newVal).getCode());
			}, this);

			Y.on('available', function () {
				editor.render(container.one('#mod_edit'));
			}, '#mod_edit');

			container.one('#btnCompile').on('click', function (event) {
				var token,
					stream = this.get('stream'),
					scanner = this.get('scanner');

				stream.setBuffer(editor.getContent());

				scanner.setStream(stream);
				scanner.reset();

				token = scanner.getToken();
				while (token.sym != Y.YOJS.Symbols.EOF) {
					Y.log(token);
					token = scanner.getToken();
				}
				
			}, this);

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
					project 		: 'Project',
					noModules		: 'No modules in project.',
					numColumn		: '#',
					nameColumn		: 'Name',
					dateColumn		: 'Date',
					loadedColumn	: 'Loaded',
					btnNewModule	: 'New Module',
					btnCompile		: 'Compile',
					btnRun			: 'Run',
					modulesSection	: 'Modules',
					codeSection		: 'Code',
					yes 			: 'Yes',
					no 				: 'No'
				}
			},
			project: {
				value		: null,
				validator	: Y.YOJS.Validator.Model.Project
			},
			stream: {
				value 		: null,
				validator 	: Y.YOJS.Validator.isStream
			},
			scanner: {
				value 		: new Y.YOJS.Scanner,
				validator 	: Y.YOJS.Validator.isScanner
			}
		}
	});

}, '0.1', {
	requires: [
		'view',
		'handlebars',
		'datatable',
		'editor',
		'cssbutton',
		'yojs-formatters',
		'yojs-model-project',
		'yojs-stream',
		'yojs-scanner'
	]
});