import React from 'react';

const ButtonIcon = ({className, onClick, disabled}) => {
    return (
        <button className="btnIcon" onClick={onClick} disabled={disabled}>
            <i className={className}/>
        </button>
    );
};

export default ButtonIcon;
