YUI.add('yojs-scanner', function (Y) {

	var Symbols = {
		OCPL: {
			NULL 		:  0,	TIMES 		:  1,	SLASH 		:  2,	DIV 	:  3,	MOD 	:  4,
			AND			:  5,	PLUS		:  6,	MINUS		:  7,	OR		:  8,	EQL		:  9,
			NEQ			: 10,	LSS			: 11,	LEQ			: 12,	GTR		: 13,	GEQ		: 14,
			IN			: 15,	IS			: 16,	ARROW		: 17,	PERIOD 	: 18,	COMMA	: 19,
			COLON		: 20,	UPTO		: 21,	RPAREN		: 22,	RBRAK	: 23,	RBRACE	: 24,
			OF			: 25,	THEN		: 26,	DO			: 27,	TO		: 28,	BY		: 29,
			LPAREN		: 30,	LBRAK		: 31,	LBRACE		: 32,	NOT		: 33,	BECOMES	: 34,
			NUMBER		: 35,	NIL			: 36,	TRUE		: 37,	FALSE	: 38,	STRING	: 39,
			IDENT		: 40,	SEMICLOLON	: 41,	BAR			: 42,	END		: 43,	ELSE	: 44,
			ELSIF		: 45,	UNTIL		: 46,	IF			: 47,	CASE	: 48,	WHILE	: 49,
			REPEAT		: 50,	FOR			: 51,	LOOP		: 52,	WITH	: 53,	EXIT	: 54,
			RETURN 		: 55,	ARRAY		: 56,	OBJECT		: 57,	RECORD	: 58,	POINTER	: 59,
			BEGIN		: 60,	CODE		: 61,	CONST		: 62,	TYPE	: 63,	VAR		: 64,
			PROCEDURE 	: 65,	IMPORT		: 66,	MODULE		: 67,	EOF		: 68,	ERROR 	: 69 
		},
		O7: {
			NULL 		:  0,	TIMES 		:  1,	SLASH 		:  2,	DIV 		:  3,	MOD 		:  4,
			AND			:  5,	PLUS		:  6,	MINUS		:  7,	OR			:  8,	EQL			:  9,
			NEQ			: 10,	LSS			: 11,	LEQ			: 12,	GTR			: 13,	GEQ			: 14,
			IN			: 15,	IS			: 16,	ARROW		: 17,	PERIOD 		: 18,	COMMA		: 19,
			COLON		: 20,	UPTO		: 21,	RPAREN		: 22,	RBRAK		: 23,	RBRACE		: 24,
			OF			: 25,	THEN		: 26,	DO			: 27,	TO			: 28,	BY			: 29,
			LPAREN		: 30,	LBRAK		: 31,	LBRACE		: 32,	NOT			: 33,	BECOMES		: 34,
			NUMBER		: 35,	NIL			: 36,	TRUE		: 37,	FALSE		: 38,	STRING		: 39,
			IDENT		: 40,	SEMICLOLON	: 41,	BAR			: 42,	END			: 43,	ELSE		: 44,
			ELSIF		: 45,	UNTIL		: 46,	IF			: 47,	CASE		: 48,	WHILE		: 49,
			REPEAT		: 50,	FOR			: 51,	
			RETURN 		: 55,	ARRAY		: 56,						RECORD		: 58,	POINTER		: 59,
			BEGIN		: 60,						CONST		: 62,	TYPE		: 63,	VAR			: 64,
			PROCEDURE 	: 65,	IMPORT		: 66,	MODULE		: 67,	EOF			: 68,	ERROR 		: 69 
		}
	},

	SYM_TYPES = {
		NULL 		: null,
		IDENT 		: 'IDENT',
		STRING 		: 'STRING',
		RELATION	: 'RELATION',
		OPERATOR 	: 'OPERATOR',
		KEYWORD		: 'KEYWORD',
		WHITESPACE	: 'WHITESPACE',
		DELIMITER	: 'DELIMITER',
		ERROR		: 'ERROR',
		COMMENT 	: 'COMMENT',
		NUMBER 		: 'NUMBER'
	},

	STREAM 		= 'stream',
	SYMBOLS 	= 'symbols';

	Y.namespace('YOJS').Symbols = Symbols.O7;

	Y.namespace('YOJS').Scanner = Y.Base.create('yojs-scanner', Y.Model, [], {
		_ch: null,

		_sym: function (sym, type, name) {
			return {
				sym 	: sym,
				type 	: type,
				name 	: name
			}
		},

		initializer: function () {
			this.after('symbolsChange', this.reset, this);
		},

		reset: function () {
			var stream = this.getStream();
			if (!Y.Lang.isNull(stream)) {
				stream.reset();
			}
			this.getCh();
		},

		getCh: function () {
			var stream = this.getStream();

			this._ch = Y.Lang.isNull(stream) ? null : stream.getCh();
		}, 

		getToken: function () {
			var was,
				symbols = this.getSymbols();

			if (this._ch) {
				if (this.isAlpha(this._ch)) {
					return this.ident();
				} else if (this.isDigit(this._ch)) {
					return this.number();
				}
				switch (this._ch) {
					case '"':
					case "'":
						return this.string();
					case '#':
						this.getCh();
						return this._sym(symbols.NEQ, SYM_TYPES.RELATION, '#');
					case '&':
						this.getCh();
						return this._sym(symbols.AND, SYM_TYPES.OPERATOR, '&');
					case '(':
						this.getCh();
						if (this._ch == '*') {
							return this.comment();
						} else {
							return this._sym(symbols.LPAREN, SYM_TYPES.DELIMITER, '(');
						}
					case ')':
						this.getCh();
						return this._sym(symbols.RPAREN, SYM_TYPES.DELIMITER, ')');
					case '*':
						this.getCh();
						return this._sym(symbols.TIMES, SYM_TYPES.OPERATOR, '*');
					case '+':
						this.getCh();
						return this._sym(symbols.PLUS, SYM_TYPES.OPERATOR, '+');
					case ',':
						this.getCh();
						return this._sym(symbols.COMMA, SYM_TYPES.DELIMITER, ',');
					case '-':
						this.getCh();
						return this._sym(symbols.MINUS, SYM_TYPES.OPERATOR, '-');
					case '.':
						this.getCh();
						if (this._ch == '.') {
							this.getCh();
							return this._sym(symbols.UPTO, SYM_TYPES.DELIMITER, '..');
						} else {
							return this._sym(symbols.PERIOD, SYM_TYPES.DELIMITER, '.');
						}
					case ':':
						this.getCh();
						if (this._ch == '=') {
							this.getCh();
							return this._sym(symbols.BECOMES, SYM_TYPES.OPERATOR, ':=');
						} else {
							return this._sym(symbols.COLON, SYM_TYPES.DELIMITER, ':');
						}
					case ';':
						this.getCh();
						return this._sym(symbols.SEMICLOLON, SYM_TYPES.DELIMITER, ';');
					case '<':
						this.getCh();
						if (this._ch == '=') {
							this.getCh();
							return this._sym(symbols.EQL, SYM_TYPES.RELATION, '<=');
						} else {
							return this._sym(symbols.LSS, SYM_TYPES.RELATION, '<');
						}
					case '=':
						this.getCh();
						return this._sym(symbols.EQL, SYM_TYPES.RELATION, '=');
					case '>':
						this.getCh();
						if (this._ch == '=') {
							this.getCh();
							return this._sym(symbols.GEQ, SYM_TYPES.RELATION, '>=');
						} else {
							return this._sym(symbols.GTR, SYM_TYPES.RELATION, '>');
						}
					case '[':
						this.getCh();
						return this._sym(symbols.LBRAK, SYM_TYPES.DELIMITER, '[');
					case ']':
						this.getCh();
						return this._sym(symbols.RBRAK, SYM_TYPES.DELIMITER, ']');
					case '^':
						this.getCh();
						return this._sym(symbols.ARROW, SYM_TYPES.OPERATOR, '^');
					case '{':
						this.getCh();
						return this._sym(symbols.LBRACE, SYM_TYPES.DELIMITER, '{');
					case '|':
						this.getCh();
						return this._sym(symbols.BAR, SYM_TYPES.DELIMITER, '|');
					case '}':
						this.getCh();
						return this._sym(symbols.RBRACE, SYM_TYPES.DELIMITER, '}');
					case '~':
						this.getCh();
						return this._sym(symbols.NOT, SYM_TYPES.OPERATOR, '~');
					default:
						was = this._ch;
						this.getCh();
						return this._sym(symbols.NULL, SYM_TYPES.NULL, was);
				}
			}
			return this._sym(symbols.EOF, SYM_TYPES.NULL, null);
		},

		isAlpha: function (ch) {
			return /[a-zA-Z_]/.test(ch);
		},

		isDigit: function (ch) {
			return /[0-9]/.test(ch);
		},

		ident: function () {
			var kwtest,
				idname = '';

			while (this.isAlpha(this._ch)) {
				idname += this._ch;
				this.getCh();
			}

			kwtest = this.get('symbols')[idname];

			if (kwtest) {
				return this._sym(kwtest, SYM_TYPES.KEYWORD, idname);
			}
			return this._sym(this.get('symbols').IDENT, SYM_TYPES.IDENT, idname);
		},

		number: function () {
			var number = parseInt(this._ch , 10);

			this.getCh();
			return this._sym(this.get('symbols').NUMBER, SYM_TYPES.NUMBER, number);
		},

		string: function () {
			var chars = '',
				symbols = this.get('symbols'),
				qt = this._ch;

			this.getCh();
			while (!Y.Lang.isNull(this._ch) && this._ch !== qt) {
				chars += this._ch;
				this.getCh();
			}
			if (Y.Lang.isNull(this._ch)) {
				return this._sym(symbols.ERROR, SYM_TYPES.ERROR, strings.stringNotClosed);
			}
			this.getCh();
			return this._sym(symbols.STRING, SYM_TYPES.STRING, chars);
		},

		comment: function () {
			var mode 	= this._ch,
				comment = '(*',
				symbols = this.get('symbols'),
				level	= 1;

			while (level > 0 && !Y.Lang.isNull(this._ch)) {
				this.getCh();
				comment += this._ch;
				switch (this._ch) {
					case ')':
						if (mode === '*') {
							level -= 1;
							mode = ')';
						}
						break;

					case '(':
						mode = '(';
						break;

					case '*':
						if (mode === '(') {
							level += 1;
						}
						mode = '*';
						break;

					default:
						mode = '?';
				}
			}
			if (Y.Lang.isNull(this._ch)) {
				return this._sym(symbols.ERROR, SYM_TYPES.ERROR, strings.commentNotClosed);
			}
			return this._sym(symbols.NULL, SYM_TYPES.COMMENT, comment);
			
		},

		getStream: function () {
			return this.get('stream');
		},

		setStream: function (stream) {
			return this.set('stream', stream);
		},

		getSymbols: function () {
			return this.get('symbols');
		},

		setSymbols: function (symbols) {
			return this.set('symbols', symbols);
		}
	}, {
		ATTRS: {
			strings: {
				stringNotClosed		: 'String not closed',
				commentNotClosed	: 'Comment not closed'
			},
			stream: {
				value		: null,
				validator	: Y.YOJS.Validator.isStream
			},
			symbols: {
				value		: Symbols.O7,
				validator	: Y.Lang.isObject
			}
		}
	});

	Y.namespace('YOJS').isScanner = function (val) {
		return val instanceof Y.YOJS.Scanner;
	};

}, '0.1', {
	requires: [
		'model',
		'yojs-stream'
	]
});