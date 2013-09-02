YUI.add('yojs-ui', function (Y) {
		// <link rel="stylesheet" href="http://yui.yahooapis.com/pure/0.2.1/pure-min.css">
		// <link rel="stylesheet" type="text/css" href="https://rawgithub.com/tilomitra/cssextras/master/css/cssextras.css">
		// <script src="http://yui.yahooapis.com/3.12.0/build/yui/yui-min.js"></script>

	var CLASSES = {
			FORM 	: 'pure-form',
			FIELD 	: 'pure-field',
			LABEL 	: 'pure-label',
			TEXT 	: 'pure-text',
			HINT 	: 'yui3-badge'
		},

		NODE_TEMPLATE 	= '<div></div>',
		LABEL_TEMPLATE 	= '<label for="{id}">{label}</label>'
		INPUT_TEMPLATE 	= '<input id="{id}" type="{type}">',
		HINT_TEMPLATE	= '<span>{hint}</span>';

	Y.namespace('EUI.UI').Field = Y.Base.create('eui-ui-field', Y.View, [], {
		_dom: {},

		renderUI: function () {
			Y.log('Abstract function "renderUI" not override!', 'error');
		},

		render: function (parentNode) {
			var node 		= parentNode instanceof Y.Node ? parentNode : Y.one(parentNode),
				container	= this.get('container');

			if (!Y.Lang.isNull(node) && container.get('parent') != node) {
				node.replace(container);
			}

			this.renderUI();

			return this;
		}
	}, {
		ATTRS: {
			id: {
				value 	: Y.guid(),
				readonly: true
			},
			container: {
				valueFn: function () {
					var node = Y.Node.create(NODE_TEMPLATE);
					node.setAttribute('id', this.get('id') + '_group');
					node.addClass(CLASSES.FIELD);
					return node;
				}
			},
			readonly: {
				value 		: false,
				validator	: Y.Lang.isBoolean
			},
			disabled: {
				value 		: false,
				validator	: Y.Lang.isBoolean
			}
		}
	});
	Y.namespace('EUI.UI').Input = Y.Base.create('eui-ui-input', Y.EUI.UI.Field, [], {
		renderUI: function () {
			var id 			= this.get('id'),
				container 	= this.get('container'),
				label 		= Y.Node.create(Y.Lang.sub(LABEL_TEMPLATE, { id: id, label: this.get('label') })),
				input 		= Y.Node.create(Y.Lang.sub(INPUT_TEMPLATE, { id: id, type: this.get('type') })),
				hint 		= Y.Node.create(Y.Lang.sub(HINT_TEMPLATE, { hint: this.get('hint') }));

			label.addClass(CLASSES.LABEL);
			label.addClass('pure-u-1-2');
			this._dom.label = label;
			container.appendChild(label);

			input.addClass(CLASSES.TEXT);
			input.addClass('pure-u-1-2');
			input.setAttribute('placeholder', this.get('placeholder'));
			this._dom.input = input;
			container.appendChild(input);

			hint.addClass(CLASSES.HINT);
			hint.hide();
			this._dom.hint = hint;
			container.appendChild(hint);
		}
	}, {
		ATTRS: {
			type: {
				value 	: null,
				readonly: true
			},
			label: {
				value 		: '',
				validator	: Y.Lang.isString,
				writeOnce 	: true
			},
			placeholder: {
				value 		: '',
				validator 	: Y.Lang.isString,
				writeOnce 	: true
			},
			hint: {
				value 		: '',
				validator 	: Y.Lang.isString
			},
			tooltip: {
				value 		: '',
				validator 	: Y.Lang.isString
			}
		}
	});
	Y.namespace('EUI.UI').Text = Y.Base.create('eui-ui-text', Y.EUI.UI.Input, [], {
	}, {
		ATTRS: {
			type: {
				value 		: 'text',
				readonly	: true
			}
		}
	});
	Y.namespace('EUI.UI').Password = Y.Base.create('eui-ui-password', Y.EUI.UI.Input, [], {}, {
		ATTRS: {
			type: {
				value 		: 'password',
				readonly	: true
			}
		}
	});
	Y.namespace('EUI.UI').InputWithButton = Y.Base.create('eui-ui-input-with-button', Y.EUI.UI.Input, [], {}, {});
	Y.namespace('EUI.UI').Date = Y.Base.create('eui-ui-date', Y.EUI.UI.InputWithButton, [], {}, {
		ATTRS: {
			type: {
				value 		: 'date',
				readonly 	: true
			}
		}
	});
	Y.namespace('EUI.UI').Time = Y.Base.create('eui-ui-time', Y.EUI.UI.InputWithButton, [], {}, {
		ATTRS: {
			type: {
				value 		: 'time',
				readonly 	: true
			}
		}
	});

}, '0.1', {
	requires: [
		'view'
	]
});