import {React, useState } from 'react';
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
  const [inputResultView, setInputResultView] = useState(true);

  const operator = val => {
    return val === "+" || val === "-" || val === "/" || val === "*" || val === "%";
  }
  
  const addToInput = val => {
    if (!inputResultView) {
       setInputResultView(true)
    }
    if (operator(val)) {
      if (val.includes("%")) {
        let tmp = stateInput.split(/[/*%+-]/);
        let [smoothOperator] = stateInput.split(/[0-9]/).join('').split('');
        let percents = tmp[0] / 100 * tmp[1];
        if (smoothOperator === "*") {
          setStateInputResult(`${percents}`);
        } else if (smoothOperator === "/") {
          setStateInputResult((math.evaluate(tmp[0]/`${percents}`)).toString());
        } else {
        setStateInputResult((math.evaluate(tmp[0] + smoothOperator + `${percents}`)).toString());
        setStateInput((stateInput).toString());
        }
      } else {
      setStateInputResult((stateInputResult + val).toString())
      setStateInput((stateInput + val).toString())
      }
    } else {
      setStateInputResult(math.evaluate(stateInput + val).toString())
      setStateInput((stateInput + val).toString());
    }
  }

  const deleteFromInput = () => {
    setStateInput(stateInput.slice(0, -1));
  }

  const handleEqual = () => {
    setStateInput(stateInputResult.toString());
    setInputResultView(false);
  }

  return (
    <div className="app">
      <div className="calc-wrapper">
        <div className="inputContainer">
          <Input input={stateInput}></Input>
          <InputResult
            inputResult={
              inputResultView
              ? operator(stateInputResult.charAt(stateInputResult?.length -1))
                ? stateInputResult.slice(0, -1)
                : stateInputResult
              : null}
          >
          </InputResult>
        </div>
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
