import React from 'react';
import './ButtonEval.css';

export const ButtonEval = (props) => (
  <div className="buttonEval" onClick={props.handleClick}>{props.children}</div>
);
