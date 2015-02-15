(function(){
	

	var exprDict = {
		'+': { exec: function(a, b) { return a + b; } },
		'-': { exec: function(a, b) { return a - b; } },
		'*': { exec: function(a, b) { return a * b; } },
		'/': { exec: function(a, b) { return a / b; } }
	};

	function Calc(){
	}

	Calc.prototype = {

		solve: function(expr){
			if(typeof expr !== 'string') throw 'input parameter must be value of string type';

			var parser = new Parser(expr),
				arg1 = parser.getArg(),
				arg2,
				expr;

			while(!parser.isEnd()){
				
				expr = parser.getExpr();
				arg2 = parser.getArg();
				arg1 = exprDict[expr].exec(arg1, arg2);
			}

			return parseInt(arg1);
		},

		defineOperator: function(expr, fn){

			if(exprDict[expr] && !exprDict[expr].isCustom) {
				throw 'unable to replace default operator';
			}

			exprDict[expr] = { exec: fn, isCustom: true };

		}

	}

	function Parser(expr){

		this.expr = expr.slice(0);
		this.pos = 0;

	}

	Parser.prototype = {

		argChars: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'], 

		isEnd: function(){
			return this.pos >= this.expr.length;
		},

		getArg: function(){
			var arg = this.getWhile(this.isArgChar.bind(this));
			return parseInt(arg);
		},

		getExpr: function(){
			return this.getWhile(this.isExprChar.bind(this));
		},

		getWhile: function(condition){
			var result = '';
			while(this.pos < this.expr.length && condition(this.expr[this.pos])) {
				result += this.expr[this.pos];
				this.pos++;
			}
			return result;
		},

		isArgChar: function(c){
			return this.argChars.indexOf(c) > -1;
		},

		isExprChar: function(c){
			return this.argChars.indexOf(c) === -1;
		},

	}


	window.Calc = Calc;

})();

