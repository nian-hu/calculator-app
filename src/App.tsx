import React from 'react';
import './App.css';
import { Calculator } from './components/Calculator/Calculator';

const App: React.FC = () => {
  return (
    <div className="app">
      <Calculator />
    </div>
  );
};

export default App;