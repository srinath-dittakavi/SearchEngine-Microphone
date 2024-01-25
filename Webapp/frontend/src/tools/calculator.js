import React, { useState } from "react";
import './calculator.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHistory } from '@fortawesome/free-solid-svg-icons';
import Slider from 'react-input-slider';

const btnValues = [
  ["C", "^", "%", "/"],
  [7, 8, 9, "*"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];

const Calculator = () => {
  const [value, setValue] = useState('');
  const [isShadowActive, setIsShadowActive] = useState(false);
  const [shadowValue, setShadowValue] = useState('');
  const [angleUnit, setAngleUnit] = useState('');
  const [openBracket, setOpenBracket] = useState(0);

  const [historyVisible, setHistoryVisible] = useState(false);
  const [inputHistory, setInputHistory] = useState([]);


  const scientificBtnValues = [
    [
      <div key="angle-unit" className='angle-unit'>
        <label className="small-buttons">
          <input
            type="radio"
            value="deg"
            checked={angleUnit === 'deg'}
            onChange={() => handleAngleUnitChange('deg')}
          />
          &nbsp;Deg&nbsp;&nbsp;&nbsp;
        </label>
        <label className="small-buttons">
          <input
            type="radio"
            value="rad"
            checked={angleUnit === 'rad'}
            onChange={() => handleAngleUnitChange('rad')}
          />
          &nbsp;Rad
        </label>
      </div>,
      <button
        key="history"
        onClick={() => setHistoryVisible(!historyVisible)}
        className="small-buttons"
        style={{ marginTop: '-10px', background: 'none', border: 'none' }}
      >
        <FontAwesomeIcon icon={faHistory} />
      </button>
    ],
    ["√", "π", "(", ")"],
    ["log", "ln", "e"],
    ["sin", "cos", "tan"],
    ["sinh", "cosh", "tanh"], // Hyperbolic functions
  ];

  const handleAngleUnitChange = (unit) => {
    setAngleUnit(unit);
  };

  const handleButtonClick = async (buttonValue) => {
    if (buttonValue === 'C') {
      setValue('');
      setIsShadowActive(false);
      setShadowValue('');
      setOpenBracket(1);
      setAngleUnit('');
    } else if (buttonValue === '=') {
      try {
        let expression = value;
        if (isShadowActive) {
          expression += shadowValue;
          setIsShadowActive(false);
          setShadowValue('');
        }

        const response = await axios.post('http://localhost:8000/api/calculate/', {
          expression: expression,
          angleUnit: angleUnit,
        });
        const result = response.data.result;
        const inputExpression = isShadowActive ? `${value}${shadowValue}` : value;
        const historyEntry = `${inputExpression} = ${result}`;
        setInputHistory((prevHistory) => [historyEntry, ...prevHistory.slice(0, 4)]);

        setValue(result);
      } catch (error) {
        console.error('Error sending data to the backend:', error);
      }
    } else {
      setValue((prevValue) => {
        if (buttonValue === '(') {
          setIsShadowActive(true);
          setOpenBracket(openBracket + 1);
          setShadowValue(')'.repeat(openBracket));
        }
        return prevValue + buttonValue;
      });
    }
  };

  const renderBoxes = () => {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginLeft: '10px', marginTop: '20px', marginBottom: '-15px' }}>
        {inputHistory.map((historyEntry, index) => {
          const [input, result] = historyEntry.split('=').map(item => item.trim());
  
          const isInputLong = input.length > 10;
          const isResultLong = result.length > 10;
  
          return (
            <div
              key={index}
              style={{
                width: 110,
                height: 75,
                backgroundColor: '#D3D3D3',
                borderRadius: '10px',
                marginRight: index < inputHistory.length - 1 ? '7px' : '0',
                padding: '10px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                fontSize: '18px',
              }}
            >
              <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }}>
                {isInputLong ? input.slice(0, 5) + '...' : input}
              </div>
              <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }}>
                = {isResultLong ? result.slice(0, 5) + '...' : result}
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  
  
  

  return (
    <div className="calculator">
      {historyVisible && (
        <div className="history-container">
          {renderBoxes()}
        </div>
      )}
      
      <div className='display'>
        <input
          type="text"
          readOnly
          className={`display-text ${isShadowActive ? 'shadow-active' : ''}`}
          value={isShadowActive ? `${value}${shadowValue}` : value}
        />
      </div>
      <div className="btn-container" style={{ justifyContent: 'center'}}>
        <div className="scientific" style={{ justifyContent: 'center'}}>
          {scientificBtnValues.map((row, rowIndex) => (
            <div key={rowIndex} className="row">
              {row.map((buttonValue, colIndex) => (
                <button
                  key={colIndex}
                  onClick={() => {
                    if (typeof buttonValue !== 'object') {
                      handleButtonClick(buttonValue);
                    }
                  }}
                  className={buttonValue === ')' && isShadowActive ? 'btn shadow-btn' : ''}
                >
                  {buttonValue}
                </button>
              ))}
            </div>
          ))}
        </div>

        <div className="basic" style={{ justifyContent: 'center'}}>
          {btnValues.map((row, rowIndex) => (
            <div key={rowIndex} className="row">
              {row.map((buttonValue, colIndex) => (
                <button
                  key={colIndex}
                  onClick={() => handleButtonClick(buttonValue)}
                  className={buttonValue === '=' ? 'btn btn-primary ml-2' : ''}
                >
                  {buttonValue}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calculator;
