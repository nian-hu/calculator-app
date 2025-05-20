import React, { useState } from 'react';
import { Display } from '../Display/Display';
import { Button } from '../Button/Button';
import { buttons, validNumbers, getButtonClass, formatResult } from '../utils/utils';
import './Calculator.css';

export const Calculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [operand, setOperand] = useState<string | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [shouldResetDisplay, setShouldResetDisplay] = useState(false);

  const handleClick = (value: string) => {
    // Handle numeric button press
    if (validNumbers.includes(value) || value === '.') {
      if (shouldResetDisplay) {
        setDisplay(value === '.' ? '0.' : value);
        setShouldResetDisplay(false);
      } else {
        // Prevent multiple decimal points
        if (value === '.' && display.includes('.')) return;

        setDisplay(display === '0' && value !== '.' ? value : display + value);
      }
      return;
    }

    // Handle operator and function button press
    switch (value) {
      case 'AC':
        setDisplay('0');
        setOperand(null);
        setOperator(null);
        setShouldResetDisplay(false);
        break;

      case '+/-':
        setDisplay((parseFloat(display) * -1).toString());
        break;

      case '%':
        setDisplay((parseFloat(display) / 100).toString());
        break;

      case '=':
        if (operand !== null && operator !== null) {
          const result = compute(operand, display, operator);
          setDisplay(result);
          setOperand(null);
          setOperator(null);
          setShouldResetDisplay(true);
        }
        break;

      case '+':
      case '-':
      case 'x':
      case '÷':

        // If there is already a stored operator and operand, handle chained operation
        if (operator && operand !== null && !shouldResetDisplay) {
          const result = compute(operand, display, operator);
          setDisplay(result);
          setOperand(result); 
        } 
        
        // If this is the first operator selection, store current number as operand
        else {
          setOperand(display);
        }

        setOperator(value);
        setShouldResetDisplay(true);
        break;

      default:
        break;
    }
  };

  const compute = (a: string, b: string, op: string): string => {
    const x = parseFloat(a);
    const y = parseFloat(b);

    let result = 0;

    switch (op) {
      case '+':
        result = x + y;
        break;
      case '-':
        result = x - y;
        break;
      case 'x':
        result = x * y;
        break;
      case '÷':
        result = y === 0 ? NaN : x / y;
        break;
      default:
        return 'Error';
    }

    return isNaN(result) ? 'Error' : formatResult(result);
  };

  return (
    <div className="calculator">
      <Display value={display} />
      <div className="button-grid">
        {buttons.flat().map((btn) => (
          <Button
            key={btn}
            value={btn}
            onClick={() => handleClick(btn)}
            className={`${getButtonClass(btn)}`}
          />
        ))}
      </div>
    </div>
  );
};