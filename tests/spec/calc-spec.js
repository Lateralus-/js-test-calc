describe('calc tests', function(){
	var calc;

	beforeEach(function() {
		calc = new Calc();
	});

	it('should accept only string values', function(){
		expect(function(){ calc.solve(1); }).toThrow('input parameter must be value of string type');
	});

	it('should handle constant expression', function() {
		var testValue = '1';

		var result = calc.solve(testValue);

		expect(result).toBe(parseInt(testValue));
	});

	it('should handle simple addition', function() {
		var testExpression = '1+2';

		var result = calc.solve(testExpression);

		expect(result).toBe(3);
	});

	it('should handle simple subtraction', function() {
		var testExpression = '3-2';

		var result = calc.solve(testExpression);

		expect(result).toBe(1);
	});

	it('should handle simple multiplication', function() {
		var testExpression = '3*2';

		var result = calc.solve(testExpression);

		expect(result).toBe(6);
	});

	it('should handle simple division', function() {
		var testExpression = '6/2';

		var result = calc.solve(testExpression);

		expect(result).toBe(3);
	});

	it('should allow defining custom operators', function () {
		calc.defineOperator('^', function (op1, op2) { return Math.pow(op1, op2); });

		var result = calc.solve('2^3');

		expect(result).toBe(8);
	});

	it('should allow replacing custom operators', function() {
		calc.defineOperator('^', function() { return 0; });

		calc.defineOperator('^', function(op1, op2) { return Math.pow(op1, op2); });

		var result = calc.solve('2^3');
		expect(result).toBe(8);
	});

	it('should not allow replacing default operators', function() {
		expect(function() { calc.defineOperator('+', function() {}) }).toThrow('unable to replace default operator');
	});
});