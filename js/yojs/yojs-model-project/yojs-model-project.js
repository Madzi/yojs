YUI.add('yojs-model-project', function (Y) {

	var ID 			= 'id',
		NAME 		= 'name',
		DATE 		= 'date',
		DESCRIPTION	= 'description',
		MODULES 	= 'modules';

	Y.namespace('YOJS.Model').Project = Y.Base.create('yojs-model-project', Y.Model, [], {
		getId: function () {
			return this.get(ID);
		},

		getName: function () {
			return this.get(NAME);
		},

		setName: function (name) {
			return this.set(NAME, name);
		},

		getDate: function () {
			return this.get(DATE);
		},

		setDate: function (date) {
			return this.set(DATE, date);
		},

		getDescription: function () {
			return this.get(DESCRIPTION);
		},

		setDescription: function (description) {
			return this.set(DESCRIPTION, description);
		},

		getModules: function () {
			return this.get(MODULES);
		},

		setModules: function (modules) {
			return this.set(MODULES, modules);
		}
	}, {
		ATTRS: {
			name: {
				value		: 'noname',
				validator	: Y.Lang.isString
			},
			date: {
				value		: new Date(),
				validator 	: Y.Lang.isDate
			},
			description: {
				value		: null,
				validator 	: Y.Lang.isString
			},
			modules: {
				value 		: null,
				validator 	: Y.YOJS.Validator.Model.List.Module
			}
		}
	});

	Y.namespace('YOJS.Model.List').Project = Y.Base.create('yojs-model-list-project', Y.ModelList, [], {
		model: Y.YOJS.Model.Project
	}, {});

	Y.namespace('YOJS.Validator.Model').Project = function (val) {
		return val instanceof Y.YOJS.Model.Project;
	};

	Y.namespace('YOJS.Validator.Model.List').Project = function (val) {
		return val instanceof Y.YOJS.Model.List.Project;
	};

}, '0.1', {
	requires: [
		'model',
		'model-list',
		'yojs-model-module'
	]
});