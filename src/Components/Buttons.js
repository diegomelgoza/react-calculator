import React from 'react';
import '../Styles/Buttons.css';

const Buttons = (props) => {
    return (
        <button onClick={() => props.clicked(props.value)}>{props.value}</button>
    )

}

export default Buttons;