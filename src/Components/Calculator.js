import React from 'react';

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: "0",
            output: "",
            numbers: [],
            operations: [],
        }
    }

    handleReset() {
        this.setState({
            input: "0",
            output: "",
            numbers: [],
            operations: [],
        })
    }

    handleChange(event) {
        const newNumber = event.target.innerText;

        function containsNumbers(str) {
            return /\d/.test(str);
        }

        if (this.state.input === "0" || this.state.input === "+" || this.state.input === "x" || this.state.input === "/") {

            this.setState({
                input: newNumber,
                output: this.state.output + newNumber,
            })

        } else if (this.state.input === "-" && containsNumbers(this.state.output.slice(-2, -1))) {

            this.setState({
                input: newNumber,
                output: this.state.output + newNumber,
            })

        } else if (this.state.input === "-" && !containsNumbers(this.state.output.slice(-2, -1))) {

            this.setState({
                input: -newNumber,
                output: this.state.output + newNumber,
            })

        }

        else {

            this.setState({
                input: "" + this.state.input + newNumber,
                output: "" + this.state.output + newNumber,
            });

        }
    }

    handleOperation(event) {

        if (!isNaN(this.state.input)) {

            const newOperation = event.target.innerText;

            this.state.numbers.push(Number(this.state.input));

            this.setState({
                output: "" + this.state.output + newOperation,
                operations: [...this.state.operations, newOperation],
                input: newOperation,
            })

        } else {
            this.state.operations.pop();
            const newOperation = event.target.innerText;

            this.setState({
                output: this.state.output.slice(0, -1) + newOperation,
                operations: [...this.state.operations, newOperation],
                input: newOperation,
            })

        }

    }

    handleOperationSub(event) {
        const subOperation = event.target.innerText;

        if (this.state.output.slice(-1) >= '0' && this.state.output.slice(-1) <= '9') {

            this.state.numbers.push(Number(this.state.input));
            this.setState({
                output: "" + this.state.output + subOperation,
                operations: [...this.state.operations, subOperation],
                input: subOperation,
            })
        } else {

            if (this.state.output.slice(-1) !== "-") {
                this.setState({
                    output: "" + this.state.output + subOperation,
                    operations: [...this.state.operations],
                    input: subOperation,
                })
            }
        }
    }

    handleDot(event) {
        const newDot = event.target.innerText;

        if (!this.state.input.includes(".")) {
            this.setState({
                output: "" + this.state.output + newDot,
                input: "" + this.state.input + newDot,
            })
        }
    }

    handleResult() {

        if (this.state.operations.length > 0) {
            this.state.numbers.push(Number(this.state.input));
        }

        let result = this.state.numbers[0];

        for (let i = 0; i < this.state.operations.length; i++) {
            const num = this.state.numbers[i + 1];
            const operation = this.state.operations[i];

            if (operation === "+") {
                result += num;
            } else if (operation === "-") {
                result -= num;
            } else if (operation === "x") {
                result *= num;
            } else if (operation === "/") {
                result /= num;
            }
        }

        if (this.state.output.length > 18) {
            this.setState({
                input: "Limit Reached",
                output: "Limit Reached",
                operations: [],
                numbers: [],
            })
        } else if (this.state.operations.length > 0) {
            this.setState({
                input: Number(result),
                output: this.state.output + "=" + result,
                operations: [],
                numbers: [],
            })
        }

        console.log(this.state.numbers)
        console.log(this.state.operations)

    }


    render() {

        // tailwind styles
        const buttonStyle = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-gray-200 dark:border-gray-700";

        return (
            <div className='flex flex-col w-80 p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700'>

                <div className='mb-5'>
                    <p className='font-orbitron text-yellow-300 text-right'>{this.state.output}</p>
                    <p id="display" className='font-orbitron text-black dark:text-white text-right'>{this.state.input}</p>
                </div>

                <div className='flex flex-row'>
                    <div className='flex w-2/4'>
                        <button id="clear" onClick={this.handleReset.bind(this)} className={buttonStyle + " w-full"}>AC</button>
                    </div>
                    <div className='flex w-2/4'>
                        <button id="divide" onClick={this.handleOperation.bind(this)} className={buttonStyle + " w-6/12"}>/</button>
                        <button id="multiply" onClick={this.handleOperation.bind(this)} className={buttonStyle + " w-6/12"}>x</button>
                    </div>
                </div>

                <div className='flex flex-row'>
                    <div className='flex w-2/4'>
                        <button id="seven" onClick={this.handleChange.bind(this)} className={buttonStyle + " w-6/12"}>7</button>
                        <button id="eight" onClick={this.handleChange.bind(this)} className={buttonStyle + " w-6/12"}>8</button>
                    </div>
                    <div className='flex w-2/4'>
                        <button id="nine" onClick={this.handleChange.bind(this)} className={buttonStyle + " w-6/12"}>9</button>
                        <button id="subtract" onClick={this.handleOperationSub.bind(this)} className={buttonStyle + " w-6/12"}>-</button>
                    </div>
                </div>

                <div className='flex flex-row'>
                    <div className='flex w-2/4'>
                        <button id="four" onClick={this.handleChange.bind(this)} className={buttonStyle + " w-6/12"}>4</button>
                        <button id="five" onClick={this.handleChange.bind(this)} className={buttonStyle + " w-6/12"}>5</button>
                    </div>
                    <div className='flex w-2/4'>
                        <button id="six" onClick={this.handleChange.bind(this)} className={buttonStyle + " w-6/12"}>6</button>
                        <button id="add" onClick={this.handleOperation.bind(this)} className={buttonStyle + " w-6/12"}>+</button>
                    </div>
                </div>

                <div className='flex flex-row'>
                    <div className='flex flex-col w-9/12'>
                        <div className='flex flex-row w-full'>
                            <button id="one" onClick={this.handleChange.bind(this)} className={buttonStyle + " grow"}>1</button>
                            <button id="two" onClick={this.handleChange.bind(this)} className={buttonStyle + " grow"}>2</button>
                            <button id="three" onClick={this.handleChange.bind(this)} className={buttonStyle + " grow"}>3</button>
                        </div>
                        <div className='flex flex-row w-full'>
                            <button id="zero" onClick={this.handleChange.bind(this)} className={buttonStyle + " w-2/3"}>0</button>
                            <button id="decimal" onClick={this.handleDot.bind(this)} className={buttonStyle + " w-1/3"}>.</button>
                        </div>
                    </div>
                    <div className='flex flex-col w-3/12'>
                        <div className='flex grow'>
                            <button id='equals' onClick={this.handleResult.bind(this)} className={buttonStyle + " w-full"}>=</button>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default Calculator;