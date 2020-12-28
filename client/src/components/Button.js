import React from 'react';

const Button = props => {
  return (
    <button 
      style={{...styles.button, backgroundColor: props.color}} 
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.text}
    </button>
  )
}

const styles = {
  button: {
    borderRadius: 10,
    width: 158, 
    height: 48, 
    fontFamily: 'PT Serif', 
    fontSize: 16, 
    border: 'none', 
    margin: 10,
    outline: 'none'
  }
}

export default Button;