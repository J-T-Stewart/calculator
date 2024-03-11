(function() {

    const calculator = {

        state: {

            currentValue:  null,

            previousValue: null,

            completeValue: null,

            operator:      null,

        },

        operations: {
            "+": (x, y) => x + y,
            "-": (x, y) => x - y,
            "x": (x, y) => x * y,
            "/": (x, y) => {

                if (y === 0) {
                    alert("You can't divde by 0, the calculator has been reset");
                    return null;
                }
                
                return (x / y);

            },
        },

        functions: {

            operate: function() {

                const operation = calculator.operations[calculator.state.operator];

                const value = operation(
                    Number(calculator.state.previousValue),
                    Number(calculator.state.currentValue)
                );

                calculator.functions.clearState();

                if (value === null) return;

                calculator.functions.updateDisplay(value);

                calculator.state.completeValue = value;

            },

            updateDisplay: function(value) {

                document.getElementById('calculator-display').innerHTML = value;

            },

            updateOperator: function(operator) {

                if (calculator.state.operator !== null && calculator.state.previousValue !== null) {

                    calculator.functions.operate();
                
                } else if (calculator.state.operator !== null) {

                    calculator.state.currentValue = calculator.state.previousValue;

                    calculator.functions.operate();

                }

                if (calculator.state.completeValue !== null && calculator.state.previousValue === null) {

                    calculator.state.previousValue = calculator.state.completeValue;

                    calculator.state.completeValue = null

                } else {

                    calculator.state.previousValue = calculator.state.currentValue;

                    calculator.state.currentValue  = null;

                }

                calculator.state.operator      = operator;

            },

            updateValue: function(number) {

                if (calculator.state.completeValue !== null) {
                    calculator.state.completeValue = null;
                }

                let value = '';

                if (calculator.state.currentValue !== null) {
                    value = calculator.state.currentValue;
                }

                value += String(number);

                calculator.state.currentValue = value;

                calculator.functions.updateDisplay(value);

            },

            clearState: function() {

                calculator.state.currentValue  = null;
                calculator.state.previousValue = null;
                calculator.state.completeValue = null;
                calculator.state.operator      = null;

                calculator.functions.updateDisplay('0');

            },

            handleClick: function(value) {

                if (value === "+" || value === "-" || value === "x" || value === "/") {

                    calculator.functions.updateOperator(value);

                } else if (value === "=") {

                    calculator.functions.operate();

                } else if (value === "clr") {

                    calculator.functions.clearState();

                } else {

                    calculator.functions.updateValue(value);

                }

                console.log('====================================');
                console.log("State: ", calculator.state);
                console.log('====================================');

            }

        },

        setEvents: function() {

            const buttons = document.querySelectorAll('.calc-button');

            buttons.forEach(button => {
                button.addEventListener('click', (e) => {
                    calculator.functions.handleClick(e.target.innerHTML);
                });
            });

        },

        init: function() {

            calculator.setEvents();

        }

    };

    calculator.init();

})();