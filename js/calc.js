(function(){
	


function Calc(){
}

Calc.prototype = {

    preDefinedRegex: /(\d+)/g,
    preDefinedOperators : ['+','-','/','*',],
    argOne: 0,
    argTwo: 0,
    operatorMark: 0,
    preDefinedContains: false,
    solve: function(expr){
        if(typeof expr === 'string')
        {
                var constantExpression = this.splitExpression(expr);
                if(typeof constantExpression != 'undefined') return constantExpression;
                if(this.preDefinedContains)
                {
                    return this.handleBaseOperators()
                }
                else
                {
                    var fn = Calc.prototype[this.operatorMark];
                    if(typeof fn === 'function') {
                        return fn(this.argOne,this.argTwo);
                    }
                }
        }
        else
        {
            throw 'input parameter must be value of string type';
        }
    },




    defineOperator:function(operatorName, fn) {
        if(this.preDefinedOperators.indexOf(operatorName) === -1)
        {
            if(typeof fn == 'function')
            {
                Calc.prototype[ operatorName ] =  fn;
            }
        }
        else
        {
            throw 'unable to replace default operator';
        }

    },
    handleBaseOperators: function(){
        switch (this.operatorMark){
            case "+": return this.argOne+this.argTwo;
                break;
            case "-": return this.argOne-this.argTwo;
                break;
            case "/": return this.argOne/this.argTwo;
                break;
            case "*": return this.argOne*this.argTwo;
                break;
            default:
                break;

        }
    },
    splitExpression: function(expr){
        var expressionArray = expr.split(this.preDefinedRegex);
        expressionArray.splice(0, 1);
        expressionArray.splice(expressionArray.length-1, 1);

        this.preDefinedContains = expressionArray.some(function(entry) {
            if(entry) return Calc.prototype.preDefinedOperators.indexOf(entry) != -1

        });
        if(expressionArray.length===1) return eval(expr);
        this.argOne = parseInt(expressionArray[0]);
        this.argTwo = parseInt(expressionArray[2]);
        this.operatorMark = expressionArray[1];

    }
}
window.Calc = Calc;
})();