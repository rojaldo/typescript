var StateMachine = require('javascript-state-machine');
// import * as StateMachine from 'javascript-state-machine';

const correctSample = "27+4="
const incorrectSample = "27+*3="

let calculatorStateMachine = new StateMachine({
    init: 'init',
    transitions: [
      { name: 'toFirstOperand',     from: 'init',  to: 'firstOperand' },
      { name: 'overFirstOperand', from: 'firstOperand', to: 'firstOperand' },
      { name: 'toSecondOperand',    from: 'firstOperand', to: 'secondOperand' },
      { name: 'overSecondOperand', from: 'secondOperand', to: 'secondOperand' },
      { name: 'toResult',           from: 'secondOperand', to: 'result' },
      { name: 'reset',              from: ['firstOperand', 'secondOperand', 'result'], to: 'init' },
      { name: 'fromResultToSecondOperand', from: 'result', to: 'secondOperand' },
      { name: 'fromResultToFirstOperand', from: 'result', to: 'firstOperand' }
    ],
    methods: {
        onToFirstOperand: function() { console.log('Transitioned to firstOperand'); },
        onOverFirstOperand: function() { console.log('Stayed in firstOperand'); },
        onToSecondOperand: function() { console.log('Transitioned to secondOperand'); },
        onOverSecondOperand: function() { console.log('Stayed in secondOperand'); },
        onToResult: function() { console.log('Transitioned to result'); },
        onReset: function() { console.log('Reset to init'); },
        onFromResultToSecondOperand: function() { console.log('Transitioned from result to secondOperand'); },
        onFromResultToFirstOperand: function() { console.log('Transitioned from result to firstOperand'); }
    }
  });

enum States {
    Init,
    FirstOperand,
    SecondOperand,
    Result
}

let currentState = States.Init
let firstOperand = 0
let secondOperand = 0
let operator = ''
let result = 0

function processInput(input: string) {
    for (const char of input) {
        (char >= '0' && char <= '9')? processNumber(Number(char)) : processSymbol(char)

    }
}

function processNumber(num: number) {
    switch (currentState) {
        case States.Init:
            firstOperand = num
            currentState = States.FirstOperand
            break;
        case States.FirstOperand:
            firstOperand = firstOperand * 10 + num
            break;
        case States.SecondOperand:
            secondOperand = secondOperand * 10 + num
            break;
        case States.Result:
            clearCalc()
            firstOperand = num
            currentState = States.FirstOperand
            break;
    }
}

function processSymbol(symbol: string) {
    switch (currentState) {
        case States.Init:
            break;
        case States.FirstOperand:
            if (symbol === '+' || symbol === '-' || symbol === '*' || symbol === '/') {
                operator = symbol
                currentState = States.SecondOperand
            }
            break;
        case States.SecondOperand:
            if (symbol === '=') {
                calculateResult()
                console.log(result)
                currentState = States.Result
            }
            break;
        case States.Result:
            if (symbol === '+' || symbol === '-' || symbol === '*' || symbol === '/') {
                const temp = result
                clearCalc()
                firstOperand = temp
                operator = symbol
                currentState = States.SecondOperand
            }
            break;
    }
        
            
}

function clearCalc() {
    firstOperand = 0
    secondOperand = 0
    result = 0
    operator = ''
    currentState = States.Init
}

function calculateResult() {
    switch (operator) {
        case '+':
            result = firstOperand + secondOperand
            break;
        case '-':
            result = firstOperand - secondOperand
            break;
        case '*':
            result = firstOperand * secondOperand
            break;
        case '/':
            result = firstOperand / secondOperand
            break;
        default:
            result = 0
            break;
    }
}

function processStateMachine(sample: string) {
    for (const char of sample) {
        try {
            if (char >= '0' && char <= '9') {
                calculatorStateMachine.toFirstOperand()
            } else if (char === '+' || char === '-' || char === '*' || char === '/') {
                calculatorStateMachine.toSecondOperand()
            } else if (char === '=') {
                calculatorStateMachine.toResult()
            } else {
                throw new Error(`Invalid character: ${char}`)
            }
        } catch (error) {
            console.error(error)
            break;
        }
    }
}

console.log("Processing correct sample:")
processStateMachine(correctSample)

