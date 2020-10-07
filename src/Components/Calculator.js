import React, { useState } from 'react';
import Buttons from './Buttons';
import Display from './Display';
import '../Styles/Calculator.css';
import '../Styles/Buttons.css';



function Calculator() {
    // declare state values
    const [prevValue, setPrevValue] = useState(null);
    const [nextValue, setNextValue] = useState("0");
    const [op, setOp] = useState(null);
    
    // object with the operations
    const calcOperations = {
        "/": (firstValue, secondValue) => firstValue / secondValue,
        "*": (firstValue, secondValue) => firstValue * secondValue,
        "+": (firstValue, secondValue) => firstValue + secondValue,
        "-": (firstValue, secondValue) => firstValue - secondValue,
        "=": (firstValue, secondValue) => secondValue,
    }

    // build the number
    const handleNum = (num) => {
        setNextValue(nextValue === "0" ? String(num) : nextValue + num)
    }

    // preforms the basic operations
    const performOp = () => {
        let final = calcOperations[op](
            parseFloat(prevValue),
            parseFloat(nextValue)
        );
        setOp(null);
        setNextValue(String(final));
        setPrevValue(null);
    }

    const insertDecimal = () => {
        if (!/\./.test(nextValue)) {
          setNextValue(nextValue + ".");
        }
      };

    const reset = () => {
        setNextValue("0");
        setPrevValue(null);
        setOp(null);
    }
    
    // handle the operations
    const handleOperations = (value) => {
        if (Number.isInteger(value)) {
            handleNum(parseInt(value, 10));
        }
        else if (value in calcOperations){
            if (op === null){
                setOp(value);
                setPrevValue(nextValue);
                setNextValue('');
            }
            if (op) {
                setOp(value);
            }
            if(prevValue && op && nextValue){
                performOp();
            }
        }
        else if (value === "reset"){
            reset();
        }
        else if (value === ".") {
            insertDecimal();
        }
    }

    // create the buttons
    const calcButtons = [];
    [9,8,7,"/",6,5,4,"*",3,2,1,"-",0,".","=","+"].forEach(item => {
        calcButtons.push(
            <Buttons value={item} key={item} clicked={handleOperations}/>
        )
    })
    return (
        <div className='Calculator'>
            <Display show={nextValue} />
            <div className='Buttons'>
                {calcButtons}
            </div>
            <div>
                <button className='btn-clear' onClick={reset}>reset</button>
            </div> 
        </div>
    )
}

export default Calculator;