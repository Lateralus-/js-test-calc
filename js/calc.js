(function () {

    function Calc() {
    }

    Calc.prototype = {

        calculate: {
            '+': { exec: function(a, b) { return a + b; } },
            '-': { exec: function(a, b) { return a - b; } },
            '*': { exec: function(a, b) { return a * b; } },
            '/': { exec: function(a, b) { return a / b; } }
        },

        solve: function (expr) {
            if (typeof expr != 'string') {
                throw 'input parameter must be value of string type';
            }
            else {
                var parser = new Parser(expr);
                if (parser.args.length == 1)
                    return parser.args[0];
                else {
                    return this.calculate[parser.ops[0]].exec(parser.args[0], parser.args[1]);
                }
            }
        },
        defineOperator: function (expr, fn) {

            if (this.calculate[expr] && !this.calculate[expr].isCustom) {
                throw 'unable to replace default operator';
            }
            this.calculate[expr] = { exec: fn, isCustom: true };
        }
    }

    function Parser(expr) {
        this.args = [];
        this.ops = [];
        this.parse(expr);
    }

    Parser.prototype = {
        args: [],
        ops: [],
        hasOnlyOperator: false,
        parse: function (expr) {
            var currentArg = [];
            var numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
            for (var i = 0; i < expr.length; i++) {
                if (numbers.indexOf(expr.charAt(i)) > -1) {
                    currentArg.push(numbers.indexOf(expr.charAt(i)));
                }
                else {
                    this.args.push(parseInt(currentArg.join('')));
                    this.ops.push(expr.charAt(i));
                    if (currentArg.length === 0) this.hasOnlyOperator = true;
                    currentArg = [];
                }
            }
            this.args.push(parseInt(currentArg.join('')));
        }
    }
    window.Calc = Calc;
})();