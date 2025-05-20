export const validNumbers = ['0','1','2','3','4','5','6','7','8','9']

export const buttons = [
  ['AC', '+/-', '%', '÷'],
  ['7', '8', '9', 'x'],
  ['4', '5', '6', '-'],
  ['1', '2', '3', '+'],
  ['0', '.', '=']
];

// Helps render buttons with conditional formatting
export const getButtonClass = (btn: string): string => {
  if (['AC', '+/-', '%'].includes(btn)) return 'function';
  if (['÷', 'x', '-', '+', '='].includes(btn)) return 'operator';
  if (btn === '0') return 'zero';
  return '';
};

// Rounds to 8 digits and removes trailing zeros
export const formatResult = (num: number): string => {
  const maxDigits = 8;
  return Number(num.toFixed(maxDigits)).toString();
};
