import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  let [expression, setExpression] = useState(0);

  const clickHandler = (e, key) => {
    let ex = expression;
    console.log(key);
    switch (key) {
      case "AC":
        setExpression(0);
        break;
      case "=":
        if (/[+\-\/X]/gi.test(ex)) {
          ex = evaluateExp();
          setExpression(ex);
        }
        break;
      case "+":
      case "-":
      case "X":
      case "/":
        if (/[+\-\/X]/gi.test(ex) && !endsWithExp(ex)) {
          ex = evaluateExp();
          ex = ex + key;
          setExpression(ex);
        } else if (!endsWithExp(ex)) {
          ex = ex + key;
          setExpression(ex);
        }
        break;
      default:
        ex = ex + key;
        setExpression(ex);
    }
  }

  const evaluateExp = () => {
    console.log("evaluate");
    let parts = expression.split(/[+\-\/X]/gi);
    let operator = expression.match(/[+\-\/X]/gi)[0];
    let left = Number(parts[0]);
    let right = Number(parts[1]);
    let result;

    console.log(operator);

    switch (operator) {
      case "+":
        result = left + right;
        break;
      case "-":
        result = left - right;
        break;
      case "X":
        result = left * right;
        break;
      case "/":
        result = (left / right).toFixed(2);
        break;
      default:
        result = 0;
    }

    console.log(result);
    return result.toString();
  }

  const endsWithExp = (str) => {
    console.log(str);
    return str.endsWith("+") || str.endsWith("-") || str.endsWith("/") || str.endsWith("X");
  }

  let buttons = ["7", "8", "9", "+", "6", "5", "4", "-", "3", "2", "1", "X", "0", "AC", "=", "/"];

  return (
    <div className="App">
      <div className="container">
        <div className="display">{expression}</div>
        <div className="buttons">
          {buttons.map(x => {
            return (<div className="button" key={x} onClick={(e) => clickHandler(e, x)}> {x} </div>)
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
