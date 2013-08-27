YUI.add('yojs-model-module', function (Y) {

	var ID 			= 'id',
		NAME 		= 'name',
		DATE		= 'date',
		DESCRIPTION	= 'description',
		CODE		= 'code';

	Y.namespace('YOJS.Model').Module = Y.Base.create('yojs-model-module', Y.Model, [], {
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

		getCode: function () {
			return this.get(CODE);
		},

		setCode: function (code) {
			return this.set(CODE, code);
		}
	}, {
		ATTRS: {
			name: {
				value		: 'noname',
				validator	: Y.Lang.isString
			},
			date: {
				value		: new Date(),
				validator	: Y.Lang.isDate
			},
			description: {
				value		: null,
				validator	: Y.Lang.isString
			},
			code: {
				value		: null
			}
		}
	});

	Y.namespace('YOJS.Model.List').Module = Y.Base.create('yojs-model-list-module', Y.ModelList, [], {
		model: Y.YOJS.Model.Module
	});

	Y.namespace('YOJS.Validator.Model').Module = function (val) {
		return val instanceof Y.YOJS.Model.Module;
	};

	Y.namespace('YOJS.Validator.Model.List').Module = function (val) {
		return val instanceof Y.YOJS.Model.List.Module;
	}

}, '0.1', {
	requires: [
		'model',
		'model-list'
	]
});