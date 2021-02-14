import {React, useState, useEffect } from 'react';
import './App.css';
import { Button } from './components/Button';
import { Input } from './components/Input';
import { InputResult } from './components/InputResult';
import { ClearButton } from './components/ClearButton';
import { ButtonEval } from './components/ButtonEval';
import * as math from "mathjs";

function App() {

  const [stateInput, setStateInput] = useState('');
  const [stateInputResult, setStateInputResult] = useState('');
  const [input2View, setInput2View] = useState(true);

  const operator = val => {
    return val === "+" || val === "-" || val === "/" || val === "*";
  }

  const addToInput = val => {
    // setStateInputResult(stateInput + val);
    if (operator(val)) {
      setStateInputResult(stateInputResult + val)
      setStateInput(stateInput + val)

    } else {
      setStateInputResult(math.evaluate(stateInputResult + val).toString())
      setStateInput(math.evaluate(stateInputResult + val).toString());
      setInput2View(!input2View);
    }
  }

  const deleteFromInput = () => {
    setStateInput(stateInput.slice(0, -1));
  }

  const handleEqual = () => {
    // setStateInputResult(math.evaluate(stateInput));
    // setStateInput('');

    setStateInputResult('');
  }

  return (
    <div className="app">
      <div className="calc-wrapper">
        <Input input={stateInput}></Input>
        <InputResult inputResult={

          operator(stateInputResult.charAt(stateInputResult?.length -1)) ?
          stateInputResult.slice(0, -1)
          : stateInputResult}>

        </InputResult>
        <div className="row">
          <ClearButton handleClear={() => {setStateInput(''); setStateInputResult('');}}>AC</ClearButton>
          <Button handleClick={deleteFromInput}>DEL</Button>
          <Button handleClick={addToInput}>%</Button>
          <Button handleClick={addToInput}>/</Button>
        </div>
        <div className="row">
          <Button handleClick={addToInput}>7</Button>
          <Button handleClick={addToInput}>8</Button>
          <Button handleClick={addToInput}>9</Button>
          <Button handleClick={addToInput}>*</Button>
        </div>
        <div className="row">
          <Button handleClick={addToInput}>4</Button>
          <Button handleClick={addToInput}>5</Button>
          <Button handleClick={addToInput}>6</Button>
          <Button handleClick={addToInput}>+</Button>
        </div>
        <div className="row">
          <Button handleClick={addToInput}>1</Button>
          <Button handleClick={addToInput}>2</Button>
          <Button handleClick={addToInput}>3</Button>
          <Button handleClick={addToInput}>-</Button>
        </div>
        <div className="row2">
          <Button handleClick={addToInput}>.</Button>
          <Button handleClick={addToInput}>0</Button>
        </div>
        <div className="row2">
          <ButtonEval className="buttonEval" handleClick={() => handleEqual()}>=</ButtonEval>
        </div>
      </div>
    </div>
  );
}


export default App;
