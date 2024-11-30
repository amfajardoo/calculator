import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  result = signal('0');
  subResult = signal('0');
  lastOperator = signal('');

  allowedNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  allowedOperators = ['+', '-', '*', '/', '÷', 'x'];
  specialAllowedOperators = ['+/-', '%', '.', '=', 'C', 'Result', 'Enter', 'Backspace', 'Escape', 'Delete'];

  constructNumber(value: string) {
    if(![...this.allowedNumbers, ...this.allowedOperators, ...this.specialAllowedOperators].includes(value)) {
      return;
    }

    if(value === '=' || value === 'Enter' || value === 'Result') {
      this.calculateResult();
      return;
    }

    if(value === 'Backspace') {
      this.result.update((prevValue) => {
        if (prevValue.length === 1 || prevValue === '0' || prevValue.includes('-') && prevValue.length === 2) {
          return '0';
        }

        return prevValue.slice(0, -1);
      });
      return;
    }

    if(value === 'Delete' || value === 'Escape' || value === 'C') {
      console.log('Clear');
      this.result.set('0');
      this.subResult.set('0');
      this.lastOperator.set('');
      return;
    }

    // apply operators
    if(this.allowedOperators.includes(value)) {
      this.lastOperator.set(value);
      this.subResult.set(this.result());
      this.result.set('0');
      return;
    }

    // limit characters length
    if(this.result().length >= 10) {
      console.log('Max length reached');
      return;
    }

    // validate .
    if(value === '.' && !this.result().includes('.')) {
      this.result.update((prevValue) => {
        return `${prevValue}.`;
      })
      return;
    }

    // validate zero
    if(value === '0' && this.result() === '0') {
      return;
    }

    // Change sign
    if(value === '+/-') {
      this.result.update((prevValue) => {
        return prevValue === '0' ? '0' : prevValue.includes('-') ? prevValue.slice(1) : `-${prevValue}`;
      });
      return;
    }

    // numbers 
    if (this.allowedNumbers.includes(value)) {
      this.result.update(prevValue => prevValue === '0' ? value : prevValue + value);
    }
  }

  calculateResult() {
    const number1 = Number.parseFloat(this.subResult());
    const number2 = Number.parseFloat(this.result());

    let result = 0;

    switch(this.lastOperator()) {
      case '+':
        result = number1 + number2;
        break;
      case '-':
        result = number1 - number2;
        break;
      case '*':
        result = number1 * number2;
        break;
      case '/':
        result = number1 / number2;
        break;
      case 'x':
        result = number1 * number2;
        break;
      case '÷':
        result = number1 / number2;
        break;
    }

    this.result.set(result.toString());
    this.subResult.set('0');
    this.lastOperator.set('');
  }
}
