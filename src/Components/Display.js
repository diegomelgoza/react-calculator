import React from 'react';
import '../Styles/Display.css';

const Display = (props) => {
    return (
        <div className='Display'>
            {props.show}
        </div>
    )
};

export default Display;